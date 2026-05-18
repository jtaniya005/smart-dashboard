import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const register = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      name,
      email,
      password,
      role
    } = req.body;

    const existingUser =
      await User.findOne({
        email
      });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role
      });

    res.status(201).json({
  message: "User created",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  }
});

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }
};
import jwt from "jsonwebtoken";

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({
      email
    });

    if(!user){

      return res
      .status(400)
      .json({
        message:
        "Invalid credentials"
      });

    }

    const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res
      .status(400)
      .json({
        message:
        "Invalid credentials"
      });

    }

    const token =
    jwt.sign(
      {
        id:user._id,
        role:user.role
      },
      process.env.JWT_SECRET!,
      {
        expiresIn:"7d"
      }
    );

    res.json({

      message:"Login success",

      token,

      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }

    });

  } catch(error){

    res.status(500)
    .json({
      message:"Server Error"
    });

  }
};