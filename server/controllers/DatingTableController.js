import multer from "multer";
import DatingTableItemModel from "../models/DatingTableItem.js";

const imageStorage = multer.diskStorage({
  destination: "images/DatingTableItems",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const image = multer({ storage: imageStorage }).single("image");

// Method : POST
// End Point : "api/v1/DatingTableItem";
// Description : Add DatingTableItem

export const addDatingTableItems = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { ItemName, ItemType, ItemPrice } = req.body;
      console.log(ItemName);
      console.log(ItemType);
      console.log(ItemPrice);
      const SerialNumber =
        ItemName.slice(0, 2).toUpperCase() + Math.floor(100 + 98 * 100);
      const existingDatingTableItem = await DatingTableItemModel.findOne({
        SerialNo: SerialNumber,
      });
      if (existingDatingTableItem !== null) {
        res.status(501).json({ message: `This item is already added` });
      } else {
        const AddDatingTableItems = await DatingTableItemModel.create({
          SerialNo: SerialNumber,
          ItemName: ItemName,
          ItemType: ItemType,
          ItemPrice: ItemPrice,
          DatingTableItemImage: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "Added New Dating Table Item",
          data: {
            AddDatingTableItems,
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
// End Point : "api/v1/DatingTableItems";
// Description : Get Dating Table Items
export const getDatingTableItems = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Admin" ||
      user.Role === "Customer"
    ) {
      const datingTableItems = await DatingTableItemModel.find();
      if (datingTableItems !== null) {
        res.status(200).json({
          status: "Success",
          message: "Details of all dating table items",
          data: {
            datingTableItems,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes please add dating table items",
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
