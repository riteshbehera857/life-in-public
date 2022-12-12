import multer from 'multer';

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10000000 },
});

export default upload;
