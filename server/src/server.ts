import mongoose from 'mongoose';
import server from './index';
// import chalk from 'chalk';

const port = process.env.PORT;

const DB = process.env.MONGO_DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.MONGO_DATABASE_URL_PASSWORD_DEV
);

mongoose
  .connect(DB)
  .then((conn) =>
    console.log(`Database successfully running on ${conn.connection.host}`)
  )
  .catch((err) => console.log(`${err}`));

server.listen(port, () =>
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
);
