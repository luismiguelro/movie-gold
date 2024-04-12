import React, { useState } from 'react';
import useAuthFunctions from '../functions/useAuthFunction';
import { Form, Button, Alert } from 'react-bootstrap'; // Importa los componentes necesarios
import '../register/Register.css'; // Importa los estilos CSS del registro aquí

const LoginForm = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { handleSubmit, error } = useAuthFunctions();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit(email, password, setUser);
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
                            <h2 className="fw-bold mb-5">Login now</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleFormSubmit}>
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <input type="email" id="formBasicEmail" className="form-control" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <label className="form-label" htmlFor="formBasicEmail">Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div data-mdb-input-init className="form-outline">
                                            <input type="password" id="formBasicPassword" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <label className="form-label" htmlFor="formBasicPassword">Password</label>
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" variant="primary" className="btn btn-block mb-4">Login</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
