import multer from "multer";
import TableItem from "../models/TableItem.js";

const imageStorage = multer.diskStorage({
  destination: "images/TableItems",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const image = multer({ storage: imageStorage }).single("image");

// Method : POST
// End Point : "api/v1/DatingTableItem";
// Description : Add DatingTableItem

export const addTableItems = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { ItemName, ItemType, ItemPrice } = req.body;
      console.log(ItemName);
      console.log(ItemType);
      console.log(ItemPrice);
      const SerialNumber =
        ItemName.slice(0, 2).toUpperCase() + Math.floor(100 + 98 * 100);
      const existingTableItem = await TableItem.findOne({
        SerialNo: SerialNumber,
      });
      if (existingTableItem !== null) {
        res.status(501).json({ message: `This item is already added` });
      } else {
        const AddTableItems = await TableItem.create({
          SerialNo: SerialNumber,
          ItemName: ItemName,
          ItemType: ItemType,
          ItemPrice: ItemPrice,
          TableItemImage: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "Added New Table Item",
          data: {
            AddTableItems,
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
export const getTableItems = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Admin" ||
      user.Role === "Customer" || 
      user.Role === "Staff-Member"
    ) {
      const TableItems = await TableItem.find();
      if (TableItems !== null) {
        res.status(200).json({
          status: "Success",
          message: "Details of all table items",
          data: {
            TableItems,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes please add table items",
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
