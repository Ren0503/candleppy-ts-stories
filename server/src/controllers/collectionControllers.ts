import asyncHandler from 'express-async-handler';
import { Request, Response, StoryDocument } from '../types';
import { Collection } from '../models';

export const createCollection = asyncHandler(
    async (req: Request, res: Response) => {
        if (!req.user) {
            res.status(400);
            throw new Error('User not authorized.');
        }

        const { name } = req.body as { name: string };

        const collection = new Collection({
            user: req.user._id,
            name,
        });

        const createdCollection = await collection.save();
        res.status(201).json(createdCollection);
    }
);

export const getCollectionById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const collection = await Collection.findById(id).populate('stories');

        if (collection) {
            res.json(collection);
        } else {
            res.status(404);
            throw new Error('Collection not found');
        }
    }
);

export const addStoryToCollection = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const collection = await Collection.findById(id);

        if (collection) {
            if (collection.user.toString() !== req.user?._id.toString()) {
                res.status(404);
                throw new Error('Not authorization to access.');
            } else {
                const { story } = req.body as { story: StoryDocument }

                const alreadyStory = collection.stories.find(
                    (s) => s._id.toString() === story._id.toString()
                );

                if (alreadyStory) {
                    res.status(400);
                    throw new Error('Story already added');
                }

                collection.stories.push(story);
                collection.numStories = collection.stories.length;

                await collection.save();
                res.status(201).json({ message: 'Story Added' });
            }
        } else {
            res.status(404);
            throw new Error('Collection not found.');
        }
    }
);

export const removeStoryToCollection = asyncHandler(
    async (req: Request, res: Response) => {
        const { id, storyId } = req.params as { id: string, storyId: string };
        const collection = await Collection.findById(id);

        if (collection) {
            if (collection.user.toString() !== req.user?._id.toString()) {
                res.status(404);
                throw new Error('Not authorization to access.');
            } else {
                const alreadyStory = collection.stories.find(
                    (s) => s._id.toString() === storyId.toString()
                );

                if (!alreadyStory) {
                    res.status(404);
                    throw new Error('Story not found in collection');
                }

                await Collection.findOneAndUpdate({ _id: id }, { $pull: { stories: alreadyStory._id } });
                res.json({ message: 'Store removed' });
            }
        }
    }
);

export const deleteCollection = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const collection = await Collection.findById(id);

        if (!collection) {
            res.status(404);
            throw new Error('Collection not found.');
        }

        if (collection.user.toString() !== req.user?._id.toString()) {
            res.status(404);
            throw new Error('Not authorization to access.');
        } else {
            await collection.remove();
            res.json({ message: 'Collection Removed' });
        }
    }
);

export const getMyCollections = asyncHandler(
    async(req: Request, res: Response) => {
        if (!req.user) {
            res.status(400);
            throw new Error('User not authorized.');
        }

        const collections = await Collection.find({ user: req.user._id }).populate('stories')

        res.json(collections);
    }
);