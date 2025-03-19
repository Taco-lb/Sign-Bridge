/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import dingSound from '../../assets/sounds/DingSound.mp3';
import winnerSound from '../../assets/sounds/Winner.mp3';

const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ $bgColor }) => $bgColor || "rgba(77, 192, 77, 0.9)"};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    font-size: 2rem;
    color: var(--text-light);
    flex-direction: column;
    gap: 1rem;
    cursor: pointer;
    opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const SuccessMessage = styled.div`
    font-size: 3.5rem;
    font-weight: bold;
    color: var(--text-light);
    white-space: pre-line;
    text-align: center;
    @media (max-width: 1100px) {
        font-size: 2.5rem;
    }

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

export default function Overlay({ message, type, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(type === "winner" ? winnerSound : dingSound);

        audioRef.current.play().catch((error) => {
            console.error('Failed to play sound:', error);
        });

        setIsVisible(true);

        const autoCloseTimer = setTimeout(() => {
            handleClose();
        }, 4000);

        return () => {
            clearTimeout(autoCloseTimer);

            // Add a small delay before pausing the audio to prevent the audio from stopping early and causing errors
            setTimeout(() => {
                if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                }
            }, 100);
        };
    }, [type]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
        onClose();
        }, 300);
    };

    return (
        <OverlayContainer
        $isVisible={isVisible}
        onClick={handleClose}
        $bgColor={type === "winner" ? "rgba(255, 217, 0, 0.9)" : "rgba(77, 192, 77, 0.9)"}
        >
            <SuccessMessage>{message}</SuccessMessage>
            <p>(Click/Tap to close)</p>
        </OverlayContainer>
    );
}

Overlay.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};