import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../api/axios';
import { jwtDecode } from 'jwt-decode' // import dependency


const LoginForm = ({ onLogin,  setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axiosInstance.post('/api/v1/auth/authenticate', {
                email: email.toLowerCase(),
                password: password
            })
            .then(res =>{
                const token = res.data.token;
                const user = jwtDecode(token); // decode token
                console.log(user);
                setUser(user)
            })

           
        } catch (error) {
            // Handle request errors
        
            setError(error.response);
        }
    };

    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default LoginForm;
