import { Router } from 'express';
import protectRoute from '../middlewares/auth.handler';
import { getAllLikes, addLike } from './../controller/like.controller';

const router = Router({ mergeParams: true });

router.route('/').get(protectRoute, getAllLikes).post(protectRoute, addLike);

export default router;
