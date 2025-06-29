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
    // ✅ Validasi input
    const loginRequest = validate(loginUserValidation, req);

    // ✅ Cari user berdasarkan email
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

    // ✅ Verifikasi password
    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username atau password salah");
    }

    // ✅ Cek monitoring pada 21 Mei 2025 untuk deviceId 1–10
    const targetDate = new Date(Date.UTC(2025, 4, 21)); // bulan 4 = Mei (zero-based)
    const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(2025, 4, 21, 23, 59, 59, 999));
    const requiredDeviceIds = Array.from({ length: 10 }, (_, i) => i + 1); // [1..10]

    const monitorings = await prismaClient.monitoring.findMany({
      where: {
        Date: { gte: startOfDay, lte: endOfDay },
        deviceId: { in: requiredDeviceIds },
      },
      select: { deviceId: true },
    });

    const monitoredDeviceIds = new Set(monitorings.map((m) => m.deviceId));
    const missingDevices = requiredDeviceIds.filter(
      (id) => !monitoredDeviceIds.has(id)
    );

    if (missingDevices.length > 0) {
      throw new ResponseError(
        403,
        `Monitoring belum lengkap. Belum ada data untuk device ID: ${missingDevices.join(
          ", "
        )}.`
      );
    }

    // ✅ Buat token JWT
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // ✅ Return hasil
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
