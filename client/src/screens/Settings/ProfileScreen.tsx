import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserDetail, listCollectionsUser, updateUserProfile } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Table, Image } from 'react-bootstrap';
import { Message, Loader } from 'components/shared';
import MainLayout from 'layouts/MainLayout';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { UserUpdateProfileActionTypes } from 'types/users';

interface ProfileScreenProps extends RouteComponentProps { }

const ProfileScreen = ({ history }: ProfileScreenProps) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState<string>();
    const [updateMessage, setUpdateMessage] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const userDetail = useSelector((state: ReduxState) => state.userDetail);
    const { loading, error, user } = userDetail;

    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state: ReduxState) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const collectionUser = useSelector((state: ReduxState) => state.collectionUser)
    const { collections, loading: loadingCollections, error: errorCollections } = collectionUser;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (success) {
                setUpdateMessage(true);
            }
            if (!user || success) {
                dispatch({ type: UserUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetail('profile'));
                dispatch(listCollectionsUser());
            } else {
                setName(user.name);
                setEmail(user.email);
                setAvatar(user.avatar);
                setBio(user.bio)
            }
        }
    }, [dispatch, history, userInfo, user, success]);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "creepy_story");
        formData.append("cloud_name", "dsvc4kfvh");
        setUploading(true);

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/upload`,
                formData,
            );

            setAvatar(data.secure_url);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            if (!user) return;
            dispatch(
                updateUserProfile({
                    _id: user._id,
                    name,
                    email,
                    avatar,
                    isAdmin: user.isAdmin,
                    password,
                    bio,
                })
            );
        }
    };

    return (
        <MainLayout>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    { }
                    {success && <Message variant='success'>Profile Updated</Message>}
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='avatar'>
                                <Form.Label>Avatar</Form.Label>
                                <Image src={avatar} alt="Profile" roundedCircle fluid />
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image url'
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                ></Form.Control>
                                <input
                                    type="file"
                                    id='image-file'
                                    onChange={uploadFileHandler}
                                ></input>
                                {uploading && <Loader />}
                            </Form.Group>

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

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Confirm password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='bio'>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button type='submit' className='btn-red'>
                                Update
                            </Button>
                        </Form>
                    )}
                </Col>
                <Col md={9}>
                    <h2>My Collections</h2>
                    {loadingCollections ? (
                        <Loader />
                    ) : errorCollections ? (
                        <Message variant='danger'>{errorCollections}</Message>
                    ) : (
                        <Table>
                            <thead>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Num</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {collections.map((collection) => (
                                    <tr key={collection._id}>
                                        <td>{collection._id}</td>
                                        <td>{collection.name}</td>
                                        <td>{collection.numStories}</td>
                                        <td>{collection.stories[0].title}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </MainLayout>
    );
};

export default ProfileScreen;
