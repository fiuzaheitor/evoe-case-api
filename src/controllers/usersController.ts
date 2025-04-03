import { createUser, getUsers, updateUser, loginUser } from "../util/queries";

export const getAllUsers = async (req: any, res: any) => {
  try {
    const { fields } = req.query;

    const users = await getUsers({ fields: fields.replace(",", " ")  || "*" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { fields } = req.query;
    const user = await getUsers({ id, fields: fields.replace(",", " ") || "*" });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUserController = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUserController = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserController = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, email, password, } = req.body;
    const user = await updateUser({ user_id: id, name, email, password });

    if (user) {
      res.status(200).send("User updated successfully!");
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
