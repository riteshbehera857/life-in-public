import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";
import { IUser } from "../../types";
import { assignToken, compareHash, verifyToken } from "../helpers";
import User from "../models/auth.model";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname, email, password, cover } = req.body;

    // Check if a user already exists with this email address, if True then throw error
    const user = await User.findOne({ email });
    if (user) throw new Error("A user with this email already exists");

    // If user doesn't exists then create a new user
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
    // Check if body contains the email and password
    if (!email || !password)
      throw new Error("Please provide a valid email address or password");

    // Find the user with the email
    const user = await User.findOne({ email });

    // Check if the user exists and compare the input password with the user password
    if (!user || !(await compareHash(password, user.password)))
      throw new Error("Invalid email or password");

    // Assign a new token to the user
    const token = assignToken(user._id);
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
