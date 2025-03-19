import { useState } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import Button from "./Button";
import { IconPlayerPlay, IconPlayerPause, IconInfoCircle, IconCamera } from '@tabler/icons-react';
import Modal from './Modal';
import { letters } from "../utils/utils";
import Dropdown from "./Dropdown";
import ASLAlphabetImage from '../../assets/images/ASL_Alphabet.jpg';
import PropTypes from 'prop-types';

const VideoContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--secondary-color);
    border-radius: 1rem;
    filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));
    
    @media (max-width: 1100px) {
        width: 400px;
        height: 400px;
    }
    @media (max-width: 768px) {
        width: 330px;
        height: 330px;
    }
`;

const WebcamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${({$simplified}) => $simplified ? "450px" : "400px"};
    border-radius: ${({$simplified}) => $simplified ? "1rem" : "1rem 1rem 0 0"};
    overflow: hidden;
    position: relative;

    @media (max-width: 1100px) {
        width: 400px;
        height: 400px;
    }
    @media (max-width: 768px) {
        width: 330px;
        height: 330px;
    }
`;

const WebcamFeed = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.4s ease-in-out;
    box-sizing: border-box;
`;

const PlaceholderCamera = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: var(--third-color);
    border-radius: ${({$simplified}) => $simplified ? "1rem" : "1rem 1rem 0 0"};;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.4s ease-in-out;
    align-content: center;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-gray);
        font-size: 1.2rem;
        gap: 0.5rem;

        svg {
            height: 20px;
            width: 20px;
        }
    }
`;

const DropdownContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
    object-fit: contain;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    display: flex;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    gap: 1rem;
`;

const RoundButton = styled(Button)`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    padding: 0.7rem 0;

    svg {
        width: 35px;
        height: 35px;
    }

    @media (max-width: 1100px) {
        width: 45px;
        height: 45px;
        padding: 0.5rem 0;

        svg {
            width: 30px;
            height: 30px;
        }
    }

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        padding: 0.5rem 0;

        svg {
            width: 25px;
            height: 25px;
        }
    }
`;

export default function SignDetector({ selectedLetter, setSelectedLetter, webcamRef, cameraOn, startCamera, stopCamera, simplified, lessonType, words }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <VideoContainer>
                <WebcamContainer $simplified={simplified}>
                    {cameraOn && (
                        <WebcamFeed $visible={cameraOn}>
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "user" }}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </WebcamFeed>
                    )}

                    <PlaceholderCamera $visible={!cameraOn} $simplified={simplified}>
                        <div>Camera Feed <IconCamera /> </div>
                        <div style={{fontSize:'1rem'}}>(Press the play button to start or</div>
                        <div style={{fontSize:'1rem'}}> the info button for help) </div>
                            
                    </PlaceholderCamera>

                    <ButtonWrapper>
                        <RoundButton
                            title="Start camera feed" onClick={() => cameraOn ? stopCamera() : startCamera(webcamRef)} $iconSize="35px">
                            {!cameraOn ? <IconPlayerPlay /> : <IconPlayerPause />}
                        </RoundButton>
                        <RoundButton title="View ASL alphabet" onClick={() => setIsModalOpen(true)}>
                            <IconInfoCircle />
                        </RoundButton>
                    </ButtonWrapper>
                </WebcamContainer>
                
                {!simplified && (
                    <DropdownContainer>
                        {lessonType === 'letters' ? (
                            <Dropdown onChange={(e) => setSelectedLetter(e.target.value)} value={selectedLetter}>
                                {letters.map((letter) => (
                                    <option key={letter} value={letter}>
                                        {letter === "del" ? "Delete" : 
                                        letter === "space" ? "Space" : "Letter " + letter}
                                    </option>
                                ))}
                            </Dropdown>
                        ) : (
                            <Dropdown onChange={(e) => setSelectedLetter(e.target.value)} value={selectedLetter}>
                                {Object.keys(words).map((word) => (
                                    <option key={word} value={word}>
                                        {word}
                                    </option>
                                ))}
                            </Dropdown>
                        )}
                    </DropdownContainer>
                )}
            </VideoContainer>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"ASL Alphabet"}
                subtitle={"You can use this as a general reference of the whole ASL alphabet."}
            >
                <img
                    src={ASLAlphabetImage}
                    alt="ASL Alphabet"
                    style={{ width: "80%", height: "auto", borderRadius: "0.5rem" }}
                />
            </Modal>
        </>
    );
}

SignDetector.propTypes = {
    selectedLetter: PropTypes.string.isRequired,
    setSelectedLetter: PropTypes.func.isRequired,
    webcamRef: PropTypes.any.isRequired,
    cameraOn: PropTypes.bool.isRequired,
    startCamera: PropTypes.func.isRequired,
    stopCamera: PropTypes.func.isRequired,
    simplified: PropTypes.bool,
    lessonType: PropTypes.string,
    words: PropTypes.object,
};