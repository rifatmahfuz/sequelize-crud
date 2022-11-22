const express = require("express");
const db = require("./config/database");
const userModel = require("./models/User");

const app = express();
const port = 3500;

app.use(express.json());

require("./routes/routes")(app);

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
