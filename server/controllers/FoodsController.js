import multer from "multer";
import Foods from "../models/Foods.js";

const imageStorage = multer.diskStorage({
  destination: "images/Foods",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
export const image = multer({ storage: imageStorage }).single("image");

// Method : POST
// End Point : "api/v1/Food";
// Description : Add Foods
export const addFoods = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { FoodName, Price, Category } = req.body;
      console.log(Price);
      const SerialNumber =
        Category.slice(0, 2).toUpperCase() +
        Math.floor(100 + Math.random() * 1000);
      const existingFood = await Foods.findOne({ SerialNo: SerialNumber });
      if (existingFood !== null) {
        res.status(501).json({ message: `This item is already added` });
      } else {
        const AddFoods = await Foods.create({
          FoodName: FoodName,
          Price: Price,
          SerialNo: SerialNumber,
          Category: Category,
          FoodImage: req.file.filename,
        });
        res.status(200).json({
          status: "success",
          message: "Added new food",
          data: {
            AddFoods,
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
// End Point : "api/v1/Foods";
// Description : get Foods
export const getFoods = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Staff-Member" ||
      user.Role === "Manager" ||
      user.Role === "Admin" ||
      user.Role === "Customer"
    ) {
      const foods = await Foods.find();
      if (foods !== null) {
        res.status(200).json({
          status: "Success",
          message: "Details of all foods",
          data: {
            foods,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes please add foods",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "Only Staff member has access to do this operation",
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
// End Point : "api/v1/Food/:id";
// Description : get Foods
export const getFoodById = async (req, res) => {
  try {
    const user = req.user;
    console.log({ user });
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { id } = req.params;
      console.log(req.params);
      const food = await Foods.findOne({ _id: id });
      if (food !== null) {
        res.status(200).json({
          status: "Success",
          message: "Food Item Deatils",
          data: {
            food,
          },
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "There are no any recordes plase add foods",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "Only Admin & Manager has access to do this operation",
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
// End Point : "api/v1/Foods/:Category";
// Description : get Foods by category
export const getFoodByCategory = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member" || user.Role === "Customer") {
      const { Category } = req.params;
      const findFoods = await Foods.find({ Category: Category }).populate(
        "Category"
      );
      console.log(findFoods);
      if (findFoods !== null) {
        res.status(200).json({
          status: "Success",
          message: `All ${Category}`,
          data: {
            findFoods,
          },
        });
      } else {
        res.status(400).json({
          status: "Error",
          message: "Category dosen't exist",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "Only Staff-Member has access to do this operation",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
// Method : PATCH
// End Point : "api/v1/Food/:id";
// Description : update Food
export const updateFood = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Manager" ||
      user.Role === "Staff-Member" ||
      user.Role === "Admin"
    ) {
      const { id } = req.params;
      console.log(req.body);
      const {FoodName,Category,Price,Status,image} = req.body;
      const Food = await Foods.findByIdAndUpdate(
        id,
        {
          FoodName:FoodName,
          Category:Category,
          Price:Price,
          Status:Status,
          FoodImage:req.file ? req.file.filename : image
        },
        { new: true }
      );
      console.log(Food);
      if (!Food) {
        res.status(404).json("No such food item to update");
      } else {
        res.status(200).json({
          status: "Success",
          message: `${Food.FoodName} is updated `,
          data: {
            Food,
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

// Method : delete
// End Point : "api/v1/Foods/:id";
// Description : delete Foods
export const deleteFoods = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const { id } = req.params;
      const Food = await Foods.findById(id);
      console.log(Food);
      if (Food !== null) {
        await Food.findByIdAndRemove(Food._id);
        res.status(200).json({
          status: "Success",
          message: `${Food.FoodName} is Removed`,
        });
      } else {
        res.status(404).json({
          status: "Error",
          message: "Food doesn't found, Please enter valid serail no",
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "This user not authorized for this operation",
      });
    }
  } catch (error) {
    res.status(501).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
