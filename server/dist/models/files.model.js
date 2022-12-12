"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const fileSchema = new mongoose_1.Schema({
    file: { type: String, required: true },
});
const File = (0, mongoose_1.model)("File", fileSchema);
exports.default = File;
//# sourceMappingURL=files.model.js.map