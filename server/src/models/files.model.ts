import { NextFunction } from "express";
import { Schema, model, Types } from "mongoose";

const fileSchema = new Schema({
  file: { type: String, required: true },
  created_at: { type: Date },
});

const File = model("File", fileSchema);
export default File;
