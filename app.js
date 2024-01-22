import express from "express";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import methodOverride from "method-override";

export const app = express();

app.set("view engine", "ejs");

app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use("/features", express.static("features"));
app.use("/node_modules", express.static("node_modules"));
app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  let { role } = req.body;
  if (role === "admin") role = "Admin";
  else role = "User";
  res.render("login", { role });
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);
