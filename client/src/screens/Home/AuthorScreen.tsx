import React, { useEffect, useState } from 'react';
import { getUserDetail } from 'actions/userActions';
import { listAuthorStories } from 'actions/storyActions';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, Message } from 'components/shared';
import { Breadcrumb, Col, Row, Image } from 'react-bootstrap';
import { Story } from 'components/stories';
import MainLayout from 'layouts/MainLayout';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';

interface MatchParams {
    id: string;
}

interface UserScreenProps extends RouteComponentProps<MatchParams> { }

const AuthorScreen = ({
    match: {
        params: { id }
    },
    history
}: UserScreenProps) => {
    const userId = id;
    const [name, setName] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const userDetail = useSelector((state: ReduxState) => state.userDetail);
    const { loading, error, user } = userDetail;

    const storyByAuthor = useSelector((state: ReduxState) => state.storyAuthor);
    const { loading: loadingStories, error: errorStories, stories } = storyByAuthor;

    useEffect(() => {
        if (!user || user._id !== userId) {
            dispatch(getUserDetail(userId))
            dispatch(listAuthorStories(userId));
        } else {
            setName(user.name);
            setAvatar(user.avatar);
            setBio(user.bio)
        }
    }, [dispatch, user, userId]);

    const authorDisplay = () => {
        if (loading || loadingStories) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else if (errorStories)
            return <Message variant='danger'>{errorStories}</Message>;
        else
            return (
                <>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>{name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="author-bg">
                        <div className="author">
                            <Image className="ml-3" src={avatar} width="170" alt="Avatar" roundedCircle />
                            <h5>{name}</h5>
                            <p>{bio}</p>
                        </div>
                    </div>
                    <h3>Stories</h3>
                    <Row>
                        {stories.map((story) => (
                            <Col key={story._id} sm={12} md={6} lg={3}>
                                <Story story={story} />
                            </Col>
                        ))}
                    </Row>
                </>
            )
    }

    return (
        <MainLayout>
            {authorDisplay()}
        </MainLayout>
    );
};

export default AuthorScreen;
