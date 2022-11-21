const express = require("express");
const db = require("./config/database");
const userModel = require("./models/User");

const app = express();
const port = 3500;
//const bodyParser = require("body-parser");

//let userDB = [{ username: "John Doe" }];

//middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page here");
});

app.get("/users", (req, res) => {
  res.send("Users here");
});

/**
 * Handle the GET request to fetch all users.
 */
app.get("/get-users", (req, res, next) => {
  /**
   * Call the findAll function on the Post model.
   *
   * You can pass the name of the columns you
   * want in the result by using the 'attributes' key.
   *
   * You can use the 'where' condition by using
   * the 'where' key, and passing the value for any coumn.
   */
  userModel
    .findAll({
      attributes: ["id", "firstName", "lastName", "bio"],
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
});

app.get("/get-users/:id", (req, res, next) => {
  /**
   * getting a single user.

   */
  userModel
    .findOne({
      attributes: ["id", "firstName", "lastName", "bio"],
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
});

app.post("/create-user", (req, res, next) => {
  /**
   * creating an user.
   */
  userModel
    .create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    })
    .then((result) => {
      return res.json({
        message: "Record created successfully!",
        status: 200,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        message: "Unable to create a record!",
      });
    });
});

app.delete("/delete-user/:id", (req, res, next) => {
  /**
   * Call the destroy function on the Post model.
   *
   * You can use the 'where' condition by using
   * the 'where' key, and passing the value to delete the specific record.
   */
  userModel
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
});

app.put("/edit-user/:id", (req, res, next) => {
  /**
   * Call the update function on the Post model.
   *
   * You can pass the name of the columns and their new value
   * in JSON format.
   *
   * You can use the 'where' condition by using
   * the 'where' key, and passing the value to update the specific record.
   */
  userModel
    .update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bio: req.body.bio,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((result) => {
      return res.json(result);
    })
    .catch((error) => {
      console.log(error);
      return res.json({});
    });
});

const initApp = async () => {
  console.log("Testing the database connection..");
  /**
   * Testing the connection.
   * using authenticate() function to test if the connection works.
   */
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    console.log(process.env.DATABASE);
    /**
     * Syncronize the User model.
     */
    userModel.sync({
      alter: true,
    });

    /**
     * Starting the web server on the specified port.
     */
    app.listen(port, () => {
      console.log(`Server is up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
