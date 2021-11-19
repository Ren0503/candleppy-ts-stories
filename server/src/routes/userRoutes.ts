import { Router } from 'express';
import {
    login,
    register,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
} from '../controllers';
import { isAdmin, protect } from '../middleware';

const router = Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getUserById)

router.route('/login').post(login);

router.route('/')
    .post(register)
    .get(protect, isAdmin, getUsers);

export default router;
