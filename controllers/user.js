import { User } from "../models/user.js";

export const userLoginController = async (req, res) => {
  const { userid, password } = req.body;

  let user = await User.findOne({ uid: userid });

  if (user === null)
    return res.json({
      message: "User not found",
    });

  if (user.password !== password)
    return res.json({
      message: "Password incorrect",
    });

  console.log(user);

  res.render("userHome", { user });
};

export const uploadUserController = async (req, res) => {
  const { name, userid } = req.body;
  const file = req.file;

  let user = await User.findById(userid);

  console.log(name, file, user);

  user.avatar = file.filename || user.avatar;
  user.name = name || user.name;
  await user.save();

  res.json({
    name,
    file,
    user,
  });
};
