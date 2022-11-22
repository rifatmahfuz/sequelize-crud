const db = require("../config/database");
const userModel = require("../models/User");
// const express = require('express');
// const app = express();
// app.use(express.json());

exports.create = (req, res, next) => {
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
};

exports.getAll = (req, res, next) => {
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
};

exports.getOne = (req, res, next) => {
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
};

exports.deleteOne = (req, res, next) => {
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
};

exports.updateOne = (req, res, next) => {
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
};
