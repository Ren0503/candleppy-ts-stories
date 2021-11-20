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
import { admin, protect } from '../middleware';

const router = Router();

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route('/:id')
    .put(protect, admin, updateUser)
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)

router.route('/login').post(login);

router.route('/')
    .post(register)
    .get(protect, admin, getUsers);

export default router;
