const services = require("../services");

async function get(req, res, next) {
  try {
    res.json(await services.getData());
  } catch (err) {
    console.error(`Error while getting data`, err.message);
    next(err);
  }
}

module.exports = {
  get,
};
