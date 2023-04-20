import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "./config.js";
import { User } from "./User.js";
import jwt from "jsonwebtoken";

const strategyOptions = {
  secretOrKey: config.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(new Strategy(strategyOptions, (payload, done) => {
  User.findOne({ _id: payload.id })
    .then((user) =>
      !user
        ? done(new Error("User not existing"))
        : done(null, user)
    ).catch(done);
}));

export const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (!user || error) return res.status(401).json({ message: "Unauthorized bro!" });
    req.user = user;
    next();
  })(req, res, next);
};



export const customAuth = async (req, res, next) => {
  const token = req.headers["authorization"]?.slice(7);
  console.log({ token });

  if (!token) return res.status(401).json({ message: "Unauthorized pal!" });

  try {
    const tokenData = jwt.verify(token, config.JWT_SECRET, { complete: true });
    console.log({ tokenData });

    const user = await User.findOne({ _id: tokenData.payload.id });

    if (!user) return res.status(401).json({ message: "Unauthorized pal!" });
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const errorHandler = (error, req, res, next) => res.status(500).json({ message: "Ooopsie!" });