import { Router } from 'express';
import {
    getStories,
    createStory,
    getTopStories,
    createStoryReview,
    getStoryById,
    deleteStory,
    updateStory,
    getStoriesByAuthor
} from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/')
    .get(getStories)
    .post(protect, createStory)

router.route('/top')
    .get(getTopStories)

router.route('/user/:userId')
    .get(getStoriesByAuthor)

router.route('/:id/reviews')
    .post(protect, createStoryReview)

router
    .route('/:id')
    .get(getStoryById)
    .put(protect, updateStory)
    .delete(protect, deleteStory)

export default router;
