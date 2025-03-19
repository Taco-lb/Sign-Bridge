import styled from 'styled-components';
import Cards from './Cards';
import Button from './Button';
import Dropdown from './Dropdown';
import useContactForm from '../../hooks/useContactForm';
import Notification from './Notification';
import Loader from './Loader';
import PropTypes from 'prop-types';

const MainContainer = styled.div`
    width: 100%;
    padding: 1rem;
    position: relative;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin: 0;
    gap: 1rem;
`;

const TopContainer = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    flex: 1;

    @media(max-width: 768px){
        flex-direction: column;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    font-weight: 500;
    font-size: 1rem;
    color: var(--text-middle);
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
`;

const TextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    resize: vertical;
    min-height: 150px;
    resize: none;
    font-family: inherit;
`;

export default function ContactForm({URL}) {
    const { formData, options, loading, isFormValid, handleChange, handleSubmit } = useContactForm(URL);

    return (
        <>
            <MainContainer>
                <Cards
                    bgColor={'var(--background-1)'}
                    type={'contact'}
                    alignS={'center'}
                    title='Send us a Message'
                >
                    <Form onSubmit={handleSubmit}>
                        <Loader isLoading={loading} />
                        <TopContainer>
                            <InputContainer>
                                Your name
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </InputContainer>

                            <InputContainer>
                                Your email
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="johndoe@email.com"
                                    value={formData.email.toLowerCase()}
                                    onChange={handleChange}
                                    required
                                    disabled={loading}
                                />
                            </InputContainer>
                        </TopContainer>

                        <InputContainer>
                            Subject
                            <Dropdown
                                name={'subject'}
                                value={formData.subject}
                                onChange={handleChange}
                                bgColor={'var(--background-1)'}
                                margin={'0'}
                                color={'var(--text-dark)'}
                                required
                                disabled={loading}
                            >
                                {options.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Dropdown>
                        </InputContainer>

                        <InputContainer>
                            Message
                            <TextArea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </InputContainer>

                        <Button
                            type="submit"
                            style={{ alignSelf: 'flex-end', borderRadius: '0.75rem' }}
                            disabled={loading || !isFormValid}
                        >
                            Send Message
                        </Button>
                    </Form>
                </Cards>
            </MainContainer>
            <Notification autoClose={3000} closeOnClick={true} position='top-right'/>
        </>
    );
}

ContactForm.propTypes = {
    URL: PropTypes.string.isRequired,
}