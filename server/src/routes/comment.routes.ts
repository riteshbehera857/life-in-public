import express from 'express';
import protectRoute from '../middlewares/auth.handler';
import { createComment, getComment } from '../controller/comment.controller';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(protectRoute, getComment)
  .post(protectRoute, createComment);

export default router;
