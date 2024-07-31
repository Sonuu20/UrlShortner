import { getUser } from "../service/auth.service.js";

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookie?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
};

// async function restrictToLoggedinUserOnly(req, res, next) {
//   // console.log(req);
//   // const userUid = req.cookies?.uid;
//   const userUid = req.headers("Authorization");

//   if (!userUid) return res.redirect("/login");
//   const token = userUid.split("Bearer")[1];
//   const user = getUser(token);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   console.log(req.headers);
//   const userUid = req.headers("authorization");
//   const token = userUid.split("Bearer ")[1];

//   const user = getUser(userUid);

//   req.user = getUser(token);
//   next();
// }

function restirctTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  };
}

export { checkForAuthentication, restirctTo };
