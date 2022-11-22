module.exports = (app) => {
  const con = require("../controller/userController");
  var router = require("express").Router();

  router.post("/create-user", con.create);

  router.get("/get-users", con.getAll);

  router.get("/get-users/:id", con.getOne);

  router.put("/get-users/update/:id", con.updateOne);

  router.delete("/get-users/delete/:id", con.deleteOne);

  app.use("/", router);
};
