import mongoose from "mongoose";
import ServiceProviders from "../models/ServiceProviders.js";
import StocksOrder from "../models/StockOrder.js";
import SupplierItem from "../models/SupplierItem.js";
import { transporter } from "../util/NotificationUtil.js";
import path from "path";
import ejs from "ejs";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);


// Method : POST
// End Point : "api/v1/SupplierOrder";
// Description : Add Order to supplier for supply
export const addSupplierOrder = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager") {
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        const newOrder = await StocksOrder.create([req.body], { session });
        const commit = await session.commitTransaction();
        session.endSession();
        res.status(201).json({
          status: "Success",
          message: "Your order is placed",
          data: {
            newOrder,
          },
        });
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

// Method : Get
// End Point : "api/v1/SupplierOrder";
// Description : Get supplier order
export const ViewSupplierOrder = async (req, res) => {
  try {
    const user = req.user;
    let placedorders = [];
    let orderDetails;
    let ItemName;
    let Quantity;
    let Item = [];
    let Price;
    const orders = await StocksOrder.find();
    if (user.Role === "Manager") {
      for (const order of orders) {
        try {
          const populatedOrder = await StocksOrder.findById(order.id)
            .populate({
              path: "Manager",
              model: "ServiceProvider",
            })
            .populate({
              path: "Order.Items.id",
              model: "SupplierItem",
            })
            .populate({
              path: "Order.Supplier",
              model: "ServiceProvider",
            })
            .exec();
          if (populatedOrder.Manager.id === user.id) {
            let Name;
            let Email;
            let Status;
            let TotalPrice;
            for (const order1 of populatedOrder.Order) {
              Name = order1.Supplier.Name;
              Email = order1.Supplier.Email;
              Status = populatedOrder.Status;
              TotalPrice = populatedOrder.TotalPrice;
              for (const order of order1.Items) {
                console.log(order);
                for (const item of order.id.Items) {
                  if (item._id == order.item) {
                    ItemName = item.ItemName;
                    Quantity = order.Quantity;
                    Price = item.Price;
                    Item.push({
                      ItemName,
                      Quantity,
                      Price,
                    });
                  }
                }
              }
            }

            orderDetails = {
              orderId: order.id,
              SupplierName: Name,
              SupplierEmail: Email,
              OrderStatus: Status,
              Item,
            };

            placedorders.push(orderDetails);
          }
        } catch (error) {
          res.status(400).json({
            statuts: "Error",
            message: error.message,
          });
        }
      }
      res.status(200).json({
        status: "Success",
        message: "All Order Details",
        data: {
          placedorders,
        },
      });
    } else if (user.Role === "Supplier") {
      for (const order of orders) {
        try {
          const populatedOrder = await StocksOrder.findById(order.id)
            .populate({
              path: "Manager",
              model: "ServiceProvider",
            })
            .populate({
              path: "Order.Items.id",
              model: "SupplierItem",
            })
            .populate({
              path: "Order.Supplier",
              model: "ServiceProvider",
            })
            .exec();
            console.log(populatedOrder);
          for (const order1 of populatedOrder.Order) {
            if (order1.Supplier.id === user.id) {
              const Name = populatedOrder.Manager.Name;
              const Email = populatedOrder.Manager.Email;
              const Status = populatedOrder.Status;
              const ContactNumber = populatedOrder.Manager.ContactNumber
              const Image = populatedOrder.Manager.ProfileImage;
              const TotalPrice = populatedOrder.TotalPrice;
              for (const order of order1.Items) {
                console.log(order);
                for (const item of order.id.Items) {
                  if (item._id == order.item) {
                    ItemName = item.ItemName;
                    Quantity = order.Quantity;
                    Price = item.Price;
                    Item.push({
                      ItemName,
                      Quantity,
                      Price,
                    });
                  }
                }
              }

              orderDetails = {
                orderId: order.id,
                managerName: Name,
                managerEmail: Email,
                managerImage : Image,
                managerContactNumber:ContactNumber,
                OrderStatus: Status,
                Item,
              };

              placedorders.push(orderDetails);
            }
          }
        } catch (error) {
          res.status(400).json({
            statuts: "Error",
            message: error.message,
          });
        }
      }
      res.status(200).json({
        status: "Success",
        message: "All Order Details",
        data: {
          placedorders,
        },
      });
    }
  } catch (error) {}
};

