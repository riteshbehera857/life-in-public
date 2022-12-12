import express from 'express';
import protectRoute from '../middlewares/auth.handler';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
} from '../controller/post.controller';
import likeRouter from '../routes/like.routes';
import commentRouter from '../routes/comment.routes';
import fileUploadRouter from '../routes/fileUpload.routes';

const router = express.Router({ mergeParams: true });

router.use('/:postId/like', likeRouter);
router.use('/:postId/comment', commentRouter);
router.use('/upload', fileUploadRouter);

router.route('/').get(protectRoute, getPosts).post(protectRoute, createPost);
router.route('/:id').get(getPost).delete(deletePost);

export default router;
