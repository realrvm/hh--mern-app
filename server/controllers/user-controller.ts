import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { signUp, logIn, getPeople, updateUser } from "../service/user-service";

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

export const upload = (req: Request, res: Response) => {
  try {
    if (!req.files) return;

    const file = req.files.file as UploadedFile;
    if (!file) return res.json({ error: "Incorrect name input" });

    const newFileName = encodeURI(`${Date.now()}-${file?.name}`);

    file.mv(
      `${__dirname}/../../client/public/uploads/${newFileName}`,
      (err: Error) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          fileName: file.name,
          filePath: `/uploads/${newFileName}`,
        });
      }
    );
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const { uid, name, img } = req.body;
    const newValue = { new: true };
    const updatedUser = await updateUser(
      uid,
      { name, img },
      newValue
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: (err as Error).message });
  }
};
