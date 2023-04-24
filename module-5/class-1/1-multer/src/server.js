import path from "node:path";
import fs from "node:fs/promises";
import express from "express";
import morgan from "morgan";
import { upload, UPLOAD_DIR } from "./middlewares/upload.js";
import { initDirectory, sleep } from "./utils.js";

const app = express();

app.use(morgan("dev"));

app.use(express.static(path.join(process.cwd(), "src", "public")));

const IMAGE_DIR = path.join(process.cwd(), "src", "images");
app.use("/images", express.static(IMAGE_DIR));

app.post("/upload", upload.single("picture"), async (req, res) => {
  if(!req.file?.originalname) return res.sendStatus(400);
  
  const originalName = req.file.originalname;

  console.log(`Uploading ${originalName} ...`);

  const targetFileName = path.join(IMAGE_DIR, originalName);

  try {
    await sleep(4000); // processing file
    await fs.rename(req.file.path, targetFileName); // move to permament bucket storage
  } catch(error) {
    await fs.unlink(req.file.path); // cleanup of temp directory
    return res.sendStatus(500);
  }
  
  return res.status(302).redirect("/");
});

app.get("/api/images", async (req, res) => {
  const imageFilenames = await fs.readdir(IMAGE_DIR);
  const images = imageFilenames.map(filename => "/images/" + filename);
  
  return res.json({ images });
});

app.listen(3000, async () => {
  await initDirectory(UPLOAD_DIR);
  await initDirectory(IMAGE_DIR);
  console.log(`\n${new Date().toISOString()}\nListening on port 3000...`);
});