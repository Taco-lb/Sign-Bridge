import { useState } from 'react';
import { notify } from '../components/utils/utils';

const useContactForm = (URL) => {
    const options = ['General inquiry', 'Technical support', 'Feature request', 'Bugs', 'Others'];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: options[0],
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const isFormValid = () => {
        return (
            formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            formData.message.trim() !== ''
        );
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            notify("error", "Error", "Please fill out all fields.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${URL}/api/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                notify("success", "Success", `${result.message || 'Message sent successfully!'}`);
                setFormData({
                    name: '',
                    email: '',
                    subject: options[0],
                    message: '',
                });
            } else {
                notify("error", "Failed", "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error('Error:', error);
            notify("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        options,
        loading,
        isFormValid: isFormValid(),
        handleChange,
        handleSubmit,
    };
};

export default useContactForm;