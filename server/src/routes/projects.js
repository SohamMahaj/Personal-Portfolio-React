import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProjectsFilePath = () => {
  if (process.env.PROJECTS_FILE) {
    return path.resolve(process.env.PROJECTS_FILE);
  }
  const dataDir = process.env.DATA_DIR || path.join(__dirname, "../../data");
  return path.resolve(dataDir, "projects.json");
};

router.get("/", async (req, res, next) => {
  try {
    const filePath = getProjectsFilePath();
    const data = await fs.readFile(filePath, "utf-8");
    const projects = JSON.parse(data);
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const filePath = getProjectsFilePath();
    const data = await fs.readFile(filePath, "utf-8");
    const projects = JSON.parse(data);
    const project = projects.find((p) => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
});

export default router;
