import React, { useEffect, useState } from 'react';
import { Link, Route, RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listStories } from 'actions';
import { Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import { Loader, Message } from 'components/shared';
import { Story } from 'components/stories';
import { Search } from 'components/core';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import MainLayout from 'layouts/MainLayout';

interface MatchParams {
    keyword: string;
    category: string;
    pageNumber: string;
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> { }

const HomeScreen = ({
    match: {
        params: { keyword, category, pageNumber: pgNumber }
    }
}: HomeScreenProps) => {
    const pageNumber = pgNumber || '1';

    const dispatch = useDispatch<AppDispatch>();

    const storyList = useSelector((state: ReduxState) => state.storyList)
    const { loading, error, stories, page, pages } = storyList;

    useEffect(() => {
        dispatch(listStories(keyword, category, pageNumber));
    }, [dispatch, keyword, category, pageNumber]);

    const displayStories = () => {
        if (loading) return <Loader />
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    {keyword ? (
                        <h2>Result for {keyword}</h2>
                    ) : category ? (
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                            <Breadcrumb.Item active>{category}</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : (
                        <div className="home">
                            <Search />
                        </div>
                    )}
                    <h4 className="my-3">All Stories</h4>
                    <Row className="mt-2">
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
            {displayStories()}
        </MainLayout>
    )
}

export default HomeScreen;
