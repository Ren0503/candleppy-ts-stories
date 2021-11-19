import asyncHandler from 'express-async-handler';
import { Request, Response } from '../types';
import { Article, User } from '../models';

export const getArticles = asyncHandler(
    async (req: Request, res: Response) => {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1;
        const sort = req.query.sort || '-createdAt';

        const count = await Article.countDocuments();
        const articles = await Article.find({})
            .populate('user')
            .populate('comments.user', '-password')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(sort)

        res.json({ articles, page, pages: Math.ceil(count / pageSize) });
    }
);

export const getArticleById = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };

        const article = await Article.findById(id);

        if (article) {
            res.json(article);
        } else {
            res.status(404);
            throw new Error('Article not found');
        }
    }
);

export const createArticle = asyncHandler(
    async (req: Request, res: Response) => {
        const article = new Article({
            user: req.user?._id,
            name: 'Sample name',
            image: '/images/sample.jpg',
            category: 'Sample category',
            description: 'sample description',
            body: 'Sample body',
        });
        const createdArticle = await article.save();

        const user = await User.findById(req.user?._id);

        if (user) {
            user.points += 100;
            await user.save();
        }

        res.status(201).json(createdArticle);
    }
);

export const updateArticle = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };

        const {
            name,
            description,
            category,
            image,
            body
        } = req.body as {
            name: string;
            description: string;
            image: string;
            category: string;
            body: string;
        };

        const article = await Article.findById(id);

        if (article) {
            article.name = name;
            article.description = description;
            article.category = category;
            article.image = image;
            article.body = body;

            const updatedArticle = await article.save();
            res.status(201).json(updatedArticle);
        } else {
            res.status(404);
            throw new Error('Article not found.');
        }
    }
);

export const deleteArticle = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const article = await Article.findById(id);
        if (article) {
            await article.remove();
            res.json({ message: 'Article Removed' });
        } else {
            res.status(404);
            throw new Error('Article not found.');
        }
    }
);

export const voteArticle = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        const { vote } = req.body as { vote: number };

        if (!req.user) {
            res.status(400);
            throw new Error('User not found');
        }

        const article = await Article.findById(id);
        if (article) {
            const alreadyVote = article.votes.find(
                (v) => v.user.toString() === req.user!._id.toString()
            );

            if (alreadyVote) {
                if (vote == alreadyVote.vote) {
                    alreadyVote.vote = 0;
                } else {
                    alreadyVote.vote = vote;
                }

                res.status(201).json({ message: 'Change voted' });
            }

            const createdVote = {
                user: req.user._id,
                vote: vote
            };

            article.votes.push(createdVote);

            article.score = article.votes.reduce((acc, item) => item.vote + acc, 0);

            await article.save();
            res.status(201).json({ message: 'Vote Added' });
        } else {
            res.status(404);
			throw new Error('Article not found.');
        }
    }
);

export const commentArticle = asyncHandler(
    async(req: Request, res: Response) => {
		const { id } = req.params as { id: string };
        const { body } = req.body as { body: string };

        if (!req.user) {
            res.status(400);
            throw new Error('User not found');
        }

        const article = await Article.findById(id);
        if (article) {
            const comment = {
                user: req.user._id,
                body
            };

            article.comments.push(comment);

            await article.save();
            res.status(201).json({ message: "Comment added" });
        } else {
            res.status(404);
			throw new Error('Article not found.');
        }
    }
);