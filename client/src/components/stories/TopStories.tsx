import React, { useEffect } from 'react';
import { Figure, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader, Message } from 'components/shared';
import { listTopStories } from 'actions';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';

const TopStories = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { error, loading, stories } = useSelector(
        (state: ReduxState) => state.storyTopRated
    );
    useEffect(() => {
        if (stories.length === 0) dispatch(listTopStories());
    }, [dispatch, stories]);

    const topStoriesDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <div className="text-center text-light">
                        <i className="fas fa-star" style={{ color: '#f43547' }}></i> Trending
                    </div>
                    <div className="top-stories">
                        {stories.map((story) => (
                            <Figure key={story._id}>
                                <Image src={story.image} alt="Image" fluid />
                                <Link to={`/story/${story._id}`}>
                                    <h5 className="mt-3 title">{story.title}</h5>
                                </Link>
                            </Figure>
                        ))}
                    </div>
                </>
            );
    };

    return <>{topStoriesDisplay()}</>;
};

export default TopStories;
