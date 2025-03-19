import { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import Logo from '../../assets/images/LogoWhiteNoText.png';
import { IconMenu2, IconX } from '@tabler/icons-react';

const TopBackground = styled.div`
    width: 100%;
    height: 5rem;
    background-color: var(--secondary-color);
    position: fixed;
    z-index: 1000;
`;

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 5rem;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;
    background-color: var(--secondary-color);
    
`;

const LogoAndNameContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 0.25rem;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover{
        transform: scale(1.01);
        transition: transform 0.2s ease-in-out;
    }   

    h2 {
        color: var(--text-light);
        font-weight: 600;
    }
`;

const LogoContainer = styled.div`
    width: 4rem;
    height: 4rem;
    display: flex;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 2.5rem;
    margin-right: 2rem;

    li {
        cursor: pointer;
        font-weight: 500;
        color: var(--text-light);
        position: relative;
        transition: color 0.3s ease-in-out;
        transition: transform 0.2s ease-in-out;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -3px;
            width: 100%;
            height: 2px;
            background: var(--main-color);
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.3s ease-in-out;
        }

        &:hover::after,
        &:focus::after {
            transform: scaleX(1);
        }

        &:hover {
            color: var(--text-light);
            transform: scale(1.1);
            transition: transform 0.2s ease-in-out;
            filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.3));
        }
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none; 
    color: var(--text-light);
    transition: color 0.3s ease-in-out;

    &:hover {
        color: var(--main-color);
    }

    @media (max-width: 768px) {
        &:hover {
            color: var(--text-light);
        }
    }
`;


const MobileMenuIcon = styled.div`
    display: none;
    color: var(--text-light);
    cursor: pointer;
    margin-right: 1.3rem;
    z-index: 1100;
    position: relative;
    width: 32px;
    height: 32px;

    @media (max-width: 768px) {
        display: block;
    }
`;

const BurgerIcon = styled(IconMenu2)`
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${({ $isOpen }) => ($isOpen ? '0' : '1')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const CloseIconX = styled(IconX)`
    position: absolute;
    top: 0;
    left: 0;
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const MobileNav = styled.div`
    position: fixed;
    top: ${({ $isOpen }) => ($isOpen ? '5rem' : '-100vh')};
    left: 0;
    width: 100%;
    height: calc(100vh - 5rem);
    background: rgb(51, 51, 51, 0.7);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: top 0.5s ease-in-out;
    z-index: 999;

    ul {
        list-style: none;
        text-align: center;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        li {
            cursor: pointer;
            font-size: 2rem;
            font-weight: 600;
            color: var(--text-light);
            position: relative;
            transition: color 0.3s ease-in-out;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: -5px;
                width: 100%;
                height: 2px;
                background: var(--text-light);
                transform: scaleX(0);
                transform-origin: center;
                transition: transform 0.3s ease-in-out;
            }

            &:hover::after,
            &:focus::after {
                transform: scaleX(1);                
            }

            &:hover {
                color: var(--text-light);
            }
        }
    }
`;

export default function NavBar() {
    const [isMobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <TopBackground>
                <TopContainer>
                    <StyledLink to="/">
                        <LogoAndNameContainer>
                            <LogoContainer>
                                <img src={Logo} alt="Sign Bridge Logo" />
                            </LogoContainer>
                            <h2>Sign Bridge</h2>
                        </LogoAndNameContainer>
                    </StyledLink>
                    <Nav>
                        <NavLinks>
                            <h3><li><StyledLink to="/">Home</StyledLink></li></h3>
                            <h3><li><StyledLink to="/learn">Learn</StyledLink></li></h3>
                            <h3><li><StyledLink to="/transcribe">Transcribe</StyledLink></li></h3>
                            <h3><li><StyledLink to="/contact">Contact</StyledLink></li></h3>
                        </NavLinks>
                    </Nav>
                    <MobileMenuIcon onClick={() => setMobileOpen(!isMobileOpen)}>
                        <BurgerIcon $isOpen={isMobileOpen} size={32} />
                        <CloseIconX $isOpen={isMobileOpen} size={32} />
                    </MobileMenuIcon>
                </TopContainer>
                <MobileNav $isOpen={isMobileOpen}>
                    <ul>
                        <li onClick={() => setMobileOpen(false)}><StyledLink to="/">Home</StyledLink></li>
                        <li onClick={() => setMobileOpen(false)}><StyledLink to="/learn">Learn</StyledLink></li>
                        <li onClick={() => setMobileOpen(false)}><StyledLink to="/transcribe">Transcribe</StyledLink></li>
                        <li onClick={() => setMobileOpen(false)}><StyledLink to="/contact">Contact</StyledLink></li>
                    </ul>
                </MobileNav>
            </TopBackground>
        </>
    );
}
