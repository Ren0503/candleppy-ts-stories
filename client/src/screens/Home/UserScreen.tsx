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

const UserScreen = ({
    match: {
        params: { id }
    },
    history
}: UserScreenProps) => {
    const userId = id;

    const dispatch = useDispatch<AppDispatch>();

    const storyByAuthor = useSelector((state: ReduxState) => state.storyAuthor);
    const { loading, error, stories } = storyByAuthor;

    useEffect(() => {
        dispatch(listAuthorStories(userId));
    }, [dispatch, userId]);

    const authorDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
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

export default UserScreen;
