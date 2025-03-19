import styled from 'styled-components';
import SignDetector from '../components/UI/SignDetector';
import { useRef, useState } from 'react';
import useSignDetector from '../hooks/useSignDetection';
import Cards from '../components/UI/Cards';
import { IconCopy, IconVolume, IconHistory, IconSettings, IconTrash, IconMicrophone, IconPlayerPause } from '@tabler/icons-react';
import Notification from '../components/UI/Notification';
import Dropdown from '../components/UI/Dropdown';
import useTranscriptionHandlers from '../hooks/useTranscribeHandlers';
import PropTypes from 'prop-types';


const MainContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: var(--background-1);
    color: var(--text-dark);
    padding: 0;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const SectionBackground = styled.div`
    background-color: ${({ $bgColor }) => $bgColor || "var(--background-1)"};
`;

const SectionContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    flex: 1;
    padding: ${({ $padSize }) => $padSize || "2rem"};
    display: flex;
    flex-direction: ${({ $flexDir }) => $flexDir || "row"};
    align-items: ${({ $alignType }) => $alignType || "center"};
    gap: ${({ $gapSize }) => $gapSize || "3rem"};
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 1.5rem;
        flex-direction: column;
        gap: 2rem;
    }
`;

const SignContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: ${({ $flexDir }) => $flexDir || "row"};
    width: ${({ $width }) => $width || "50%"};
    gap: ${({ $gapSize }) => $gapSize || "1rem"};
    justify-content: ${({ $justType }) => $justType || "flex-start"};

    h2 {
        margin: 0;
    }
    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;

const TextAreaContainer = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--background-1);
    border-radius: 0.5rem;
`;

const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--background-1);
    color: var(--text-dark);
    max-height: 100px;
    overflow-y: scroll;
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 0.5rem;

    p {
        text-align: start;
        font-size: 1rem !important;
        margin: 0;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:hover {
            background-color: var(--background-2);
            border-radius: 0.25rem;
        }
    }
`;

const Text = styled.p`
    margin: 0;
    font-size: 1.25rem;

    @media (max-width: 768px) {
        font-size: 1rem;
        align-self: ${({$align}) => $align || "flex-start"};
    }
`;

const Title = styled.h1`
    margin: 0;
    color: var(--text-light);
    font-size: 2.25rem;

    @media (max-width: 768px) {
        font-size: 1.8rem;
    }
`;

const Timestamp = styled.span`
    font-size: 0.875rem;
    color: var(--text-gray);
    margin-left: 1rem;
`;

const SettingsContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const TextArea = styled.textarea`
    width: 100%;
    min-height: 100px;
    border: 0;
    border-radius: 0.5rem;
    resize: none;
    font-size: 1rem;
    pointer-events: none;
    font-family: inherit;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    background-color: transparent;
    z-index: 1;
`;

const Cursor = styled.span`
    position: absolute;
    top: 1rem;
    left: ${({ $cursorPosition }) => $cursorPosition}px;
    width: 2px;
    height: 1.2rem;
    background-color: var(--main-color);
    animation: blink 1s infinite;

    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;

const Setting = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

