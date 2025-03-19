/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import { notify, getTextWidth } from '../components/utils/utils';

export default function useTranscriptionHandlers(prediction, detectionDelay, textAreaRef) {
    const [transcribedText, setTranscribedText] = useState("");
    const [recentTranscriptions, setRecentTranscriptions] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [autoSpeak, setAutoSpeak] = useState(false);
    const [speechRate, setSpeechRate] = useState(1);
    const [speechLanguage, setSpeechLanguage] = useState('en-US');
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [timer, setTimer] = useState(null);
    const [cursorPosition, setCursorPosition] = useState(0);

    // Speech Recognition State
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [interimTranscript, setInterimTranscript] = useState("");

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = speechLanguage;

            recognitionInstance.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + ' ';
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setTranscribedText((prevText) => prevText + finalTranscript);
                }
                setInterimTranscript(interimTranscript);
            };

            recognitionInstance.onerror = (event) => {
                console.error("Speech recognition error:", event.error);
                notify("error", "Speech Recognition Error", event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                if (isListening) {
                    recognitionInstance.start();
                }
            };

            setRecognition(recognitionInstance);
        } else {
            console.warn("Speech Recognition not supported in this browser.");
            notify("warning", "Not Supported", "Speech recognition is not supported in your browser.");
        }
    }, [speechLanguage]);


    // Start/Stop Speech Recognition
    const startListening = useCallback(() => {
        if (recognition && !isListening) {
            try {
                recognition.start();
                setIsListening(true);
                notify("info", "Listening...", "Speech recognition is active.");
            } catch (error) {
                console.error("Failed to start speech recognition:", error);
                notify("error", "Error", "Failed to start speech recognition. Please check your microphone and network.");
            }
        }
    }, [recognition, isListening]);

    const stopListening = useCallback(() => {
        if (recognition && isListening) {
            recognition.stop();
            setIsListening(false);
            notify("info", "Stopped", "Speech recognition stopped.");
        }
    }, [recognition, isListening]);

    // Toggle Listening
    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    // Load voices and stores all voices to be filtered by language later on
    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                const filteredVoices = availableVoices.filter(voice => voice.lang === speechLanguage);
                if (filteredVoices.length > 0) {
                    setSelectedVoice(filteredVoices[0]);
                } else {
                    console.warn(`No voices found for language: ${speechLanguage}`);
                }
            } else {
                setTimeout(loadVoices, 100);
            }
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [speechLanguage]);

    // Save to recent transcriptions only if the text is unique
    const saveToRecentTranscriptions = useCallback((text) => {
        setRecentTranscriptions((prev) => {
            // Check if the text already exists in the history
            const isDuplicate = prev.some((entry) => entry.text === text);
            if (!isDuplicate) {
                // Add the text with a timestamp
                return [{ text, timestamp: new Date().toLocaleTimeString() }, ...prev];
            }
            return prev; // Return the previous state if it's a duplicate
        });
    }, []);

    const handleCopy = useCallback(() => {
        if (transcribedText) {
            navigator.clipboard.writeText(transcribedText)
                .then(() => {
                    notify("success", "Success!", "Text copied to clipboard");
                    saveToRecentTranscriptions(transcribedText);
                })
                .catch((error) => {
                    notify("error", "Error!", `Failed to copy text: ${error}`);
                });
        }
    }, [transcribedText, saveToRecentTranscriptions]);

    const handleSpeak = useCallback(() => {
        if (transcribedText && !isSpeaking) {
            setIsSpeaking(true);
            const utterance = new SpeechSynthesisUtterance(transcribedText);
            utterance.lang = speechLanguage;
            utterance.rate = speechRate;
            utterance.pitch = 1;
            utterance.volume = 1;

            if (selectedVoice && selectedVoice instanceof SpeechSynthesisVoice) {
                utterance.voice = selectedVoice;
            } else {
                console.warn("Invalid voice selection. Using default system voice.");
            }

            utterance.onend = () => {
                setIsSpeaking(false);
                saveToRecentTranscriptions(transcribedText);
            };

            window.speechSynthesis.speak(utterance);
        }
    }, [transcribedText, selectedVoice, speechLanguage, speechRate, isSpeaking, saveToRecentTranscriptions]);

    const handleTrash = useCallback(() => {
        if (transcribedText) {
            saveToRecentTranscriptions(transcribedText);
            setTranscribedText("");
            notify("success", "Cleared!", "Text has been successfully cleared.");
        }
    }, [transcribedText, saveToRecentTranscriptions]);

    const handleRecentTranscriptionClick = (text) => {
        setTranscribedText(text);
    };

    const handleVoiceChange = useCallback((e) => {
        const selectedVoiceIndex = e.target.value;
        const filteredVoices = voices.filter(voice => voice.lang === speechLanguage);
        const voice = filteredVoices[selectedVoiceIndex];

        if (voice) {
            setSelectedVoice(voice);
        } else {
            console.warn("Selected voice not found.");
        }
    }, [voices, speechLanguage]);

    // Effect to handle prediction and update transcribed text
    useEffect(() => {
        if (prediction) {
            if (timer) {
                clearTimeout(timer);
            }

            const newTimer = setTimeout(() => {
                let updatedText = transcribedText;

                switch (prediction) {
                    case "space":
                        updatedText += " ";
                        break;
                    case "del":
                        updatedText = updatedText.slice(0, -1);
                        break;
                    case "error":
                        break;
                    case "nothing":
                        break;
                    default:
                        updatedText += prediction;
                        break;
                }

                setTranscribedText(updatedText);
                setTimer(null);
            }, detectionDelay);

            setTimer(newTimer);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [prediction, detectionDelay, transcribedText]);

    // Effect to update cursor position
    useEffect(() => {
        if (textAreaRef.current) {
            const textWidth = getTextWidth(transcribedText, textAreaRef.current);
            setCursorPosition(textWidth + 16);
        }
    }, [transcribedText]);

    // Effect to handle auto-speak
    useEffect(() => {
        if (autoSpeak && transcribedText && prediction === "nothing") {
            const autoSpeakTimer = setTimeout(() => {
                handleSpeak();
            }, 4000);

            return () => clearTimeout(autoSpeakTimer);
        }
    }, [transcribedText, prediction, autoSpeak, handleSpeak]);

    return {
        transcribedText,
        setTranscribedText,
        recentTranscriptions,
        selectedVoice,
        autoSpeak,
        setAutoSpeak,
        speechRate,
        setSpeechRate,
        speechLanguage,
        setSpeechLanguage,
        voices,
        handleCopy,
        handleSpeak,
        handleTrash,
        handleVoiceChange,
        handleRecentTranscriptionClick,
        isSpeaking,
        cursorPosition,
        isListening,
        toggleListening,
        interimTranscript, // Return interim transcript for live preview
    };
}