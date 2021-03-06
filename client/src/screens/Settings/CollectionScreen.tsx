import React, { useEffect, useState } from 'react';
import { deleteCollection, detailCollection, removeStoryFromCollection } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from 'components/shared';
import { MainLayout } from 'layouts';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import {
    Button,
    Row,
    Col,
    Image,
    Card,
    Badge,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import { RemoveIcon, ReviewIcon, TrashIcon, ViewIcon } from 'components/icons';

interface MatchParams {
    id: string;
}

interface CollectionScreenProps extends RouteComponentProps<MatchParams> { }

const CollectionScreen = ({
    match: {
        params: { id }
    },
    history
}: CollectionScreenProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    const collectionDetail = useSelector((state: ReduxState) => state.collectionDetail);
    const { loading, error, collection } = collectionDetail;

    const collectionDelete = useSelector((state: ReduxState) => state.collectionDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = collectionDelete;

    const collectionRemoveStory = useSelector((state: ReduxState) => state.collectionRemoveStory);
    const { loading: loadingRemove, error: errorRemove, success: successRemove } = collectionRemoveStory;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(detailCollection(id));
            setName(userInfo.name);
            setAvatar(userInfo.avatar);
            setBio(userInfo.bio)
        }
    }, [
        id,
        dispatch,
        userInfo,
        successDelete,
        successRemove
    ]);

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure delete collection?')) {
            dispatch(deleteCollection(id));
        }
    };

    const removeHandler = (collectionId: string, storyId: string) => {
        if (window.confirm('Are you sure remove story from collection?')) {
            dispatch(removeStoryFromCollection(collectionId, storyId));
        }
    }

    const displayCollectionDetail = () => {
        if (loading || loadingDelete || loadingRemove) return <Loader />;
        else if (error || !collection)
            return <Message variant='danger'>{error}</Message>;
        else if (errorDelete)
            return <Message variant='danger'>{errorDelete}</Message>;
        else if (errorRemove)
            return <Message variant='danger'>{errorRemove}</Message>;
        else
            return (
                <>
                    <Row>
                        <Col md={3}>
                            <Card className="text-center profile">
                                <Image src={avatar} alt="Profile" roundedCircle fluid />

                                <Card.Title as="h6">
                                    <strong>{name}</strong>
                                </Card.Title>

                                <i>{bio}</i>
                            </Card>
                        </Col>
                        <Col md={9}>
                            <div className="name">
                                <h3>{collection.name} ({collection.numStories})</h3>

                                <Button
                                    className='btn-red text-right'
                                    onClick={() => deleteHandler(collection._id)}>
                                    <TrashIcon /> Delete Collection
                                </Button>
                            </div>

                            {collection.stories.map((story) => (
                                <Row className="story-list">
                                    <Col md={3}>
                                        <Image src={story.image} alt="Thumbnail" className="thumbnail" fluid />
                                    </Col>
                                    <Col md={9}>
                                        <div className="story-name">
                                            <Badge className="category">{story.category}</Badge>
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip>
                                                        Remove Story
                                                    </Tooltip>
                                                }
                                            >
                                                <button
                                                    className='btn-remove'
                                                    onClick={() => removeHandler(collection._id, story._id)}>
                                                    <RemoveIcon />
                                                </button>
                                            </OverlayTrigger>
                                        </div>

                                        <h6>{story.title}</h6>

                                        {story.description.length > 50
                                            ? <p>{story.description.substring(0, 50) + "..."}</p>
                                            : <p>story.description</p>
                                        }

                                        <ViewIcon /> {story.views} {" "}
                                        <ReviewIcon /> {story.numReviews}
                                    </Col>
                                </Row>
                            ))}
                        </Col>
                    </Row>
                </>
            )
    }

    return (
        <MainLayout>
            {displayCollectionDetail()}
        </MainLayout>
    );
};

export default CollectionScreen;
