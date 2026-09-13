import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getContactsFilePath = () => {
  if (process.env.CONTACTS_FILE) {
    return path.resolve(process.env.CONTACTS_FILE);
  }
  const dataDir = process.env.DATA_DIR || path.join(__dirname, "../../data");
  return path.resolve(dataDir, "contacts.json");
};

const readContacts = async () => {
  const filePath = getContactsFilePath();
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    throw error;
  }
};

const writeContacts = async (contacts) => {
  const filePath = getContactsFilePath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2), "utf-8");
};

router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Name is required." });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "Email is required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Invalid email format. Must contain '@' and a valid domain." });
    }

    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required." });
    }

    const contacts = await readContacts();
    const newSubmission = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    contacts.push(newSubmission);
    await writeContacts(contacts);

    res.status(201).json({
      message: "Message sent successfully!",
      data: newSubmission
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await readContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

export default router;
