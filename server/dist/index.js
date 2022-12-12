"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const http_1 = require("http");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const like_routes_1 = __importDefault(require("./routes/like.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const follow_routes_1 = __importDefault(require("./routes/follow.routes"));
const comment_routes_1 = __importDefault(require("./routes/comment.routes"));
class AppError extends Error {
    constructor(status, message, statusCode) {
        super(message);
        this.status = "failed";
        this.statusCode = 404;
        this.status = status;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
    getErrorMessage() {
        return {
            status: this.status,
            statusCode: this.statusCode,
            message: this.message
        };
    }
}
exports.AppError = AppError;
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "1000mb" }));
app.use(express_1.default.urlencoded({ limit: "1000mb", extended: true }));
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/posts", post_routes_1.default);
app.use("/comment", comment_routes_1.default);
app.use("/like", like_routes_1.default);
app.use("/follow", follow_routes_1.default);
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "failed",
        message: `Can't find ${req.originalUrl} path on the server`
    });
    const err = new AppError("failed", `Can't find ${req.originalUrl} path on the server`, 401);
    next(err);
});
app.use((err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});
// app.use(errorHandler);
exports.default = server;
//# sourceMappingURL=index.js.map