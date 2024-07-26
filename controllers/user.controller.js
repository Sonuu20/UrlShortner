import User from "../models/user.model.js";
import { v4 as uuid4 } from "uuid";
import { setUser, getUser } from "../service/auth.service.js";

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
    
    const sessionId = uuid4();
    setUser(sessionId, user);
    res.cookie('uid',sessionId);
  return res.redirect("/");
}

export { handleUserSignup, handleUserLogin };
