import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { USER, Role, Status } from "../models/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, LastName, email, password, role } = req.body;

    if (!firstname || !LastName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (role === Role.ADMIN) {
      return res.status(400).json({ message: "Invalid data: cannot register as ADMIN" });
    }

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userStatus = Status.PENDING;
    if (role === Role.USER) userStatus = Status.APPROVED;

    const newUser = await USER.create({
      firstName: firstname,
      lastName: LastName,
      email,
      password: hashedPassword,
      roles: [role],
      approved: userStatus
    });

    const userResponse = {
      _id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.LastName,
      email: newUser.email,
      roles: newUser.roles,
      approved: newUser.approved
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = (req: Request, res: Response) => {
  res.send("POST /api/v1/auth/login");
};

export const getMe = (req: Request, res: Response) => {
  res.send("GET /api/v1/auth/me");
};

export const adminRegister = (req: Request, res: Response) => {
  res.send("POST /api/v1/auth/admin/register");
};
