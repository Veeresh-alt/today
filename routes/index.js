require("dotenv").config();
var express = require("express");
const db = require("../db/models");
var router = express.Router();
const {
  vitals_sub_group,
  foreign,
  foreignsubs,
  address,
} = require("../db/models");

router.post("/foreign", async (req, res) => {
  try {
    const { name, mobile, address } = req.body;
    const data = await foreign.create(
      {
        name,
        foreignsubs: {
          mobile,
          address: {
            address,
          },
        },
      },
      {
        include: [
          {
            model: db.sequelize.models.foreignsub,
            through: {
              attributes: ["id", "mobile", "foreign_id"],
            },
            include: [
              {
                model: db.sequelize.models.address,
              },
            ],
          },
        ],
      }
    );

    // model: db.sequelize.models.foreignsub,
    //       include: {
    //         model: db.sequelize.models.address,
    //       },

    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/foreign", async (req, res) => {
  try {
    const data = await foreign.findAll({
      // include: ["foreignsubs",  ], // include the foreignsubs table
      include: [
        // "foreignsubs",
        {
          model: db.sequelize.models.foreignsub,
          include: [
            {
              model: db.sequelize.models.address,
              attributes: { exclude: [] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ], // include the foreignsubs table
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/foreign/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await foreign.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/foreignsub", async (req, res) => {
  try {
    const data = await foreignsubs.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    let data = await vitals_sub_group.findAll({
      attributes: ["id", "type", "vitals_group_id", "health_monitor_id"],
    });
    res
      .status(200)
      .json({ message: "Data retrieved", data: data, status: 200 });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let data = await vitals_sub_group.findOrCreate(
      {
        where: {
          type: req.body.type,
        },
        defaults: {
          type: req.body.type,
          vitals_group_id: req.body.vitals_group_id,
          health_monitor_id: req.body.health_monitor_id,
        },
        // fields: ["id", "type", "vitals_group_id", "health_monitor_id"],
        // include: ["id", "type", "vitals_group_id", "health_monitor_id"],
      }

      // attributes: ["id", "type", "vitals_group_id", "health_monitor_id"],
    );

    if (data[0]._options.isNewRecord) {
      delete data[0].dataValues.createdAt;
      delete data[0].dataValues.updatedAt;
      res.status(201).json({
        message: "success",
        data: data[0].dataValues,
        status: 201,
      });
    } else {
      res.status(409).json({
        message: "Type already exists",
        status: 409,
      });
    }
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).json({ message: error, status: 500 });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    let data = await vitals_sub_group.destroy({
      where: {
        // vitals_group_id: req.params.id,
        id: req.params.id,
      },
    });
    if (data) {
      res.status(200).json({ message: "Deleted", data: data, status: 200 });
    } else {
      res.status(404).json({ message: "Not found", data: data, status: 404 });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.delete("/delete/all", async function (req, res, next) {
  try {
    let data = await vitals_sub_group.destroy({
      truncate: true,
    });

    res.status(200).json({ message: "Deleted", data: data, status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
