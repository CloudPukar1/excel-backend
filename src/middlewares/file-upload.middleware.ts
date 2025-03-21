import path from "path";
import multer from "multer";
import { Request } from "express";

const fileFilter = (req: Request, file: any, cb: any) => {
  const filetypes = /.mp4|.pvi|.mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: Videos only");
  }
};

export const upload = multer({
  dest: "uploads/",
  fileFilter,
  limits: { fileSize: 100000000 },
});
