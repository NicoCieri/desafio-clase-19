import * as userService from "../services/user.services.js";

export const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await userService.registerUser(user);

    if (newUser) res.redirect("/login");
    else res.redirect("/error-register");
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.body;
    const userExist = await userService.loginUser(user);

    if (userExist) {
      console.log(req.session);
      req.session.user = userExist;
      res.redirect("/products");
    } else res.redirect("/error-login");
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
