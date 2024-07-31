import jwt from "jsonwebtoken";

const secret = "Sonuu$1234%";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Error verifying the token: ", error);
    return null;
  }
}

export { setUser, getUser };
