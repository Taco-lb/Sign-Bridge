import { useState, useEffect } from 'react';

export function useTimeSpent() {
    const [timeSpent, setTimeSpent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeSpent(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return timeSpent;
}

export function usePredictionCheck(prediction, selectedLetter, transcribedText, lessonType, clearTranscription) {
    const [completedLetters, setCompletedLetters] = useState(new Set());
    const [completedWords, setCompletedWords] = useState(new Set());
    const [timer, setTimer] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [lastPredictionTime, setLastPredictionTime] = useState(Date.now());

    useEffect(() => {
        if (prediction) {
            setLastPredictionTime(Date.now());
        }
    }, [prediction]);

    useEffect(() => {
        const checkTranscription = () => {
            if (lessonType === 'words' && transcribedText === selectedLetter) {
                setCompletedWords(prev => new Set([...prev, selectedLetter]));
                setShowOverlay(true);
                clearTranscription();
            }
        };

        const inactivityTimeout = 2000;
        const timeSinceLastPrediction = Date.now() - lastPredictionTime;

        if (timeSinceLastPrediction >= inactivityTimeout) {
            checkTranscription();
        } else {
            const timeoutId = setTimeout(checkTranscription, inactivityTimeout - timeSinceLastPrediction);
            return () => clearTimeout(timeoutId);
        }
    }, [lastPredictionTime, transcribedText, selectedLetter, lessonType, clearTranscription]);

    useEffect(() => {
        if (lessonType === 'letters') {
            if (prediction === selectedLetter) {
                if (!timer) {
                    const newTimer = setTimeout(() => {
                        setCompletedLetters(prev => new Set([...prev, selectedLetter]));
                        setShowOverlay(true);
                        setTimer(null);
                    }, 3000);
                    setTimer(newTimer);
                }
            } else {
                if (timer) {
                    clearTimeout(timer);
                    setTimer(null);
                }
            }
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [prediction, selectedLetter, timer, lessonType]);

    const closeOverlay = () => {
        setShowOverlay(false);
    };

    return { completedLetters, completedWords, showOverlay, closeOverlay };
}

export function useValidImages(selectedLetter, lessonType) {
    const [validImages, setValidImages] = useState([]);

    useEffect(() => {
        const loadValidImages = async () => {
            const newValidImages = [];
            const extensions = ['jpeg', 'png'];

            if (lessonType === 'letters') {
                for (let i = 1; i <= 4; i++) {
                    for (const ext of extensions) {
                        const imagePath = new URL(`../assets/images/Letters/${selectedLetter}${i}.${ext}`, import.meta.url).href;

                        const img = new Image();
                        img.src = imagePath;

                        await new Promise((resolve) => {
                            img.onload = () => {
                                newValidImages.push(imagePath);
                                resolve();
                            };
                            img.onerror = () => resolve();
                        });
                    }
                }
            } else {
                for (let i = 1; i <= 4; i++) {
                    for (const ext of extensions) {
                        const imagePath = new URL(`../assets/images/Words/${selectedLetter}${i}.${ext}`, import.meta.url).href;

                        const img = new Image();
                        img.src = imagePath;

                        await new Promise((resolve) => {
                            img.onload = () => {
                                newValidImages.push(imagePath);
                                resolve();
                            };
                            img.onerror = () => resolve();
                        });
                    }
                }
            }
            setValidImages(newValidImages);
        };

        loadValidImages();
    }, [selectedLetter, lessonType]);

    return validImages;
}

export function useAllLettersCorrect(correctLetters) {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        if (correctLetters.size === 28) {
            setShowOverlay(true);
        }
    }, [correctLetters]);

    return showOverlay;
}