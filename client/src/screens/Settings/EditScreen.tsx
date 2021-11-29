import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { detailStory, updateStory } from 'actions/storyActions';
import { Loader, Message } from 'components/shared';
import { Form, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'layouts/MainLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { StoryUpdateActionTypes } from 'types/stories';
import { RouteComponentProps } from 'react-router';

const categories = [
    { value: 'Thriller' },
    { value: 'Horror' },
    { value: 'Sports' },
    { value: 'Business' },
    { value: 'Music' },
    { value: 'Movie' },
    { value: 'Culture' },
    { value: 'Book' },
    { value: 'Travel' },
    { value: 'Sharing' },
    { value: 'Indite' },
];

interface MatchParams {
    id: string;
}

interface EditScreenProps extends RouteComponentProps<MatchParams> { }

const EditScreen = ({
    match: {
        params: { id }
    },
    history
}: EditScreenProps) => {
    const storyId = id;

    const [title, setTitle] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [body, setBody] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const storyDetail = useSelector((state: ReduxState) => state.storyDetail);
    const { loading, error, story } = storyDetail;

    const storyUpdate = useSelector((state: ReduxState) => state.storyUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = storyUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: StoryUpdateActionTypes.STORY_UPDATE_RESET });
            history.push('/my_stories');
        } else {
            if (!story || story._id !== storyId) {
                dispatch(detailStory(storyId));
            } else {
                setTitle(story.title);
                setImage(story.image);
                setCategory(story.category);
                setDescription(story.description);
                setBody(story.body);
            }
        }
    }, [
        dispatch,
        history,
        storyId,
        story,
        successUpdate
    ]);

    const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "blog_post");
        formData.append("cloud_name", "dsvc4kfvh");
        setUploading(true);

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_CLOUDINARY_ENDPOINT}/upload`,
                formData,
            );

            setImage(data.secure_url);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(updateStory({
            _id: storyId,
            title,
            image,
            category,
            description,
            body,
        }));
    };

    const storyDetailDisplay = () => {
        if (loading || loadingUpdate) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else if (errorUpdate)
            return <Message variant='danger'>{errorUpdate}</Message>;
        else
            return (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as='select'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {categories.map((categoryType, index) => (
                                <option key={index} value={categoryType.value}>{categoryType.value}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Image src={image} alt="Image" fluid />
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter image url'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                        <input
                            type="file"
                            id='image-file'
                            onChange={uploadFileHandler}
                        ></input>
                        {uploading && <Loader />}
                    </Form.Group>

                    <ReactQuill
                        theme="snow"
                        value={body}
                        onChange={setBody}
                    />

                    <Button type="submit" className="btn-red">
                        Update
                    </Button>
                </Form>
            )
    }

    return (
        <MainLayout>
            <h1>Edit Story</h1>
            {storyDetailDisplay()}
        </MainLayout>
    );
};

export default EditScreen;
