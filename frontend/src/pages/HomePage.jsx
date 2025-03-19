import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageCarousel from '../components/UI/ImageCarousel';
import { IconBook, IconFileDescription, IconUsers } from '@tabler/icons-react';
import Cards from '../components/UI/Cards';
import Button from '../components/UI/Button';

const MainContainer = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: ${({ $bgColor }) => $bgColor || "var(--background-1)"} ;
    color: var(--text-dark);
    padding: 0;
    display: flex;
    flex-direction: column;
`;

const SectionBackground = styled.div`
    background-color: ${({ $bgColor }) => $bgColor || "var(--background-1)"} ;
`;

const SectionContainer = styled.div`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    flex: 1;
    padding: ${({ $padSize }) => $padSize || "3rem"};
    display: flex;
    flex-direction: ${({ $flexDir }) => $flexDir || "row"};
    align-items: center;
    gap: ${({ $gapSize }) => $gapSize || "3rem"};
    box-sizing: border-box;
    
    @media (max-width: 768px) {
        padding: 1.5rem;
        flex-direction: column;
        gap: 1rem;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    h1 {
        margin: 0 0 0.5rem 0;
        font-size: 4.5rem;
        color: var(--main-color);
    }
    h2 {
        margin: 0;
        font-size: 2.3rem;
        font-weight: 600;
        color: var(--text-middle);
    }
    h3 {
        text-align: justify;
        font-size: 1.2rem;
        font-weight: 400;
        margin: 1rem 0;
        color: var(--text-gray);
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 0;
        gap: 0;
        align-items: flex-start;
        h1 {
            margin: 0 0 1rem 0;
            font-size: 3.5rem;
        }
        h2 {
            margin: 0;
            font-size: 1.6rem;
        }
        h3 {
            text-align: justify;
            font-size: 1rem;
            margin: 1rem 0;
        }
    }
`;

const ImagesContainer = styled.div`
    width: 50%;
    filter: drop-shadow(0 0 8px rgb(0, 0, 0, 0.7));

    @media (max-width: 768px) {
        width: 100%;
        padding: 1rem 0;
        align-items: flex-start;
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

const ButtonContainer = styled.div`
    display: flex;
    gap: 2rem;
    justify-content: center;
    width: 100%;
    @media (max-width: 768px) {
        gap: 1rem;
    }
`;

export default function HomePage() {
    return (
        <MainContainer>
            
            <SectionBackground $bgColor="var(--background-1)">
                <SectionContainer $padSize="4rem">
                    <TitleContainer>
                        <h1> Sign <br/> Bridge </h1> 
                        <h2> Fluent Fingers, Open Minds</h2>
                        <h3>Welcome to Sign Bridge, where we believe that communication should have no barriers.
                            Our platform provides an accessible and engaging way to learn American Sign Language 
                            (ASL) alphabet and seamlessly transcribe ASL into text and voice.
                        </h3>
                    </TitleContainer>
                    <ImagesContainer>
                        <ImageCarousel />
                    </ImagesContainer>
                </SectionContainer>
            </SectionBackground>
            
            <SectionBackground $bgColor="var(--background-2)">
                <SectionContainer $flexDir="column" $gapSize="2rem" $padSize="4rem">
                    <h2 style={{ margin: "0" }}>Why Choose Sign Bridge?</h2>
                    <CardsContainer>
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconBook} 
                            title='Interactive Learning' 
                            description='Learn ASL through engaging, interactive lessons designed for all skill levels.'
                        />
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconFileDescription} 
                            title='ASL Transcription' 
                            description='Convert ASL Alphabet to text and voice seamlessly.'
                        />
                        <Cards bgColor={"var(--background-1)"} 
                            icon={IconUsers} 
                            title='Community Support' 
                            description='Join a vibrant community of learners and native signers by signing up to our newsletter.'
                        />
                    </CardsContainer>
                </SectionContainer>
            </SectionBackground>

            <SectionBackground $bgColor="var(--background-1)">
                <SectionContainer $flexDir="column" $gapSize="2rem" $padSize="4rem">
                    <h2 style={{ margin: "0", fontSize: "1.5rem", textAlign: "center" }}>
                        Ready to Bridge the Communication Gap?
                    </h2>
                    <p style={{ margin: "0", fontSize: "1.1rem", textAlign: "center", color: "var(--text-gray)" }}>
                        Start your journey by learning the ASL Alphabet or Transcribing your ASL today.
                    </p>
                    <ButtonContainer>
                        <Link to="/learn"><Button>Start Learning</Button></Link>
                        <Link to="/transcribe"><Button>Start Transcribing</Button></Link>
                    </ButtonContainer>
                </SectionContainer>
            </SectionBackground> 

        </MainContainer>
    );
}