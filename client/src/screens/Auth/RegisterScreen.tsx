import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Message, Loader } from 'components/shared';
import { register } from 'actions/userActions';
import { Link, RouteComponentProps } from 'react-router-dom';

import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import AuthLayout from 'layouts/AuthLayout';

interface RegisterScreenProps extends RouteComponentProps {}

const RegisterScreen = ({
	location: { search },
	history
}: RegisterScreenProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>();

    const dispatch = useDispatch<AppDispatch>();

    const userRegister = useSelector((state: ReduxState) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = search ? search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password do not match');
        } else {
            dispatch(register(name, email, password));
        }
    };

    return (
        <AuthLayout>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='name'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className="btn-red">
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </AuthLayout>
    );
};

export default RegisterScreen;
