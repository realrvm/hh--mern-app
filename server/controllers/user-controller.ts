import { Request, Response } from "express";
import { signUp, logIn, getPeople } from "../service/user-service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, gender, birthday, img } = req.body;
    const userData = await signUp(name, email, password, gender, birthday, img);
    res.status(200).json(userData);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userData = await logIn(email, password);
    res.status(200).json(userData);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

export const people = async (req: Request, res: Response) => {
  try {
    const users = await getPeople();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};
