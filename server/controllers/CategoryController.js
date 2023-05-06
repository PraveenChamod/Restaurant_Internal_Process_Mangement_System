import multer from "multer";
import CategoryModel from "../models/Category.js";

const imageStorage = multer.diskStorage({
  destination: "images/Categories",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const image = multer({ storage: imageStorage }).single("image");

// Method : POST
// End Point : "api/v1/Category";
// Description : Add Category

export const addCategories = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { Category } = req.body;
      console.log(Category);
      const SerialNumber =
        Category.slice(0, 2).toUpperCase() + Math.floor(100 + 98 * 100);
      const existingCategory = await CategoryModel.findOne({
        SerialNo: SerialNumber,
      });
      if (existingCategory !== null) {
        res.status(501).json({ message: `This item is already added` });
      } else {
        const AddCategories = await CategoryModel.create({
          SerialNo: SerialNumber,
          CategoryName: Category,
          CategoryImage: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "Added new category",
          data: {
            AddCategories,
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
// End Point : "api/v1/Categories";
// Description : Get Categories
export const getCategories = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Admin" ||
      user.Role === "Customer" ||
      user.Role === "Staff-Member"
    ) {
      const categories = await CategoryModel.find();
      if (categories !== null) {
        res.status(200).json({
          status: "Success",
          message: "Details of all categories",
          data: {
            categories,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes please add categories",
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

// Method : PATCH
// End Point : "api/v1/Category/:id";
// Description : Update Category
export const updateCategory = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Staff-Member" ||
      user.Role === "Admin"
    ) {
      const {CategoryName,Status,image} = req.body;
      const category = await CategoryModel.findOneAndUpdate(
        {CategoryName},
        {
          CategoryName:CategoryName,
          CategoryImage:req.file ? req.file.filename : image,
          Status:Status
        },
        { new: true }
      );
      if (!category) {
        res.status(404).json("No such category to update");
      } else {
        res.status(200).json({
          status: "Success",
          message: `${category.CategoryName} is updated `,
          data: {
            category,
          },
        });
      }
    } else {
      res.status(401).json({
        staus: "Error",
        message: "This user not authorized for this operation",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};