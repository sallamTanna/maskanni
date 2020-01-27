const boom = require("boom");

const dbQuery = require("../../database/queries/dbQuery");
const { addNewProject } = require("./helper");

module.exports = async (req, res, next) => {
  const {
    projectName,
    projectDescription,
    size,
    width,
    length,
    height,
    livingRoomsNumber,
    bathRoomsNumber,
    carGarageNumber,
    floorsNumber,
    bedRoomsNumber,
    kitchenDescription,
    roomsDescription,
    garageDescription,
    gardenDescription,
    charts,
    price,
    urlArray,
    projectMainImage
  } = req.body;

  try {
    const saveNewProjectResult = await dbQuery(
      addNewProject(
        projectName,
        projectDescription,
        size,
        width,
        length,
        height,
        livingRoomsNumber,
        bathRoomsNumber,
        carGarageNumber,
        floorsNumber,
        bedRoomsNumber,
        kitchenDescription,
        roomsDescription,
        garageDescription,
        gardenDescription,
        charts,
        price,
        urlArray,
        projectMainImage
      )
    );
    res.json({
      response: { statusCode: 200 },
      error: null
    });
  } catch (error) {
    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
