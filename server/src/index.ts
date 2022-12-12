import express, { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import likeRoutes from './routes/like.routes';
import postRoutes from './routes/post.routes';
import followRoutes from './routes/follow.routes';
import commentRoutes from './routes/comment.routes';
import fileUploadRoutes from './routes/fileUpload.routes';

import errorHandler from './middlewares/error.handler';
import { AppError } from './utils/appError';

config();
const app = express();
const server = createServer(app);

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/like', likeRoutes);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/upload', fileUploadRoutes);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

let onlineUsers = [];
let count = 0;

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });

  console.log('Online users...', onlineUsers, count++);
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  console.log('Someone connected : ', socket.id);
  socket.on('initialize', (user) => {
    addNewUser(user.username, socket.id);
  });
  socket.on('liked', ({ likedBy, post, notifyTo }) => {
    const reciever = getUser(notifyTo);
    io.to(reciever.socketId).emit(
      'likeNotification',

      {
        notification: `${likedBy} liked your post`,
        post,
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('Someone left the socket');
    removeUser(socket.id);
  });
});

export default server;
