const { response } = require("express");
const db = require("../config/database");
const userModel = require("../models/User");

exports.create = async (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
  };

  try {
    const result = await userModel.create(data);
    return res.status(201).json({
      message: "Record created successfully!",
      response: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Unable to create a record!",
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await userModel.findAll({
      attributes: ["id", "firstName", "lastName", "bio"],
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: err.message || "Some error occurred while retrieving user data.",
    });
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const result = await userModel.findOne({
      attributes: ["id", "firstName", "lastName", "bio"],
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const result = await userModel.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ message: "Deleted Successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not delete due to server error" });
  }
};

exports.updateOne = async (req, res, next) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    bio: req.body.bio,
  };

  try {
    const result = await userModel.update(data, {
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "Record updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
