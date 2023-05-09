import SpecialEventModel from "../models/SpecialEvent.js";

// Method : POST
// End Point : "api/v1/SpecialEvent";
// Description : Add SpecialEvent

export const addSpecialEvent = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { EventName, Item1, Item2, Item3, BronzePrice, SilverPrice, GoldPrice } = req.body;
      console.log(EventName);
      console.log(Item1);
      console.log(Item2);
      console.log(Item3);
      console.log(BronzePrice);
      console.log(SilverPrice);
      console.log(GoldPrice);
      const SerialNumber = EventName.slice(0, 2).toUpperCase() + Math.floor(100 + 98 * 100);
      const existingSpecialEvent = await SpecialEventModel.findOne({
        SerialNo: SerialNumber,
      });
      if (existingSpecialEvent !== null) {
        res.status(501).json({ message: `This event is already added` });
      } else {
        const AddSpecialEvent = await SpecialEventModel.create({
          SerialNo: SerialNumber,
          EventName: EventName,
          Item1: Item1,
          Item2: Item2,
          Item3: Item3,
          BronzePrice: BronzePrice,
          SilverPrice: SilverPrice,
          GoldPrice: GoldPrice,
        });
        res.status(200).json({
          status: "success",
          message: "Added New Special Event",
          data: {
            AddSpecialEvent,
          },
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "This user dosen't has authorization to do this operation",
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "Server Error",
      message: error.message,
    });
  }
};


// Method : GET
// End Point : "api/v1/SpecialEvents";
// Description : Get Special Events
export const getSpecialEvents = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Admin" ||
      user.Role === "Customer"
    ) {
      const specialEvents = await SpecialEventModel.find();
      if (specialEvents !== null) {
        res.status(200).json({
          status: "Success",
          message: "Details of all special events",
          data: {
            specialEvents,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes please add special events",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message:
          "Only Manager, Admin and customer have access to do this operation",
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
