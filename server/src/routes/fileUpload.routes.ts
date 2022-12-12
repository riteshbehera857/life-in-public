import express from 'express';
import upload from '../multer';
import protectRoute from '../middlewares/auth.handler';
import { fileUpload, fileDelete } from '../controller/upload.controller';

const router = express.Router({ mergeParams: true });

router.route('/').post(protectRoute, upload.single('file'), fileUpload);
router.route('/:id').delete(protectRoute, fileDelete);

export default router;
