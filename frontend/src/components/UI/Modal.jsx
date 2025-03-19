import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IconX } from '@tabler/icons-react';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1005;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const ModalContent = styled.div`
    background-color: var(--third-color);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    max-width: 80%;
    max-height: 80%;
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.9)')};
    transition: transform 0.3s ease-in-out;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-light);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: var(--text-gray);
    }
`;

const Title = styled.h2`
    margin: 0 0 0.5rem 0;
    color: var(--text-light);
    font-size: 1.5rem;
    font-weight: 500;
`;

const Subtitle = styled.h3`
    margin: 0 0 1rem 0;
    color: var(--text-gray);
    font-size: 1.1rem;
    font-weight: 400;
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

export default function Modal({ isOpen, onClose, title, subtitle, children }) {
    return (
        <ModalOverlay $isOpen={isOpen} onClick={onClose}>
            <ModalContent $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>
                    <IconX size={24} />
                </CloseButton>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
                <ContentWrapper>
                    {children}
                </ContentWrapper>
            </ModalContent>
        </ModalOverlay>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.any,
};