import mongoose from "mongoose";
import ServiceProviders from "../models/ServiceProviders.js";
import SupplierItem from "../models/SupplierItem.js";

// Method : POST
// End Point : "api/v1/SupplierItems";
// Description : Supplier insert items they have
export const SupplierItems = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.Role === "Supplier") {
      console.log(req.body);
      const logedSupplier = await ServiceProviders.findOne({
        Email: user.Email,
      }).populate("Email");
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        const newSupplierItem = await SupplierItem.create([req.body], {
          session,
        });
        const commit = await session.commitTransaction();
        session.endSession();
        res.status(201).json({
          status: "Success",
          message: "Your Supplier Item : successed",
          data: {
            newSupplierItem,
          },
        });
      } catch (error) {
        res.status(500).json({
          status: "Error2",
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

// Method : GET
// End Point : "api/v1/SupplierItemsDetails";
// Description : Get All SupplierItems
export const ViewAllSupplierItems = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager") {
      const findSupplierItems = await SupplierItem.find();
      console.log(findSupplierItems);
      let SupplierItems = [];
      let SupplierItemDetails;
      for (const Item of findSupplierItems) {
        try {
          const populatedSupplierItem = await SupplierItem.findById(Item.id)
            .populate({
              path: "Supplier",
              model: "ServiceProvider",
            })
            .exec();
          console.log(populatedSupplierItem);
          const id = populatedSupplierItem._id;
          const SupplierItemsId = Item.id;
          const Id = populatedSupplierItem.Supplier.id;
          const Name = populatedSupplierItem.Supplier.Name;
          const ContactNumber = populatedSupplierItem.Supplier.ContactNumber;
          const supplierItem = populatedSupplierItem.Items.map((item) => {
            if (item !== undefined) {
              return {
                SupplierItemsId: SupplierItemsId,
                SupplierId: Id,
                ItemId: item.id,
                ItemName: item.ItemName,
                Price: item.Price,
                Status: item.Status,
                Category: item.Category,
                id: id,
              };
            }
          });
          SupplierItemDetails = {
            supplierName: Name,
            supplierContactNumber: ContactNumber,
            supplierItem,
          };
          SupplierItems.push(SupplierItemDetails);
        } catch (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }
      }

      res.status(200).json({
        status: "Success",
        message: "All Supplier Item Details",
        data: {
          SupplierItems,
        },
      });
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/SupplierItemsDetailsById/:id";
// Description : Get SupplierItem by id
export const ViewAllSupplierItemsById = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Supplier") {
      const { id } = req.params;
      let SupplierItems = [];
      let SupplierItemDetails;
      try {
        const populatedSupplierItem = await SupplierItem.findById(id)
          .populate({
            path: "Supplier",
            model: "ServiceProvider",
          })
          .exec();
        console.log(populatedSupplierItem);
        const Name = populatedSupplierItem.Supplier.Name;
        const ContactNumber = populatedSupplierItem.Supplier.ContactNumber;
        const supplierItem = populatedSupplierItem.Items.map((item) => {
          if (item !== undefined) {
            return {
              ItemName: item.ItemName,
              Price: item.Price,
              Status: item.Status,
              Category: item.Category,
            };
          }
        });
        SupplierItemDetails = {
          supplierName: Name,
          supplierContactNumber: ContactNumber,
          supplierItem,
        };
        SupplierItems.push(SupplierItemDetails);
        res.status(200).json({
          status: "Success",
          message: "All Supplier Item Details",
          data: {
            SupplierItems,
          },
        });
      } catch (err) {
        console.error(err);
        return res.status(500).send("Server Error");
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/supplieritemsdetailsofsupplier";
// Description : Get SupplierItems Of Supplier
export const ViewSupplierItemsofSupplier = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Supplier") {
      const findSupplierItems = await SupplierItem.find();
      console.log(findSupplierItems);
      let SupplierItems = [];
      let SupplierItemDetails;
      for (const Item of findSupplierItems) {
        try {
          const populatedSupplierItem = await SupplierItem.findById(Item.id)
            .populate({
              path: "Supplier",
              model: "ServiceProvider",
            })
            .exec();
          console.log(populatedSupplierItem);
          if (populatedSupplierItem.Supplier.id == user.id) {
            const SupplierItemsId = Item.id;
            const Id = populatedSupplierItem.Supplier.id;
            const Name = populatedSupplierItem.Supplier.Name;
            const ContactNumber = populatedSupplierItem.Supplier.ContactNumber;
            const supplierItem = populatedSupplierItem.Items.map((item) => {
              if (item !== undefined) {
                return {
                  SupplierItemsId: SupplierItemsId,
                  SupplierId: Id,
                  ItemId: item.id,
                  ItemName: item.ItemName,
                  Price: item.Price,
                  Status: item.Status,
                  Category: item.Category,
                };
              }
            });
            SupplierItemDetails = {
              supplierName: Name,
              supplierContactNumber: ContactNumber,
              supplierItem,
            };
            SupplierItems.push(SupplierItemDetails);
          }
        } catch (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }
      }

      res.status(200).json({
        status: "Success",
        message: "All Supplier Item Details",
        data: {
          SupplierItems,
        },
      });
    } else {
      res.status(401).json({
        status: "Error",
        message: "User Have No Authorization to do this action",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
