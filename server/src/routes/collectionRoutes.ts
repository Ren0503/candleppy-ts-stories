import { Router } from 'express';
import {
    addStoryToCollection,
    removeStoryToCollection,
    getCollectionById,
    deleteCollection,
    getCollectionsByUser,
    createCollection
} from '../controllers';
import { protect } from '../middleware';

const router = Router();

router.route('/')
    .post(protect, createCollection)
    
router.route('/user/:userId')
    .get(getCollectionsByUser)

router.route('/:id/add')
    .post(protect, addStoryToCollection)

router.route('/:id/remove/:storyId')
    .delete(protect, removeStoryToCollection)

router.route('/:id')
    .get(getCollectionById)
    .delete(protect, deleteCollection)

export default router;
