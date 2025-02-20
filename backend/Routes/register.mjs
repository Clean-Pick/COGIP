import express from "express";
import { connection } from "../connectionDB.mjs";
import validator from "validator";
import { convertToMySqlDate } from "../utils/convertDateToMySQLDate.mjs";

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données");
    return;
  }
  console.log("Connecté à la base de données");
});

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ data: `Here is your data` });
});

router.post("/", (req, res) => {
  const { first_name, role_id, last_name, email, password } = req.body;
  const nowTime = convertToMySqlDate();

  if (!first_name || !role_id || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check if email already exist
  const checkEmailQuery = `SELECT email FROM users WHERE email = ? `;
  connection.query(checkEmailQuery, email, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error occurred while checking the user.",
      });
    }

    if (result.length > 0) {
      return res.status(409).json({
        error: "Conflict, this email is already used.",
      });
    }

    if (first_name.length < 2 || first_name.length > 255) {
      return res.status(400).json({ message: "First name must be between 2 and 255 characters" });
    }

    if (last_name.length < 2 || last_name.length > 255) {
      return res.status(400).json({ message: "Last name must be between 2 and 255 characters" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (!Number.isInteger(role_id)) {
      return res.status(400).json({ message: "role_id must be an integer" });
    }

    if (password.length < 2 || password.length > 255) {
      return res.status(400).json({ message: "Password must be between 2 and 255 characters" });
    }

    try {
      connection.query("INSERT INTO users (first_name, role_id, last_name, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)", [
        first_name,
        role_id,
        last_name,
        email,
        password,
        nowTime,
        nowTime,
      ]);

      res.status(200).json({ message: "User created." });
    } catch (error) {
      return res.status(500).json({ message: "Internal error server" });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, role_id, last_name, email, password } = req.body;
  const nowTime = convertToMySqlDate();

  if (!first_name || !role_id || !last_name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (first_name.length < 2 || first_name.length > 255) {
    return res.status(400).json({ message: "First name must be between 2 and 255 characters" });
  }

  if (last_name.length < 2 || last_name.length > 255) {
    return res.status(400).json({ message: "Last name must be between 2 and 255 characters" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!Number.isInteger(role_id)) {
    return res.status(400).json({ message: "role_id must be an integer" });
  }

  if (password.length < 2 || password.length > 255) {
    return res.status(400).json({ message: "Password must be between 2 and 255 characters" });
  }

  connection.query(
    "UPDATE users SET first_name = ?, role_id = ?, last_name = ?, email = ?, password = ?, updated_at = ? WHERE id = ?",
    [first_name, role_id, last_name, email, password, nowTime, id],
    (err, results) => {
      if (err) {
        console.error("Erreur lors de la mise à jour :", err);
        return res.status(500).json({ message: "Internal error server" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error :", err);
      return res.status(500).json({ message: "Internal error server" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  });
});

export default router;
