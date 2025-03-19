import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoaderOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: inherit;
    z-index: 10;
`;

const LoaderSpinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export default function Loader ({ isLoading }){
    if (!isLoading) return null;

    return (
        <LoaderOverlay>
            <LoaderSpinner />
        </LoaderOverlay>
    );
};

Loader.propTypes = {
    isLoading: PropTypes.bool,
}