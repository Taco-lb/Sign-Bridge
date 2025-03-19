import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FAQItemWrapper = styled.div`
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow: hidden;
    background: white;
`;

const Question = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--background-1);
    cursor: pointer;
    font-weight: bold;
`;

const AnswerWrapper = styled.div`
    display: grid;
    grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
    transition: grid-template-rows 0.2s ease-in-out;
`;

const Answer = styled.div`
    overflow: hidden;
    border-top: 1px solid #ddd;
    padding: ${({ $isOpen }) => ($isOpen ? "1rem" : "0rem")};
    background: var(--background-1);
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    transition: opacity 0.2s ease-in-out, padding 0.3s ease-in-out;
`;

const ChevronIcon = styled(IconChevronDown)`
    transition: transform 0.2s ease-in-out;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

export default function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <FAQItemWrapper>
            <Question onClick={() => setIsOpen(!isOpen)}>
                {question}
                <ChevronIcon $isOpen={isOpen} />
            </Question>
            <AnswerWrapper $isOpen={isOpen}>
                <Answer $isOpen={isOpen}>{answer}</Answer>
            </AnswerWrapper>
        </FAQItemWrapper>
    );
}

FaqItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};
