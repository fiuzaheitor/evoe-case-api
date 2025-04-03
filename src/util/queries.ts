import db from "../db/connection";
import { User } from "../entities/user";
import {
  validateCreateUser,
  validateLogin,
  validateResetPassword,
} from "./validators/validateUser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUsers = async ({
  fields,
  id,
  email,
}: {
  fields: string;
  id?: number;
  email?: string;
}) => {
  let query = `SELECT ${fields} FROM user`;
  const params: (number | string)[] = [];

  if (id) {
    query += " WHERE user_id = ?";
    params.push(id);
  } else if (email) {
    query += " WHERE email = ?";
    params.push(email);
  }

  const [rows] = await db.query(query, params);

  if (rows.length === 0) {
    return [];
  }

  return rows.map(
    (row: any) =>
      new User({
        user_id: row.user_id,
        name: row.name,
        email: row.email,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }),
  );
};

export const createUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const userValidate = validateCreateUser({ name, email, password });
  if (!userValidate.valid) {
    throw new Error(userValidate?.errors[0]);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const [rows] = await db.query(
    "INSERT INTO user (name, email, password_hash, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, new Date(), new Date()],
  );

  if (rows.affectedRows === 0) {
    throw new Error("Erro ao criar usuário");
  }

  const user = new User({
    user_id: rows.insertId,
    name,
    email,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return user;
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const userValidate = validateLogin({ email, password });

  if (!userValidate.valid) {
    throw new Error(userValidate?.errors[0]);
  }

  const [rows] = await db.query(
    "SELECT user_id, email, password_hash FROM user WHERE email = ?",
    [email],
  );
  if (rows.length === 0) {
    throw new Error("Email incorreto.");
  }

  if (!(await bcrypt.compare(password, rows[0].password_hash as string))) {
    throw new Error("Senha incorreta.");
  }

  return jwt.sign({ id: rows[0].user_id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const updateUser = async ({
  user_id,
  name,
  email,
  password,
}: {
  user_id: number;
  name?: string;
  email?: string;
  password?: any;
}) => {
  if (password) {
    const userValidate = validateResetPassword(password);

    if (!userValidate.valid) {
      throw new Error(userValidate?.errors[0]);
    }
  }

  const fields = [];
  const values = [];

  if (name != "" && name != undefined && name != null) {
    fields.push("name = ?");
    values.push(name);
  }

  if (email != "" && email != undefined && email != null) {
    fields.push("email = ?");
    values.push(email);
  }

  if (password != "" && password != undefined && password != null) {
    fields.push("password_hash = ?");
    values.push(await bcrypt.hash(password, 12));
  }

  fields.push("updated_at = ?");
  values.push(new Date());

  const [rows] = await db.query(
    `UPDATE user SET ${fields.join(", ")} WHERE user_id = ?`,
    [...values, user_id],
  );

  if (rows.affectedRows === 0) {
    throw new Error("Usuário não encontrado");
  }

  return true;
};

export const deleteUser = async ({ id }: { id: number }) => {
  const [rows] = await db.query("DELETE FROM user WHERE user_id = ?", [id]);

  if (rows.affectedRows === 0) {
    throw new Error("Usuário não encontrado");
  }

  return true;
};
