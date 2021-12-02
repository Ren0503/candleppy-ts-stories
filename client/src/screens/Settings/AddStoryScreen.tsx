import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message, Loader } from 'components/shared';
import { MainLayout } from 'layouts';
import { RouteComponentProps } from 'react-router-dom';
import { AppDispatch } from 'store';
import { ReduxState } from 'types/ReduxState';
import { addStoryToCollection, listCollectionsUser } from 'actions';
import { Image, Button } from 'react-bootstrap';
import imagGif from 'assets/collection.gif';
import "styles/collection.css";
import { CollectionAddStoryActionTypes } from 'types/collections';

interface MatchParams {
    id: string;
}

interface AddStoryScreenProps extends RouteComponentProps<MatchParams> { }

const AddStoryScreen = ({
    match: {
        params: { id }
    },
    history
}: AddStoryScreenProps) => {
    const storyId = id;
    const [chooseCollection, setChooseCollection] = useState<string>('');

    const dispatch = useDispatch<AppDispatch>();

    const userLogin = useSelector((state: ReduxState) => state.userLogin);
    const { userInfo } = userLogin;

    const collectionUser = useSelector((state: ReduxState) => state.collectionUser);
    const { collections, loading, error } = collectionUser;

    const collectionAddStory = useSelector((state: ReduxState) => state.collectionAddStory);
    const {
        loading: loadingAdd,
        error: errorAdd,
        success: successAdd,
    } = collectionAddStory;

    useEffect(() => {
        dispatch({
            type: CollectionAddStoryActionTypes.COLLECTION_ADD_STORY_RESET
        });
        
        if (!userInfo) {
            history.push('/login');
        } else if (successAdd) {
            history.push('/dashboard');
        } else {
            dispatch(listCollectionsUser());
        }
    }, [
        dispatch,
        history,
        userInfo,
        successAdd,
    ]);

    const addStoryHandler = (collectionId: string, storyId: string) => {
        const story = {
            _id: storyId
        }
        dispatch(addStoryToCollection(collectionId, story));
    };

    console.log(chooseCollection);

    const addStoryDisplay = () => {
        if (loading) return <Loader />;
        else if (error) return <Message variant='danger'>{error}</Message>;
        else
            return (
                <div className="text-center">
                    <h2>Your Collections</h2>

                    <div className="addCollection">
                        <Image src={imagGif} alt="Add" fluid />

                        <select
                            name="collection"
                            id="collectionId"
                            value={chooseCollection}
                            onChange={(e) => setChooseCollection(e.target.value)}
                        >
                            <option>Open this your collections</option>
                            {collections.map((collection) => (
                                <option key={collection._id} value={collection._id}>{collection.name}</option>
                            ))}
                        </select>

                        <Button
                            type="button"
                            className="btn-red"
                            onClick={() => addStoryHandler(chooseCollection, storyId)}
                            disabled={!chooseCollection}
                        >
                            Choose Collection
                        </Button>

                        {loadingAdd && <Loader />}
                        {errorAdd && <Message variant='danger'>{errorAdd}</Message>}

                    </div>
                </div>
            )
    }

    return (
        <MainLayout>
            {addStoryDisplay()}
        </MainLayout>
    )
}

export default AddStoryScreen;
