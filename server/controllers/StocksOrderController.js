import mongoose from "mongoose";
import ServiceProviders from "../models/ServiceProviders.js";
import StocksOrder from "../models/StockOrder.js";
import SupplierItem from "../models/SupplierItem.js";
import { transporter } from "../util/NotificationUtil.js";
import path from "path";
import ejs from "ejs";
import ShoutoutClient from "shoutout-sdk";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);
  var apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTU0YTA3MC0yYTBkLTExZWQtYTIyZC0yMzNlNTJkNzg3MDYiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MjA0NzQ4OSwiZXhwIjoxOTc3NjY2Njg5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMzgxIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.7ODAC-X1QFiFFKMpoe23iD-mpEPRkO6twmBsvQvgnOM";

var debug = true,
  verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

// Method : POST
// End Point : "api/v1/SupplierOrder";
// Description : Add Order to supplier for supply
export const addSupplierOrder = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager") {
      let suppliersnumbers = [];
      const session = await mongoose.startSession();
      try {
        session.startTransaction();
        const newOrder = await StocksOrder.create([req.body], { session });
        const commit = await session.commitTransaction();
        session.endSession();
        for(const supplier of req.body.Order){
          const findsupplier = await ServiceProviders.findById(supplier.Supplier);
          suppliersnumbers.push(
            {number : findsupplier.ContactNumber}
          );
        }
        console.log(suppliersnumbers);
        for(const number of suppliersnumbers){
          var message = {
            source: "ShoutDEMO",
            destinations: [number.number],
            content: {
              sms: `You have new order to confirm! check pending orders through the Resto app ⏰♨️`,
            },
            transports: ["sms"],
          };
          client.sendMessage(message, (error, result) => {
            if (error) {
              console.error("error ", error);
            } else {
              console.log("result ", result);
            }
          });
        }
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
    let Status;
    let ConfirmedItems = [];
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
          for (const order1 of populatedOrder.Order) {
            if (order1.Supplier.id === user.id) {
              const Name = populatedOrder.Manager.Name;
              const Email = populatedOrder.Manager.Email;
              const ContactNumber = populatedOrder.Manager.ContactNumber
              const Image = populatedOrder.Manager.ProfileImage;
              const TotalPrice = populatedOrder.TotalPrice;
              for (const order of order1.Items) {
                if(order1.Status === "Pending"){
                  for (const item of order.id.Items) {
                    if (item._id == order.item) {
                      ItemName = item.ItemName;
                      Quantity = order.Quantity;
                      Price = item.Price;
                      Status = order1.Status
                      Item.push({
                        ItemName,
                        Quantity,
                        Price,
                        Status
                      });
                    }
                }
                }
              }
              for (const order of order1.Items) {
                if(order1.Status === "Confirm"){
                  for (const item of order.id.Items) {
                    if (item._id == order.item) {
                      ItemName = item.ItemName;
                      Quantity = order.Quantity;
                      Price = item.Price;
                      Status = order1.Status
                      ConfirmedItems.push({
                        ItemName,
                        Quantity,
                        Price,
                        Status
                      });
                    }
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
                ConfirmedItems
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
      const session = await mongoose.startSession();
        try {
          session.startTransaction();
          const orders = await StocksOrder.findById(id)
          .populate({
            path: "Order.Items.id",
            model: "SupplierItem",
          })
          .populate({
            path: "Order.Supplier",
            model: "ServiceProvider",
          })
          .exec();
          for(const order of orders.Order){
            if(order.Supplier.Email === user.Email){
              order.Status = "Confirm";
            }
          }
          const updatedOrder = await StocksOrder.findByIdAndUpdate(
            id,
            { Order: orders.Order },
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
