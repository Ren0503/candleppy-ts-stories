import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createStoryReview, deleteStory, detailStory } from 'actions';
import { Loader, Message } from 'components/shared';
import { ListGroup, Row, Col, Form, Image, Button, Breadcrumb, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Rating, TopStories, TextToSpeech } from 'components/stories';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { MainLayout } from 'layouts';
import { StoryCreateReviewActionTypes } from 'types/stories';
import { CreateIcon, EditIcon, TrashIcon } from 'components/icons';

interface MatchParams {
    id: string;
}

interface DetailScreenProps extends RouteComponentProps<MatchParams> { };

const DetailScreen: FunctionComponent<DetailScreenProps> = ({
    match: {
        params: { id }
    },
    history
}: DetailScreenProps) => {
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const storyDetail = useSelector((state: ReduxState) => state.storyDetail);
    const { loading, error, story } = storyDetail;

    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    const storyReviewCreate = useSelector((state: ReduxState) => state.storyCreateReview);
    const {
        success: successStoryReview,
        loading: loadingStoryReview,
        error: errorStoryReview,
    } = storyReviewCreate;

    const storyDelete = useSelector((state: ReduxState) => state.storyDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = storyDelete;

    const isAuthor = userInfo?._id === story?.author._id ? true : false;

    useEffect(() => {
        if (successStoryReview) {
            dispatch({
                type: StoryCreateReviewActionTypes.STORY_CREATE_REVIEW_RESET
            })
        }
        dispatch(detailStory(id))
    }, [id, dispatch, successStoryReview, successDelete]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createStoryReview(id, { rating, comment }));
    };

    const deleteHandler = (id: string) => {
        if (window.confirm('Are you sure delete story?')) {
            dispatch(deleteStory(id));
        }
    };

    const addToCollection = () => {
        history.push(`/add/${id}`);
    }

    const storyDetailDisplay = () => {
        if (loading || loadingDelete) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else if (!story)
            return <Message variant='danger'>Product Not Found</Message>;
        else if (errorDelete)
            return <Message variant='danger'>{errorDelete}</Message>;
        else
            return (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/category">{story?.category}</Breadcrumb.Item>
                        <Breadcrumb.Item active>{story.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Row>
                        <Col md={9}>
                            <TextToSpeech text={story.body} />
                            <div className="paper text-justify">
                                <h3 className="text-center p-3">{story.title}</h3>
                                <div className="author-story">
                                    <Row>
                                        <Col md={1}>
                                            <Image className="ml-1" src={story.author.avatar} width="50" alt="Avatar" roundedCircle />
                                        </Col>
                                        <Col md={11}>
                                            <h6>{story.author.name}</h6>
                                            <i>"{story.description}"</i>
                                        </Col>
                                    </Row>
                                </div>
                                <Image src={story.image} fluid className="p-3" />
                                <div className="text-justify paper-body" dangerouslySetInnerHTML={{ __html: story.body }} />
                                <Row>
                                    <Col md={6}>
                                        <Badge className="category">{story.category}</Badge>
                                        {isAuthor && <>
                                            <Link to={`/story/${story._id}/edit`}>
                                                <Button variant='primary' className='btn-sm'>
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(story._id)}>
                                                <TrashIcon />
                                            </Button>
                                        </>
                                        }
                                    </Col>
                                    <Col className="text-right" md={6}>
                                        <i>{story.createdAt.substring(0, 10)}</i>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                {story.reviews.length === 0 &&
                                    <Message>
                                        No comments
                                    </Message>
                                }
                                <ListGroup variant="flush" className="comment">
                                    {story.reviews.map((review) => (
                                        <ListGroup.Item key={review._id} style={{ background: "#0a0a0a" }}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={review.user.avatar} width="50" height="50" roundedCircle />
                                                </Col>
                                                <Col md={11}>
                                                    <strong>{review.user.name}</strong>
                                                    <Rating value={review.rating} />
                                                    <p>{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                            <div>
                                <ListGroup>
                                    <h2>Write a comment</h2>
                                    {successStoryReview && (
                                        <Message variant="success">
                                            Comment submitted successfully
                                        </Message>
                                    )}
                                    {loadingStoryReview && <Loader />}
                                    {errorStoryReview && (
                                        <Message variant='danger'>{errorStoryReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(Number(e.target.value))}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    rows={3}
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(e.target.value)
                                                    }></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingStoryReview}
                                                type='submit'
                                                className='btn-red'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please<Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup>
                            </div>
                        </Col>
                        <Col md={3}>
                            <TopStories />
                        </Col>
                    </Row>

                    <div className="create">
                        <OverlayTrigger
                            overlay={
                                <Tooltip>
                                    Add Story
                                </Tooltip>
                            }
                        >
                            <Button
                                onClick={addToCollection}
                                disabled={!userInfo}
                                className='btn btn-red text-center'
                                type='button'>
                                <CreateIcon />
                            </Button>
                        </OverlayTrigger>
                    </div>
                </>
            )
    }

    return (
        <MainLayout>
            {storyDetailDisplay()}
        </MainLayout>
    );
};

export default DetailScreen;
