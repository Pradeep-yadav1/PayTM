const express = require("express");
const router = express.Router();
const z = require("zod");
const { User, Account } = require("../db/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/authMiddleware");
const { hashPassword } = require("../utilis/hassPassword");

const signupBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        msg: "Incorrect inputs",
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return res.status(401).json({
        msg: "Email already taken",
      });
    }
    const hashedPassword = await hashPassword(req.body.password);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    const userId = user._id;
    
    await Account.create({
      userId,
      balance: 1 + Math.random() * 1000
    })

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({
      message: "User created successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(401).json({
        msg: "Incorrect inputs ",
      });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        msg: "USER NOT FOUND",
      });
    }

    const isPasswordValid = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(411).json({
        msg: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({
      msg: "Signin successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

const updateBody = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        msg: "Error while fetching data",
      });
    }

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    await User.updateOne({ _id: req.userId }, { $set: req.body });

    res.json({
      msg: "updated successfully",
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error occured while updating", error: err.message });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,$options:"i"
        },
      },
      {
        lastName: {
          $regex: filter,$options:"i"
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
