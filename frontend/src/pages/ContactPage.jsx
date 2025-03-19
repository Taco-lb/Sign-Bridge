/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Cards from '../components/UI/Cards';
import { IconAlertCircle, IconMail, IconMessage } from '@tabler/icons-react';
import ContactForm from '../components/UI/ContactForm';
import FaqItem from '../components/UI/FaqItem';
import NewsletterForm from '../components/UI/NewsLetterForm';
import { localH, ngrok } from '../components/utils/utils';

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

const CardsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    justify-content: center;
    gap: 2rem;
    padding: 1rem;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
`;

const FAQContainer = styled.div`
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const Text = styled.p`
    margin: 0;
    font-size: 1rem;
    font-weight: 500;
    @media (max-width: 768px) {
        font-size: 0.9rem;
        align-self: ${({$align}) => $align || "flex-start"};
    }
`;

const Title = styled.h1`
    margin: 0;
    color: ${({$color}) => $color || "var(--text-light)"};
    font-size: 2.25rem;

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

const URL = ngrok;

export default function ContactPage () {
    
    const faqs = [
        {
            question: "How accurate is the ASL recognition?",
            answer: "Our ASL recognition system achieves over 90-95% accuracy for ASL letters. We continuously improve our recognition algorithms through machine learning and user feedback."
        },
        {
            question: "Can I use Sign Bridge offline?",
            answer: "Currently, Sign Bridge requires an internet connection to process sign language recognition."
        },
        {
            question: "How can I improve my accuracy?",
            answer: "Practice regularly, ensure good lighting conditions, and follow the tips provided in each lesson."
        }
    ];

    return(
        <MainContainer>
            <SectionBackground $bgColor="var(--main-color)">
                <SectionContainer $flexDir="column" $alignType="normal" $gapSize="1rem">
                    <Title>Contact US</Title>
                    <Text style={{ color: "var(--text-light)" }}>Get in touch with our team for support, feedback, questions, or join our newsletter.
                    </Text>
                </SectionContainer>
            </SectionBackground>

            <SectionBackground>
                <SectionContainer>
                    <CardsContainer>
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconMail}
                            alignS={"center"} 
                            title='Email Support' 
                            description='Get help with anything related to our site'
                        />
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconMessage} 
                            alignS={"center"} 
                            title='Feature Request' 
                            description='Suggest new features or improvements'
                        />
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconAlertCircle} 
                            alignS={"center"} 
                            title='Report Issues' 
                            description='Report bugs or problems with the platform'
                        />
                    </CardsContainer>
                </SectionContainer>
            </SectionBackground>

            <SectionBackground $bgColor="var(--background-2)">
                <SectionContainer $gapSize={"0"}>
                    <ContactForm URL={URL}/>
                </SectionContainer>
            </SectionBackground>
            
            <SectionBackground>
                <SectionContainer $gapSize={'2rem'}>
                    <Title $color='var(--main-color)'>Subscribe to our Newsletter</Title>
                    <Text>Stay updated with the latest news and updates from Sign Bridge.</Text>
                    <NewsletterForm URL={URL} />
                </SectionContainer>
            </SectionBackground>

            <SectionBackground $bgColor="var(--background-2)">
                <SectionContainer $flexDir="column">
                    <Title $color='var(--text-dark)'>Frequently Asked Questions (FAQ)</Title>
                    <FAQContainer>
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </FAQContainer>
                </SectionContainer>
            </SectionBackground>

        </MainContainer>
    );
}