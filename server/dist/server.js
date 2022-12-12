"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./index"));
const port = process.env.PORT;
const DB = process.env.MONGO_DATABASE_URL.replace("<PASSWORD>", process.env.MONGO_DATABASE_URL_PASSWORD_DEV);
mongoose_1.default
    .connect(DB)
    .then((conn) => console.log(`Database successfully running on ${conn.connection.host}`))
    .catch((err) => console.log(`${err}`));
index_1.default.listen(port, () => console.log(`⚡️[server]: Server is running at https://localhost:${port}`));
//# sourceMappingURL=server.js.map