import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";

export const adminLoginController = async (req, res) => {
  // let admin = await Admin.create({
  //   uid: req.body.userid,
  //   password: req.body.password,
  // });
  // return res.json({
  //   message: "Created",
  //   admin: admin,
  // })

  let admin = await Admin.findOne({ uid: req.body.userid }).populate(
    "users",
    "uid name avatar verified"
  );
  if (admin === null)
    return res.json({
      message: "Admin not found",
    });

  if (admin.password !== req.body.password)
    return res.json({
      message: "Password incorrect",
    });

  console.log(admin);
  res.render("adminHome", { admin });
};

export const createUserController = async (req, res) => {
  const { adminid, userid, password } = req.body;
  console.log(adminid, userid, password);

  let user = await User.create({
    uid: userid,
    password: password,
  });
  console.log("Create", user);

  let admin = await Admin.findById(adminid).populate(
    "users",
    "uid name avatar verified"
  );

  admin.users.push(user._id);
  await admin.save();
  res.render("login", { role: "User" });
};

export const viewUsersController = async (req, res) => {
  console.log(req.query.adminId);
  let admin = await Admin.findById(req.query.adminId).populate(
    "users",
    "uid name avatar verified"
  );

  if (!admin) {
    return res.json({ message: true });
  }

  res.render("viewUsers", { admin });
};

export const deleteUserController = async (req, res) => {
  const { userid } = req.params;
  const user = await User.findByIdAndDelete(userid);
  res.json({
    message: "User deleted successfully",
    user,
  });
};

export const verifyUserController = async (req, res) => {
  const { userid } = req.params;
  const user = await User.findById(userid);
  user.verified = true;
  await user.save();
  res.json({
    message: "User verified successfully",
    user,
  });
};
