import { Router } from 'express';
import { 
    commentArticle,
    createArticle,
    deleteArticle,
    getArticleById,
    getArticles, 
    updateArticle,
    voteArticle
} from '../controllers';
import { admin, protect } from '../middleware';

const router = Router();

router.route('/')
    .get(getArticles)
    .post(protect, admin, createArticle)

router.route('/:id/comment')
    .post(protect, commentArticle)

router.route('/:id/vote')
    .get(protect, voteArticle)

router.route('/:id')
    .get(getArticleById)
    .put(protect, admin, updateArticle)
    .delete(protect, admin, deleteArticle)

export default router;