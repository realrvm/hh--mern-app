import UserModel from "../models/user-model";
import bcrypt from "bcrypt";

/* SIGNUP */
export const signUp = async (
  name: string,
  email: string,
  password: string,
  gender: string,
  birthday: string,
  img: string
) => {
  const candidate = await UserModel.findOne({ email }).exec();
  if (candidate) {
    throw new Error(`Пользователь с email ${email} уже существует`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    gender,
    birthday,
    img,
  });

  return user.save();
};

/* LOGIN */
export const logIn = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email }).exec();
  if (!user) {
    throw new Error(`Пользователь с email ${email} не найден`);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error(`Неверный пароль`);
  }

  return user;
};

/* Получение списка пользователей с полями Имя, aватар и возраст */
export const getPeople = async () => {
  const people = await UserModel.find().select("name img birthday").exec();
  return people;
};

/* Обновление личных данных */
export const updateUser = async (
  id: string,
  { name, img }: { name: string; img: string },
  newValue: { new: boolean }
) => {
  const user = await UserModel.findByIdAndUpdate(
    id,
    { name, img },
    newValue
  ).exec();
  return user;
};
