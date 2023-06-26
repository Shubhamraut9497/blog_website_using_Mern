import UserModel from "../models/models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fs from "fs";
import PostModel from "../models/post.js";
import multer from "multer";
dotenv.config();

const SECRET_KEY = "bnjfnv3238basbbw29713jsjs2344jvdvb4";
const uploads = multer({
  limits: {
    fieldSize: 10 * 1024 * 1024, // 10MB
  },
});

export const registerUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};
export const LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDoc = await UserModel.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ username, id: userDoc._id }, SECRET_KEY, {}, (err, token) => {
        if (err) {
          throw err;
        }
        res.cookie("token", token).json({
          id: userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json("wrong credentials");
    }
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

export const userProfile = async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, SECRET_KEY, {}, (err, info) => {
    if (err) {
      throw err;
    }
    res.json(info);
  });
};
// logoout
export const logout = async (req, res) => {
  res.cookie("token", "").json("ok");
};
export const uploadFiles = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname?.split(".");
  const ext = parts.length > 1 ? parts[parts.length - 1] : "";
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { title, summary, content } = req.body;
    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
};
export const getPostData = async (req, res) => {
  const postData = await PostModel.find({})
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);

  res.json(postData);
};
export const getSinglePostData = async (req, res) => {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate("author", ["username"]);
  res.json(postDoc);
};

export const UpdatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname?.split(".");
    const ext = parts.length > 1 ? parts[parts.length - 1] : "";
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;

  jwt.verify(token, SECRET_KEY, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { id, title, summary, content } = req.body;
    const postDoc = await PostModel.findOneAndUpdate(
      { _id: id, author: info.id },
      {
        title,
        summary,
        content,
        cover: newPath ? newPath : null, // Set null if newPath is falsy
      },
      { new: true }
    );

    if (!postDoc) {
      return res.status(400).send("You are not the author of this post.");
    }

    res.json(postDoc);
  });
};

