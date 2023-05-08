import mongoose from "mongoose";
import Package from "../models/Packages.js";

export const addPackage = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Admin" || user.Role === "Manager") {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        const newpackage = await Package.create([req.body], { session });
        const commit = await session.commitTransaction();
        session.endSession();
        res.status(200).json({
          status: "Success",
          message: "Package create successfully",
          data: {
            newpackage,
          },
        });
      } catch (error) {
        res.status(400).json({
          status: "Error",
          message: error.message,
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "This user doesn't have authorization to do this action",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

export const getPackages = async (req, res) => {
  const user = req.user;
  try {
    let packages = [];
    let Items = [];
    let data;
    if (user.Role !== "Deliverer" || user.Role !== "Supplier") {
      const findPackages = await Package.find();
      for (const existpackage of findPackages) {
        const populatedPackages = await Package.findById(existpackage.id)
          .populate({
            path: "Items.item",
            model: "TableItem",
          })
          .exec();
        const Items = populatedPackages.Items.map((item) => {
          return {
            ItemId : item.item.id,
            ItemName: item.item.ItemName,
            ItemType: item.item.ItemType,
            ItemImage: item.item.TableItemImage,
          };
        });
        data = {
          id: populatedPackages.id,
          packageName: populatedPackages.Name,
          Items,
          Price: populatedPackages.Price,
        };
        packages.push(data);
      }

      res.status(200).json({
        status: "Success",
        message: "Package Details Exists",
        data: {
          packages,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

export const updatePackage = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Staff-Member") {
      const { id, itemIds, price } = req.body;
      let findpackage = await Package.findById(id);
      const session = await mongoose.startSession();
      try {
        if (findpackage) {
          if (itemIds !== undefined) {
            for (const itemid of itemIds) {
              let ItemIndex = findpackage.Items.findIndex(
                (key) => key.item == itemid
              );
              if (ItemIndex < 0) {
                findpackage.Items.push({ item: itemid });
              }
              findpackage = await findpackage.save();
            }
            return res.status(200).json({
              status: "Success",
              message: "Package updated successfully",
              data: {
                findpackage,
              },
            });
          }
        }
        if (price !== undefined) {
          session.startTransaction();
          const updatePackage = await Package.findByIdAndUpdate(
            id,
            {
              Price: price,
            },
            { new: true }
          ).session(session);
          const commit = await session.commitTransaction();
          session.endSession();
          return res.status(200).json({
            status: "Success",
            message: "Package updated successfully",
            data: {
              updatePackage,
            },
          });
        }
      } catch (error) {
        res.status(400).json({
          status: "Error",
          message: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

export const removeItemsFromPackage = async (req, res) => {
  try {
    const { id, itemId } = req.body;
    const cart = await Package.updateOne(
      { _id: id },
      { $pull: { Items: { item: itemId } } }
    );
    await getPackages(req, res);
  } catch (error) {
    res.status(500).json({
      success: "Error",
      message: "Failed to remove item from package",
    });
  }
};
