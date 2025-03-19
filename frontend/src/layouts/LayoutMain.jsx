import styled from 'styled-components';
import NavBar from '../components/Navigation/Navbar';
import Footer from '../components/Navigation/Footer';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    margin-top: 5rem;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
`;

export default function LayoutMain() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    return (
        <Container>
            <NavBar />
            <MainContent>
                <ContentWrapper>
                    <Outlet />
                </ContentWrapper>
            </MainContent>
            <Footer />
        </Container>
    );
}