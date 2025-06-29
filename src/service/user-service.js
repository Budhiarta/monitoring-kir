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
    // Validasi input dari client
    const loginRequest = validate(loginUserValidation, req);

    // Ambil user berdasarkan email (username)
    const user = await prismaClient.user.findUnique({
      where: { email: loginRequest.username },
      select: {
        id: true,
        username: true,
        password: true,
        email: true,
      },
    });

    // Validasi user & password
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

    // Tanggal target: 21 Mei 2025 (ingat: bulan 4 = Mei karena 0-based)
    const startOfDay = new Date(Date.UTC(2025, 4, 21, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(2025, 4, 21, 23, 59, 59, 999));
    const requiredDeviceIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Ambil semua monitoring untuk device 1–10 pada tanggal tersebut
    const monitorings = await prismaClient.monitoring.findMany({
      where: {
        Date: { gte: startOfDay, lte: endOfDay },
        deviceId: { in: requiredDeviceIds },
      },
      select: { deviceId: true },
    });

    // Ambil ID unik dari hasil monitoring
    const monitoredDeviceIds = [...new Set(monitorings.map((m) => m.deviceId))];

    // Pastikan semua device yang diwajibkan sudah termonitor
    const allDevicesMonitored = requiredDeviceIds.every((id) =>
      monitoredDeviceIds.includes(id)
    );

    if (!allDevicesMonitored) {
      throw new ResponseError(
        403,
        "Monitoring belum lengkap untuk semua device pada 21 Mei 2025."
      );
    }

    // Buat token dan kembalikan response
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
