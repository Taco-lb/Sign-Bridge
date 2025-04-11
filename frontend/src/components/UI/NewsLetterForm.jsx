import styled from 'styled-components';
import Button from './Button';
import useNewsletter from '../../hooks/useNewsLetter';
import PropTypes from 'prop-types';

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
`;

export default function NewsletterForm({URL}) {
    const { email, loading, isValidEmail, setEmail, handleSubmit } = useNewsletter(URL);

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '2rem', width: '100%' }}>
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                        required
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        disabled={loading || !isValidEmail}
                        style={{ borderRadius: '0.75rem' }}
                    >
                        {loading ? 'Submitting...' : 'Subscribe'}
                    </Button>
                </form>
            </FormContainer>
        </>
    );
}

NewsletterForm.propTypes = {
    URL: PropTypes.string.isRequired,
}