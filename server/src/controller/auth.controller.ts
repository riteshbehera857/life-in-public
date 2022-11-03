import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../types";
import { assignToken, compareHash } from "../helpers";
import User from "../models/auth.model";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, email, password, cover } = req.body;
    if (!req.body) {
      res.json({
        status: "failed",
        error: true,
        message: "Please fill all the required fields",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      res.json({
        status: "failed",
        error: true,
        message: "A user with this email already exists",
      });
    }

    const newUser: HydratedDocument<IUser> = await User.create({
      firstname,
      lastname,
      email,
      password,
      cover,
    });

    // Assign a new token to the newly created user
    const token = assignToken(newUser._id);
    res.status(201).json({
      status: "success",
      error: false,
      data: { user: newUser },
    });
  } catch (error: any) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.json({
        status: "failed",
        error: true,
        message: "Please fill all the required fields",
      });
    }

    const user = await User.findOne({ email }).select('password');

    if (!user || !(await compareHash(password, user.password))) {
      res.json({
        status: "failed",
        error: true,
        message: "Invalid email or password",
      });
    }

    const token = assignToken(user._id);

    res.cookie("JWT", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      error: false,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
