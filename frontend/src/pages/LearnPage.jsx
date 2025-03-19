import { useState, useRef} from 'react';
import styled from 'styled-components';
import SignDetector from '../components/UI/SignDetector';
import Cards from '../components/UI/Cards';
import { IconAbc, IconBook, IconBookUpload, IconClock, IconCopy, IconSortAZ, IconTrash } from '@tabler/icons-react';
import Button from '../components/UI/Button';
import useSignDetector from '../hooks/useSignDetection';
import Overlay from '../components/UI/Overlay';
import letterTips from '../assets/jsons/tips.json';
import words from '../assets/jsons/words.json';
import { useTimeSpent, usePredictionCheck, useValidImages, useAllLettersCorrect } from '../hooks/useLearnPage';
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
        gap: 1rem;
    }
`;

const CardContainer = styled.div`
    display: flex;
    flex-direction: ${({ $flexDir }) => $flexDir || "row"};
    width: ${({ $width }) => $width || "50%"};
    gap: ${({ $gapSize }) => $gapSize || "1rem"};
    justify-content: ${({ $justType }) => $justType || "flex-start"};

    h2{
        margin: 0;
    }
    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
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

const StyledList = styled.ul`
    list-style: none;
    padding-left: 0.5rem;
    margin: 0; 

    li {
        position: relative;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
        padding-left: 1.5rem;
    }

    li::before {
        content: '>';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: var(--main-color);
        font-size: 1.2rem;
        font-weight: bold;
    }
`;

const ShowImagesButton = styled(Button)`
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s;
    align-self: center;
`;

const ImagesContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 100%;
    overflow: hidden;
    padding: 0 1rem;
    opacity: ${({ $showImages }) => ($showImages ? '1' : '0')};
    transform: ${({ $showImages }) => ($showImages ? 'translateY(0)' : 'translateY(-10px)')};
    transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
    max-height: ${({ $showImages }) => ($showImages ? '400px' : '0')};
    transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
`;
const TextAreaContainer = styled.div`
    position: relative;
    width: 100%;
    background-color: var(--background-1);
    border-radius: 0.5rem;
`;

const LetterImage = styled.img`
    width: 100px;
    height: auto;
    border-radius: 0.5rem;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
    transition: opacity 0.3s ease-in-out;
    opacity: ${({ $showImages }) => ($showImages ? '1' : '0')};
