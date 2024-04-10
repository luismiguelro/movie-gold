import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../api/axios';
import './Register.css'; // Importa tu archivo de estilos CSS aquí

const RegisterForm = () => {
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
                setSuccessMessage('Registration successful');
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

    return (
        <section className="text-center">
            {/* Background image */}
            <div className="p-5 bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/textures/full/171.jpg')", height: '300px' }}></div>
            {/* Background image */}

            <div className="card mx-4 mx-md-5 shadow-5-strong" style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
                <div className="card-body py-5 px-md-5">

                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="fw-bold mb-5">Sign up now</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <div className="row">
                                    {['firstname', 'lastname', 'email', 'password'].map(field => (
                                        <div className="col-md-6 mb-4" key={field}>
                                            <div data-mdb-input-init className={`form-outline ${formSubmitted && formData[field] === '' ? 'is-invalid' : ''}`}>
                                                <input type={field === 'email' ? 'email' : (field === 'password' ? 'password' : 'text')} id={`form3Example${field.charAt(0).toUpperCase() + field.slice(1)}`} className="form-control" value={formData[field]} onChange={handleChange} name={field} />
                                                <label className="form-label" htmlFor={`form3Example${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Button type="submit" variant="primary" className="btn btn-block mb-4">Sign up</Button>

                                {token && (
                                    <div>
                                        <p>Token: {token}</p>
                                        <Button onClick={copyTokenToClipboard} variant="secondary" className="mb-4">Copy Token</Button>
                                    </div>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterForm;
