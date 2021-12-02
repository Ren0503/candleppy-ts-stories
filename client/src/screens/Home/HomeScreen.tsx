import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listStories } from 'actions';
import { Breadcrumb, Col, Row, Button } from 'react-bootstrap';
import { Loader, Message } from 'components/shared';
import { Story } from 'components/stories';
import { Search } from 'components/core';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { MainLayout } from 'layouts';

interface MatchParams {
    keyword: string;
    category: string;
}
interface HomeScreenProps extends RouteComponentProps<MatchParams> { }

const HomeScreen = ({
    match: {
        params: { keyword, category }
    }
}: HomeScreenProps) => {
    const [showMore, setShowMore] = useState(8);

    const dispatch = useDispatch<AppDispatch>();

    const storyList = useSelector((state: ReduxState) => state.storyList)
    const { loading, error, stories, count } = storyList;

    useEffect(() => {
        dispatch(listStories(keyword, category));
    }, [dispatch, keyword, category]);

    const handleShowMore = () => {
        setShowMore(showMore + 4);
    };

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
                    <h4 className="my-3">All Stories ({count})</h4>
                    <Row className="mt-2">
                        {stories.slice(0, showMore).map((story) => (
                            <Col key={story._id} sm={12} md={6} lg={3}>
                                <Story story={story} />
                            </Col>
                        ))}
                        {stories.length > 8 &&
                            <div style={{ margin: 'auto' }}>
                                <Button className='btn btn-red' onClick={handleShowMore}>
                                    <i className="fas fa-angle-down"></i>
                                </Button>
                            </div>
                        }
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