`;

const Text = styled.p`
    margin: 0;
    font-size: 1.25rem;

    @media (max-width: 768px) {
        font-size: 1rem;
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

export default function LearnPage({URL}) {
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [showImages, setShowImages] = useState(false);
    const [lessonType, setLessonType] = useState('letters');
    const webcamRef = useRef(null);
    const textAreaRef = useRef(null);
    const { prediction, cameraOn, startCamera, stopCamera } = useSignDetector(URL);

    const {
        transcribedText,
        setTranscribedText,
        handleCopy,
        handleTrash,
        cursorPosition,
    } = useTranscriptionHandlers(prediction, 2000, textAreaRef);

    const clearTranscription = () => {
        setTranscribedText('');
    };

    const { completedLetters, completedWords, showOverlay, closeOverlay } = usePredictionCheck(
        prediction,
        selectedLetter,
        transcribedText,
        lessonType,
        clearTranscription
    );


    const timeSpent = useTimeSpent();
    const validImages = useValidImages(selectedLetter, lessonType);
    const allLettersCorrectOverlay = useAllLettersCorrect(completedLetters);

    const replacementLetter = selectedLetter === 'del' ? 'Delete' : selectedLetter === 'space' ? 'Space' : selectedLetter;

    const handleLessonCardClick = (type) => {
        setLessonType(type);
        setSelectedLetter(type === 'letters' ? "A" : "HELLO");
        setTranscribedText('');
    };

    return (
        <>
            <MainContainer>
                <SectionBackground $bgColor="var(--main-color)">
                    <SectionContainer $flexDir="column" $alignType="normal" $gapSize="1rem">
                        <Title>Learn the ASL {lessonType === 'letters' ? 'Alphabet' : 'Words'}</Title>
                        <Text style={{ color: "var(--text-light)" }}>Master the American Sign Language one  
                            {lessonType === ' letters' ? ' letter' : ' word'} at the time. (Scroll down for modes)
                        </Text>
                    </SectionContainer>
                </SectionBackground>

                <SectionBackground $bgColor="var(--background-1)">
                    <SectionContainer>
                    <CardContainer $flexDir={"column"}>
                            <h2>You are currently learning {lessonType === 'letters' ? (
                                (replacementLetter === 'Delete' || replacementLetter === 'Space'
                                    ? ' the sign to: ' : ' the letter: ') + selectedLetter
                            ) : (
                                ' the word: ' + selectedLetter
                            )}</h2>
                            {lessonType === 'letters' ? (
                                <Cards
                                    bgColor={"var(--background-1)"}
                                    icon={IconBook}
                                    title={'Tips on learning' + (replacementLetter === 'Delete' || replacementLetter === 'Space'
                                        ? ' the sign for "' : ' the letter "') + replacementLetter + '"'}
                                >
                                    <StyledList>
                                        {letterTips[selectedLetter]?.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </StyledList>
                                </Cards>
                            ) : (
                                <Cards
                                    bgColor={"var(--background-1)"}
                                    type={'transcribe'}
                                    color={'var(--text-gray)'}
                                    icons={[
                                        IconCopy,
                                        IconTrash
                                    ]}
                                    iconHandlers={[ handleCopy, handleTrash]}
                                    title='Live Transcription'
                                    disabled={!transcribedText}
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
                            )}
                            <Text>Current Sign detected by the camera: {prediction}</Text>
                            {lessonType === 'letters' ? (
                                <>
                                    <ShowImagesButton title="show sample images" onClick={() => setShowImages(!showImages)} >
                                    {showImages ? 'Hide Examples' : 'Show Examples'}
                                    </ShowImagesButton>
                                    <ImagesContainer $showImages={showImages}>
                                        {validImages.map((image, index) => (
                                            <LetterImage
                                                key={index}
                                                src={image}
                                                alt={`${selectedLetter} example ${index + 1}`}
                                                $showImages={showImages}
                                            />
                                        ))}
                                    </ImagesContainer> 
                                </>
                                ) : (
                                    <>
                                    </>
                                )
                            }                            
                        </CardContainer>
                        <SignContainer>
                            <SignDetector
                                selectedLetter={selectedLetter}
                                setSelectedLetter={setSelectedLetter}
                                webcamRef={webcamRef}
                                cameraOn={cameraOn}
                                startCamera={startCamera}
                                stopCamera={stopCamera}
                                lessonType={lessonType}
                                words={words}
                            />
                        </SignContainer>
                    </SectionContainer>
                </SectionBackground>

                <SectionBackground $bgColor={"var(--background-2)"}>
                    <SectionContainer>
                        <CardContainer $gapSize="2rem" $width="100%" $justType="center">
                            <Cards
                                bgColor={"var(--background-1)"}
                                type={'learn'}
                                color={`${lessonType === 'letters' ? 
                                    (completedLetters.size === 28 ? "var(--accent-2)" : "var(--main-color)") : 
                                    (completedWords.size === 5 ? "var(--accent-2)" : "var(--main-color)")
                                }`}
                                icon={IconBookUpload}
                                title='Lessons Completed'
                                description='Keep going! You&apos;re making great progress.'
                                mainText={`${lessonType === 'letters' ? completedLetters.size : completedWords.size}/${lessonType === 'letters' ? 28 : 5}`}
                            />
                            <Cards
                                bgColor={"var(--background-1)"}
                                type={'learn'}
                                color={"var(--main-color)"}
                                icon={IconClock}
                                title='Practice Time'
                                description='Current practice session ongoing time.'
                                mainText={`${Math.floor(timeSpent / 60)} ${Math.floor(timeSpent / 60) === 1 ? "min" : "mins"}`}
                            />
                        </CardContainer>
                    </SectionContainer>
                </SectionBackground>
                <SectionBackground>
                    <SectionContainer>
                        <CardContainer $gapSize="2rem" $width="100%" $justType="center">
                            <Cards
                                bgColor={"var(--background-1)"}
                                type={'lesson'}
                                color={"rgba(77, 192, 77, 1)"}
                                icon={IconSortAZ}
                                title='Letter Recognition'
                                description='Practice recognizing letters.'
                                mainText={`Beginner`}
                                onClick={() => handleLessonCardClick('letters')}
                            />
                            <Cards
                                bgColor={"var(--background-1)"}
                                type={'lesson'}
                                color={"var(--accent-1)"}
                                icon={IconAbc}
                                title='Word Formation'
                                description='Form simple words using letters.'
                                mainText={`Advanced`}
                                onClick={() => handleLessonCardClick('words')}
                            />
                        </CardContainer>
                    </SectionContainer>
                </SectionBackground>
            </MainContainer>

            {(showOverlay || allLettersCorrectOverlay) && (
                <Overlay
                    message={lessonType === 'letters' ? (
                        completedLetters.size === 28 ? '🎉Congratulations!🎉 \nYou did all the letters/signs correctly \n You Rock🤘🏻 ' : 
                        'Correctly done' + (replacementLetter === 'Delete' || replacementLetter === 'Space'
                            ? ' the sign for "' : ' the letter "') + replacementLetter + '" 👏🏻'
                    ) : (
                        completedWords.size === 5 ? '🎉Congratulations!🎉 \nYou did all the words correctly \n You Rock🤘🏻 ' : 
                        `Correctly done the word "${selectedLetter}" 👏🏻`
                    )}
                    type={(lessonType === 'letters' && completedLetters.size === 28) || (lessonType === 'words' && completedWords.size === 5) ? "winner" : ""}
                    onClose={closeOverlay}
                />
            )}
        </>
    );
}

LearnPage.propTypes = {
    URL: PropTypes.string.isRequired,
}