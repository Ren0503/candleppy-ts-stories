import { ViewIcon } from 'components/icons';
import React, { FunctionComponent } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "styles/stories.css";
import { Story as StoryType } from 'types/stories';
import Rating from './Rating';

interface StoryProps {
	story: StoryType;
}

const Story: FunctionComponent<StoryProps> = ({ 
    story 
}: StoryProps) => {
    return (
        <div>
            <Card className="story">
                <Card.Img src={story.image} />

                <Card.Body>
                    <Link to={`/story/${story._id}`}>
                        <Card.Title as='h6' className="title">
                            <strong>{story.title}</strong>
                        </Card.Title>
                    </Link>

                    <Rating
						value={story.rating}
						text={`${story.numReviews} reviews`}
					/>

                    <Row>
                        <Col style={{ color: '#aaa' }}>
                            <ViewIcon /> {story.views} {" "}
                            <i className="fas fa-comment"></i> {story.numReviews}
                        </Col>
                        <Col className="text-right">
                            <Link to={`/user/${story.author._id}`}>
                                <Image src={story.author.avatar} roundedCircle width="30" />
                            </Link>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Story;
