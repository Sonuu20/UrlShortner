import User from "../models/user.model.js";
import { setUser } from "../service/auth.service.js";

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

  const token = setUser(user);
   res.cookie("token", token);
  return res.redirect("/");
}

export { handleUserSignup, handleUserLogin };
