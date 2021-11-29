import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { detailCollection } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from 'components/shared';
import MainLayout from 'layouts/MainLayout';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import {
    Button,
    Row,
    Col,
    Image,
    OverlayTrigger,
    Tooltip,
    Card,
    Badge
} from 'react-bootstrap';

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

    useEffect(() => {
        if (!userInfo || userInfo !== collection?.user) {
            history.push('/login');
        } else {
            dispatch(detailCollection(id));
            setName(userInfo.name);
            setAvatar(userInfo.avatar);
            setBio(userInfo.bio)
        }
    }, [id, dispatch, userInfo]);

    const displayCollectionDetail = () => {
        if (loading) return <Loader />;
        else if (error || !collection)
            return <Message variant='danger'>{error}</Message>;
        else
            return (
                <>
                    <Row>
                        <Col md={3}>
                            <Card className="text-center">
                                <Image src={avatar} alt="Profile" roundedCircle fluid />

                                <Card.Title as="h6">
                                    <strong>{name}</strong>
                                </Card.Title>

                                <i>{bio}</i>
                            </Card>
                        </Col>
                        <Col md={9}>
                            <h3>{collection.name}</h3>
                            <p className="text-right">Number: {collection.numStories}</p>
                            {collection.stories.map((story) => {
                                <Row>
                                    <Col md={3}>
                                        <Image src={story.image} alt="Thumbnail" fluid />
                                    </Col>
                                    <Col md={9}>
                                        <Badge>{story.category}</Badge>
                                        <h6>{story.title}</h6>
                                        {story.description.length > 30
                                            ? <p>{story.description.substring(0, 30) + "..."}</p>
                                            : <p>story.description</p>
                                        }
                                    </Col>
                                </Row>
                            })}
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
