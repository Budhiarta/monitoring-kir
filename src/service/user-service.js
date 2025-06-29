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

  loginWeb: async (req) => {
    const loginRequest = validate(loginUserValidation, req);

    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.username },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username atau password salah");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username atau password salah");
    }

    // ✅ Target tanggal: 2025-05-21
    const targetDate = "2025-05-19";
    const requiredDeviceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // ✅ Ambil semua monitoring untuk device 1–10
    const monitorings = await prismaClient.monitoring.findMany({
      where: {
        deviceId: { in: requiredDeviceIds },
      },
      select: {
        deviceId: true,
        Date: true,
      },
    });

    // ✅ Filter berdasarkan tanggal saja (YYYY-MM-DD)
    const filtered = monitorings.filter((m) => {
      const dateOnly = m.Date.toISOString().split("T")[0];
      return dateOnly === targetDate;
    });

    const monitoredDeviceIds = new Set(filtered.map((m) => m.deviceId));
    const missingDevices = requiredDeviceIds.filter(
      (id) => !monitoredDeviceIds.has(id)
    );

    if (missingDevices.length > 0) {
      throw new ResponseError(
        403,
        `Monitoring belum lengkap untuk tanggal ${targetDate}. Belum ada data untuk device ID: ${missingDevices.join(
          ", "
        )}.`
      );
    }

    // ✅ Buat JWT token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      message: "Login web berhasil",
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    };
  },

  getAllUsers: async () => {
    return await prismaClient.user.findMany();
  },
};

export default userService;
