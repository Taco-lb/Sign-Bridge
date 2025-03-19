/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { emailRegex, notify } from '../components/utils/utils';

export default function useNewsletter (URL) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const isValidEmail = (email) => {
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${URL}/api/subscribe-newsletter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),    
            });

            const result = await response.json();

            if (response.ok) {
                notify('success','Success','Thank you for subscribing!');
                setEmail('');
            } else {
                notify('error','Failed',`${result.message || 'Failed to subscribe. Please try again.'}`);
            }
        } catch (error) {
            notify('error','Error', 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        loading,
        message,
        isValidEmail: isValidEmail(email),
        setEmail,
        handleSubmit,
    };
};