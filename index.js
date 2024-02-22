import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/database.js";
import User from "./model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";
import cors from "cors";

//configure env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express();

//cors
app.use(cors())
app.use(express.json({ limit: "50mb" }));

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

//routes
// app.use('/api', routes)

//rest apis
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Ecommerce Website",
  });
});

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome to Ecommerce Website 🙌");
});

// Register
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, email, password, isAdmin } = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    const encryptedUserPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
      isAdmin: isAdmin,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "5h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json(user);
    }
    return res.status(400).send("Invalid Credentials");

    // Our login logic ends here
  } catch (err) {
    console.log(err);
  }
});

// app.use('/api/seed', seedRouter);
// app.use('/api/products', productRouter);
// app.use('/api/users', userRouter);
// app.use('/api/orders', orderRouter);
// app.use('/api/upload', uploadRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`server running on port:${PORT}`);
});