export default function TranscribePage({URL}) {
    const [selectedLetter, setSelectedLetter] = useState("");
    const [detectionDelay, setDetectionDelay] = useState(2000);
    const textAreaRef = useRef(null);
    const webcamRef = useRef(null);
    const { prediction, cameraOn, startCamera, stopCamera } = useSignDetector(URL);
    const {
        transcribedText,
        recentTranscriptions,
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
    } = useTranscriptionHandlers(prediction, detectionDelay, textAreaRef);

    const filteredVoices = voices.filter(voice => voice.lang === speechLanguage);

    return (
        <>
            <MainContainer>
                <SectionBackground $bgColor="var(--main-color)">
                    <SectionContainer $flexDir="column" $alignType="normal" $gapSize="1rem">
                        <Title>ASL Transcription</Title>
                        <Text style={{ color: "var(--text-light)" }}>Convert sign language to text and speech in real-time.</Text>
                    </SectionContainer>
                </SectionBackground>

                <SectionBackground $bgColor="var(--background-1)">
                    <SectionContainer>
                        <SignContainer>
                            <SignDetector
                                selectedLetter={selectedLetter}
                                setSelectedLetter={setSelectedLetter}
                                webcamRef={webcamRef}
                                cameraOn={cameraOn}
                                startCamera={startCamera}
                                stopCamera={stopCamera}
                                simplified={true}
                            />
                        </SignContainer>
                        <CardContainer $flexDir="column">
                            <Text $align={"center"}>Current Sign detected by the camera: {prediction}</Text>
                            <Cards
                                bgColor={"var(--background-2)"}
                                type={'transcribe'}
                                color={'var(--text-gray)'}
                                icons={[
                                    isListening ? IconPlayerPause : IconMicrophone, 
                                    IconCopy, 
                                    IconVolume, 
                                    IconTrash
                                ]}
                                iconHandlers={[toggleListening ,handleCopy, handleSpeak, handleTrash]}
                                title='Live Transcription'
                                disabled={!transcribedText || isSpeaking || isListening}
                            >
                                <TextAreaContainer>
                                    <TextArea
                                        ref={textAreaRef}
                                        placeholder='No text transcribed yet...'
                                        value={transcribedText}
                                        readOnly
                                    />
                                    {transcribedText && (<Cursor $cursorPosition={cursorPosition} />)}
                                </TextAreaContainer>
                            </Cards>
                            <Cards
                                bgColor={"var(--background-2)"}
                                type={'transcribe'}
                                color={'var(--text-gray)'}
                                icons={[IconHistory]}
                                title='Recent Transcription'
                            >
                                <HistoryContainer>
                                    {recentTranscriptions.map((entry, index) => (
                                        <Text key={index} onClick={() => handleRecentTranscriptionClick(entry.text)}>
                                            {entry.text}
                                            <Timestamp>{entry.timestamp}</Timestamp>
                                        </Text>
                                    ))}
                                </HistoryContainer>
                            </Cards>
                        </CardContainer>
                    </SectionContainer>
                </SectionBackground>

                <SectionBackground $bgColor="var(--background-2)">
                    <SectionContainer>
                        <CardContainer $width="100%">
                            <Cards
                                bgColor={"var(--background-2)"}
                                type={'transcribe'}
                                color={'var(--text-gray)'}
                                icons={[IconSettings]}
                                title='Transcription Settings'
                            >
                                <SettingsContainer>
                                    <Setting>
                                        Detection Delay (ms): 
                                        <input
                                            type="range"
                                            min="1000"
                                            max="4000"
                                            step="500"
                                            value={detectionDelay}
                                            onChange={(e) => setDetectionDelay(Number(e.target.value))}
                                        />
                                        {detectionDelay}
                                    </Setting>
                                    <Setting>
                                        Speech Rate:
                                        <input
                                            type="range"
                                            min="0.5"
                                            max="2"
                                            step="0.1"
                                            value={speechRate}
                                            onChange={(e) => setSpeechRate(Number(e.target.value))}
                                        />
                                        {speechRate}
                                    </Setting>
                                    <Setting>
                                        Language: 
                                        <Dropdown onChange={(e) => setSpeechLanguage(e.target.value)} margin={"0"} 
                                            bgColor={"var(--background-1)"} color={"var(--text-dark)"} size={"small"}
                                        >
                                            <option value="en-US">English (US)</option>
                                            <option value="es-MX">Spanish (Mexico)</option>
                                            <option value="fr-FR">French (France)</option>
                                        </Dropdown>
                                    </Setting>
                                    <Setting>
                                        Voice: 
                                        <Dropdown onChange={handleVoiceChange} margin={"0"} 
                                            bgColor={"var(--background-1)"} color={"var(--text-dark)"} size={"small"}
                                        >
                                            {filteredVoices.map((voice, index) => (
                                                <option key={index} value={index}>
                                                    {voice.name}
                                                </option>
                                            ))}
                                        </Dropdown>
                                    </Setting>
                                    <Setting>
                                        Auto-Speak: 
                                        <input
                                            type="checkbox"
                                            checked={autoSpeak}
                                            onChange={(e) => setAutoSpeak(e.target.checked)}
                                        />
                                    </Setting>
                                </SettingsContainer>
                            </Cards>
                        </CardContainer>
                    </SectionContainer>
                </SectionBackground>
            </MainContainer>
            <Notification autoClose={3000} closeOnClick={true} position='top-right'/>
        </>
    );
}

TranscribePage.propTypes = {
    URL: PropTypes.string.isRequired,
}