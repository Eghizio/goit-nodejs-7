import { join } from "node:path";
import multer from "multer";
import { nanoid } from "nanoid";

export const UPLOAD_DIR = join(process.cwd(), "src", "uploads");

const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, callback) => {
    const date = Date.now();
    const id = nanoid();
    const fileName = [date, id, file.originalname].join("_");

    callback(null, fileName);
  },
  limits: { fileSize: 1_000_000 },
});

const fileFilter = (req, file, callback) => {
  const isForbiddenFile = !file.originalname.includes("monke");

  callback(null, isForbiddenFile);
};

export const upload = multer({ storage, fileFilter });
