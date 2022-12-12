import express from 'express';
import protectRoute from '../middlewares/auth.handler';
import {
  getMe,
  getUser,
  searchUsers,
  updateUser,
} from '../controller/user.controller';
import followRoutes from '../routes/follow.routes';
import postRoutes from '../routes/post.routes';

const router = express.Router();

router.use('/:following/follow', followRoutes);
router.use('/:requestedUser/post', postRoutes);

router.route('/me').get(protectRoute, getMe, getUser);

router.route('/search').get(searchUsers);
router.route('/:id').get(getUser).patch(updateUser);

export default router;
