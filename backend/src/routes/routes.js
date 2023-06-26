import express from "express";
import {
  LoginUser,
  logout,
  registerUser,
  userProfile,
  uploadFiles,
  getPostData,
  getSinglePostData,
  UpdatePost
} from "../controllers/controller.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const uploadMiddleware = multer({ dest: "uploads/" });

const router = express.Router();

router.use(cookieParser()); // Adding cookieParser middleware to parse cookies

router.post("/register", registerUser);
router.post("/login", LoginUser);
router.get("/profile", userProfile);
router.post("/logout", logout);
router.post("/post", uploadMiddleware.single("file"), uploadFiles);
router.get("/post", getPostData);
router.get("/post/:id",getSinglePostData);
router.put("/post",uploadMiddleware.single("file"),UpdatePost)

export default router;
