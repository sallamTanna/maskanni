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
    bedRoomsDescription,
    garageDescription,
    gardenDescription,
    charts,
    price,
    engineerPrice,
    projectMainImage,
    filesURLs,
    imagesURLs,
    user_id
  } = req.body;

  try {
    console.log(9999999999, imagesURLs);

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
        bedRoomsDescription,
        garageDescription,
        gardenDescription,
        charts,
        price,
        engineerPrice,
        imagesURLs,
        projectMainImage,
        filesURLs,
        user_id
      )
    );
    res.json({
      response: { statusCode: 200 },
      error: null
    });
  } catch (error) {
    console.log("errrrrrrror", error);

    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
