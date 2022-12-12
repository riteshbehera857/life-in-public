import { Router } from 'express';
import protectRoute from '../middlewares/auth.handler';
import { addFollow, getFollows } from '../controller/follow.controller';

const router = Router({ mergeParams: true });

router.route('/').get(protectRoute, getFollows).post(protectRoute, addFollow);

export default router;
