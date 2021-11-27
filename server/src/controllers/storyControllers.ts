import asyncHandler from 'express-async-handler';
import { Request, Response } from '../types';
import { Story } from '../models';

export const getStories = asyncHandler(
    async (req: Request, res: Response) => {
        const keyword = req.query.keyword
		? {
				title: {
					$regex: req.query.keyword,
					$options: 'i'
				} as any
		  }
		: {};
        const category = req.query.category
		? {
				category: {
					$regex: req.query.category,
					$options: 'i'
				} as any
		  }
		: {};

        const count = await Story.countDocuments({ ...keyword, ...category });
        const stories = await Story.find({ ...keyword, ...category })
            .populate('author', 'name avatar')
            .sort({ createdAt: -1 })

        res.json({ stories, count });
    }
);

export const getStoryById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };

        const story = await Story.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } },
            { new: true }
        )
        .populate('author', 'name avatar')
        .populate('reviews.user', 'name avatar')

        if (story) {
            res.json(story);
        } else {
            res.status(404);
            throw new Error('Story not found');
        }
    }
);

export const createStory = asyncHandler(
    async (req: Request, res: Response) => {
        const story = new Story({
            author: req.user?._id,
            title: 'Sample title',
            image: '/images/sample.jpg',
            category: 'Sample category',
            description: 'sample description',
            body: 'Sample body',
        });

        const createdStory = await story.save();
        res.status(201).json(createdStory);
    }
);

export const updateStory = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const story = await Story.findById(id);

        if (!story) {
            res.status(404);
            throw new Error('Story not found.');
        }

        if (story.author.toString() !== req.user?._id.toString()) {
            res.status(404);
            throw new Error('Not authorization to access.');
        } else {
            const {
                title,
                description,
                category,
                image,
                body
            } = req.body as {
                title: string;
                description: string;
                image: string;
                category: string;
                body: string;
            };

            story.title = title;
            story.description = description;
            story.category = category;
            story.image = image;
            story.body = body;

            const updatedStory = await story.save();
            res.status(201).json(updatedStory);
        }
    }
);

export const deleteStory = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const story = await Story.findById(id);

        if (!story) {
            res.status(404);
            throw new Error('Story not found.');
        }

        if (story.author.toString() !== req.user?._id.toString()) {
            res.status(404);
            throw new Error('Not authorization to access.');
        } else {
            await story.remove();
            res.json({ message: 'Story Removed' });
        }
    }
);

export const getStoriesByAuthor = asyncHandler(
    async(req: Request, res: Response) => {
        const { userId } = req.params as { userId: string };
        const stories = await Story.find({ author: userId })

        res.json(stories);
    }
);

export const createStoryReview = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const story = await Story.findById(id);

        if (!req.user) {
			res.status(400);
			throw new Error('User not found');
		}

        const { rating, comment } = req.body as {
			rating: number;
			comment: string;
		};

        if (story) {
            const alreadyReviewed = story.reviews.find(
                (r) => r.user.toString() === req.user!._id.toString()
            );

            if (alreadyReviewed) {
				res.status(400);
				throw new Error('Story already reviewed');
			}

            const review = {
				rating,
				comment,
				user: req.user._id
			};
            
            story.reviews.push(review);
            story.numReviews = story.reviews.length;
            story.rating =
                story.reviews.reduce((acc, item) => item.rating + acc, 0) /
                story.reviews.length;

            await story.save();
            res.status(201).json({ message: 'Review Added' });
        } else {
            res.status(404);
			throw new Error('Story not found.');
        }
    }
);

export const getTopStories = asyncHandler(
    async (req: Request, res: Response) => {
        const stories = await Story.find({}).sort({ views: -1 }).limit(5);

        res.json(stories);
    }
);