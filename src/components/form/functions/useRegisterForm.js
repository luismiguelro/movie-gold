import { useState } from 'react';
import axiosInstance from '../../api/axios';

const useRegisterForm = (setUser, navigate) => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [token, setToken] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosInstance.post('/api/v1/auth/register', formData);
    
            if (response.status === 200) {
                setSuccessMessage('Registration successful, now log in');
                setError('');
                setToken(response.data.token);
                clearForm();
                setFormSubmitted(true);

            } else {
                setError('Unexpected response from server');
                setSuccessMessage('');
               
            }
        } catch (error) {
            handleRequestError(error);
            console.log(error);
        }
    };

    const validateForm = () => {
        const emptyFields = Object.keys(formData).filter(key => formData[key] === '');
        if (emptyFields.length > 0) {
            setError('Por favor, completa todos los campos.');
            setFormSubmitted(true);
            return false;
        }
        return true;
    };

    const handleRequestError = (error) => {
        if (error.response) {
            setError(error.response.data);
        } else if (error.request) {
            setError('No response received. Please check your internet connection.');
        } else {
            setError('An unexpected error occurred. Please try again later.');
        }
        setSuccessMessage('');
    };

    const clearForm = () => {
        setFormData({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        });
        setFormSubmitted(false);
    };

    const copyTokenToClipboard = () => {
        navigator.clipboard.writeText(token);
        setToken('');
        setSuccessMessage('Token copied to clipboard');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return {
        formData,
        error,
        successMessage,
        token,
        formSubmitted,
        handleChange,
        handleSubmit,
        copyTokenToClipboard
    };
};

export default useRegisterForm;
