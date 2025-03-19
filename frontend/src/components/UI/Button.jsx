import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonDesigned = styled.button`
    flex: 1;
    max-width: 200px;
    padding: 1rem 2rem;
    font-weight: 400;
    font-size: 1rem;
    color: var(--text-light);
    background-color: var(--main-color);
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:disabled {
        background-color: var(--disabled);
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: var(--hover);
    }

    @media (max-width: 768px){
        padding: 0.8rem 1rem;
    }
`;

export default function Button({ children, ...props}){
    return(
        <>
            <ButtonDesigned {...props}>
                {children}
            </ButtonDesigned>
        </>
    )
}

Button.propTypes = {
    children: PropTypes.any.isRequired,
};
