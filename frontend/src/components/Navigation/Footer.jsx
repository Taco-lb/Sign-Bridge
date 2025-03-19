import styled from "styled-components";

const FooterContainer = styled.footer`
    background-color: var(--secondary-color);
    color: var(--text-light);
    padding: 1.5rem;
    text-align: center;
    position: relative;
`;

const FooterContent = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    p{
        margin: 0;
    }
`;

const Copyright = styled.p`
    font-size: 0.9rem;
    opacity: 0.7;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterContent>
                <p>Sign Bridge - Bridging the gap in communication through sign language.</p>               
                <Copyright>&copy; {new Date().getFullYear()} Sign Bridge. All rights reserved.</Copyright>
            </FooterContent>
        </FooterContainer>
    );
}
