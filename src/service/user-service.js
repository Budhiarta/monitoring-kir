import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  registerUserValidation,
  loginUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const userService = {
  register: async (request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
      where: {
        email: user.email,
      },
    });

    if (countUser === 1) {
      throw new ResponseError(400, "name already exist");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
      data: user,
      select: {
        username: true,
        email: true,
      },
    });
  },

  login: async (req) => {
    const loginRequest = validate(loginUserValidation, req);

    const user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.username,
      },
      select: {
        username: true,
        password: true,
      },
    });

    if (!user) {
      throw new ResponseError(401, "username or password invalid");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "username or password invalid");
    }

    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      message: "login successfull",
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  },

  getAllUsers: async () => {
    return await prismaClient.user.findMany({
      data: user,
    });
  },
};

export default userService;
