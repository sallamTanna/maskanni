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
    gardenChart,
    interiorDecorationChart,
    HealthChart,
    executiveCahrt,
    buildingChart,
    quantityChart,
    electricityChart,
    conditioningChart,
    price,
    urlArray
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
        gardenChart,
        interiorDecorationChart,
        HealthChart,
        executiveCahrt,
        buildingChart,
        quantityChart,
        electricityChart,
        conditioningChart,
        price,
        urlArray
      )
    );
    res.json({
      response: { statusCode: 200 },
      error: null
    });
  } catch (error) {
    console.log(555555, error);

    return next(boom.conflict("مشكلة بالسيرفر، يرجى المحاولة مرة أخرى"));
  }
};