// export const ViewReceivedOrders = async(req,res)=>{
//     try {
//         const user = req.user;
//         if(user.Role === "Supplier"){
//             const findItems = await SupplierItem.find(); //model eka change karaganna
//             console.log(findItems);
//             res.status(201).json({
//                 status: 'success',
//                 message: 'Received Orders',
//                 data: {
//                     findItems
//                 }
//             })
//         }
//         else{
//             res.status(401).json({
//                 status: 'Error',
//                 message: 'User Have No Authorization to do this action',
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             status:'Server Error',
//             message:error.message
//         })
//     }
//  }

// Method : PATCH
// End Point : "api/v1/stockorderconfirmation'"
// Description : Confirm Stock Order
export const ConfirmStockOrder = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Supplier") {
      const {id,Name,Email,ContactNumber,Items,totalPrice} = req.body;
      console.log(req.body);
      const session = await mongoose.startSession();
        try {
          session.startTransaction();
          const UpdateOrder = await StocksOrder.findByIdAndUpdate(
            id,
            { Status: "Confirm" },
            { new: true, runValidators: true }
          ).session(session);
          await session.commitTransaction();
          session.endSession();
          const data = {
            id:id,
            ManagerName: Name,
            ManagerEmail: Email,
            ManagerPhone: ContactNumber,
            SupplierName: user.Name,
            SupplierPhone: user.ContactNumber,
            SupplierEmail: user.Email,
            orderedItems: Items,
            totalPrice: totalPrice,
          };
          const mailOption = {
            from: "resto6430@gmail.com",
            to: Email,
            subject: "Order Confrimation",
            attachments: [
              {
                filename: "logo.png",
                path: `${__dirname}/Template/logo.png`,
                cid: "logo",
              },
            ],
          };
          ejs.renderFile(
            `${__dirname}/Template/StockOrderConfirmation.ejs`,
            data,
            (err, renderHTML) => {
              if (err) {
                console.log(err.message);
                res.status(500).json({
                  status: "Server Error",
                  message: err.message,
                });
              } else {
                mailOption.html = renderHTML;
                transporter.sendMail(mailOption, (err, info) => {
                  if (err) {
                    console.log(err.message);
                    res.status(500).json({
                      status: "Server Error",
                      message: err.message,
                    });
                  }
                });
              }
            }
          );
          res.status(201).json({
            status: "success",
            message: "Order is Confirmed",
            data: {
              UpdateOrder,
            },
          });
        } catch (error) {
          res.status(401).json({
            status: "Error",
            message: error.message,
          });
        }
    }
    else{
      res.status(501).json("This user not authorized for this operation");
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

// Method : GET
// End Point : "api/v1/stockorderbyid/:id'"
// Description : View Stock Order By Id
export const ViewSupplierOrderById = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Supplier") {
      const { id } = req.params;
      let orderDetails;
      let Item = [];
      let ItemName;
      let Quantity;
      let Price;
      try {
        const populatedOrder = await StocksOrder.findById(id)
          .populate({
            path: "Manager",
            model: "ServiceProvider",
          })
          .populate({
            path: "Order.Items.id",
            model: "SupplierItem",
          })
          .populate({
            path: "Order.Supplier",
            model: "ServiceProvider",
          })
          .exec();
        const Name = populatedOrder.Manager.Name;
        const Email = populatedOrder.Manager.Email;
        const Status = populatedOrder.Status;
        const TotalPrice = populatedOrder.TotalPrice;
        for (const order1 of populatedOrder.Order) {
          for (const order of order1.Items) {
            console.log(order);
            for (const item of order.id.Items) {
              if (item._id == order.item) {
                ItemName = item.ItemName;
                Quantity = order.Quantity;
                Price = item.Price;
                Item.push({
                  ItemName,
                  Quantity,
                  Price,
                });
              }
            }
          }
        }
        orderDetails = {
          managerName: Name,
          managerEmail: Email,
          OrderStatus: Status,
          Item,
        };
        res.status(200).json({
          statuts: "Success",
          message: "Order Details",
          data: {
            orderDetails,
          },
        });
      } catch (error) {
        res.status(400).json({
          statuts: "Error",
          message: error.message,
        });
      }
    } else {
      res.status(401).json({
        status: "Error",
        message: "This user dosen't has authorization to do this operation",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
