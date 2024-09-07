const { prisma } = require("../prisma/prisma-client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Поля не заполнены" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const isPassCorrect =
      user && (await bcrypt.compare(password, user.password));

    const secret = process.env.JWT_SECRET;

    if (user && isPassCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1h" }),
      });
    } else return res.status(400).json({ message: "Неверные данные" });
  } catch (error) {
    res.status(500).json({ message: "Что то пошло не так" });
  }
};

const registration = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Поля не заполнены" });
    }

    const isRegisteredUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (isRegisteredUser) {
      return res
        .status(400)
        .json({ message: `Поьзователь с email: ${email} уже существует` });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPass,
      },
    });

    const secret = process.env.JWT_SECRET;

    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name: name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: "1h" }),
      });
    } else
      return res
        .status(400)
        .json({ message: "Не удалось зарегестрировать пользователя" });
  } catch (error) {
    res.status(500).json({ message: "Что то пошло не так" });
  }
};

const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = {
  login,
  registration,
  current,
};
