import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import Foods from "../models/Foods.js";
import Order from "../models/Order.js";
import ServiceProviders from "../models/ServiceProviders.js";
import path from "path";
import ejs from "ejs";
import { transporter } from "../util/NotificationUtil.js";
import ShoutoutClient from "shoutout-sdk";

var apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMTU0YTA3MC0yYTBkLTExZWQtYTIyZC0yMzNlNTJkNzg3MDYiLCJzdWIiOiJTSE9VVE9VVF9BUElfVVNFUiIsImlhdCI6MTY2MjA0NzQ4OSwiZXhwIjoxOTc3NjY2Njg5LCJzY29wZXMiOnsiYWN0aXZpdGllcyI6WyJyZWFkIiwid3JpdGUiXSwibWVzc2FnZXMiOlsicmVhZCIsIndyaXRlIl0sImNvbnRhY3RzIjpbInJlYWQiLCJ3cml0ZSJdfSwic29fdXNlcl9pZCI6IjczMzgxIiwic29fdXNlcl9yb2xlIjoidXNlciIsInNvX3Byb2ZpbGUiOiJhbGwiLCJzb191c2VyX25hbWUiOiIiLCJzb19hcGlrZXkiOiJub25lIn0.7ODAC-X1QFiFFKMpoe23iD-mpEPRkO6twmBsvQvgnOM";

var debug = true,
  verifySSL = false;

var client = new ShoutoutClient(apiKey, debug, verifySSL);

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);

// Method : POST
// End Point : "api/v1/OrderItem";
// Description : Ordering Item
export const OrderItem = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.Role === "Customer") {
      console.log(req.body);
      const logedCustomer = await Customer.findOne({
        Email: user.Email,
      }).populate("Email");
      const session = await mongoose.startSession();
      try {
        if (logedCustomer.Address !== null) {
          session.startTransaction();
          const newOrder = await Order.create([req.body], { session });
          const commit = await session.commitTransaction();
          session.endSession();
          res.status(201).json({
            status: "Success",
            message: "Your order is successed",
            data: {
              newOrder,
            },
          });
        } else {
          res.status(400).json({
            status: "Error",
            message: "Set Your Address First",
          });
        }
      } catch (error) {
        res.status(500).json({
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

// Method : POST
// End Point : "api/v1/staffmemberorderItem";
// Description : Place Order By StaffMember
export const PlaceOrderByStaffMember = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const { ContactNumber, Foods, TotalPrice } = req.body;
      const findCustomer = await Customer.findOne({
        ContactNumber: ContactNumber,
      }).populate("ContactNumber");
      const session = await mongoose.startSession();
      try {
        if (findCustomer !== null) {
          session.startTransaction();
          const newOrder = await Order.create(
            [
              {
                Customer: findCustomer,
                Foods: Foods,
                TotalPrice: TotalPrice,
                Status: "Confirm",
                Type: "Outlet Order",
              },
            ],
            { session }
          );
          const commit = await session.commitTransaction();
          session.endSession();
          res.status(201).json({
            status: "Success",
            message: "Your order is successed",
            data: {
              newOrder,
            },
          });
        } else {
          session.startTransaction();
          const newOrder = await Order.create(
            [
              {
                Foods: Foods,
                TotalPrice: TotalPrice,
                Status: "Confirm",
                Type: "Outlet Order",
              },
            ],
            { session }
          );
          const commit = await session.commitTransaction();
          session.endSession();
          res.status(201).json({
            status: "Success",
            message: "Your order is successed",
            data: {
              newOrder,
            },
          });
        }
      } catch (error) {
        res.status(500).json({
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

// Method : GET
// End Point : "api/v1/Orders";
// Description : Get All Orders
export const ViewAllOrders = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Manager" || user.Role === "Admin") {
      const findOrders = await Order.find();
      let Orders = [];
      for (const order of findOrders) {
        let OrderDetails;
        console.log(order);
        try {
          const populatedOrder = await Order.findById(order.id)
            .populate({
              path: "Customer",
              model: "Customer",
            })
            .populate({
              path: "Foods.food",
              model: "Foods",
            })
            .populate({
              path: "Foods.offer",
              model: "Offers",
            })
            .exec();

          const Name = populatedOrder.Customer.Name;
          const Email = populatedOrder.Customer.Email;
          const ContactNumber = populatedOrder.Customer.ContactNumber;
          const CustomerAddress = populatedOrder.Customer.Address;
          const food = populatedOrder.Foods.map((item) => {
            if (item.food !== undefined) {
              return {
                FoodName: item.food.FoodName,
                Category: item.food.Category,
                image: item.food.FoodImage,
                quantity: item.Quantity,
                price: item.food.Price,
                PaymentMethod: populatedOrder.paymentMethod,
              };
            } else if (item.offer !== undefined) {
              return {
                FoodName: item.offer.OfferName,
                Category: item.offer.Category,
                image: item.offer.OfferImage,
                quantity: item.Quantity,
                price: item.offer.SpecialPrice,
                PaymentMethod: populatedOrder.paymentMethod,
              };
            }
          });
          OrderDetails = {
            OrderId: order.id,
            customerName: Name,
            customerEmail: Email,
            ContactNumber: ContactNumber,
            CustomerAddress: CustomerAddress,
            food,
            TotalPrice: populatedOrder.TotalPrice,
            Status: populatedOrder.Status,
            Date: order.Date,
          };
          Orders.push(OrderDetails);
        } catch (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }
      }

      res.status(200).json({
        status: "Success",
        message: "All Order Details",
        data: {
          Orders,
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
// End Point : "api/v1/PendingOrders";
// Description : Get Pending Orders
export const ViewPendingOrders = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const findOrders = await Order.find();
      let pendingOrders = [];
      for (const order of findOrders) {
        if (order.Status === "Pending" ) {
          let OrderDetails;
          try {
            const populatedOrder = await Order.findById(order.id)
              .populate({
                path: "Customer",
                model: "Customer",
              })
              .populate({
                path: "Foods.food",
                model: "Foods",
              })
              .populate({
                path: "Foods.offer",
                model: "Offers",
              })
              .exec();
            console.log(populatedOrder);
            const Name = populatedOrder.Customer.Name;
            const Email = populatedOrder.Customer.Email;
            const ContactNumber = populatedOrder.Customer.ContactNumber;
            const CustomerAddress = populatedOrder.Customer.Address;
            const Type = populatedOrder.Type;
            const food = populatedOrder.Foods.map((item) => {
              if (item.food !== undefined) {
                return {
                  FoodName: item.food.FoodName,
                  Category: item.food.Category,
                  image: item.food.FoodImage,
                  quantity: item.Quantity,
                  price: item.food.Price,
                  PaymentMethod: populatedOrder.paymentMethod,
                };
              } else if (item.offer !== undefined) {
                return {
                  FoodName: item.offer.OfferName,
                  Category: item.offer.Category,
                  image: item.offer.OfferImage,
                  quantity: item.Quantity,
                  price: item.offer.SpecialPrice,
                  PaymentMethod: populatedOrder.paymentMethod,
                };
              }
            });
            OrderDetails = {
              OrderId: order.id,
              customerName: Name,
              OrderType:Type,
              customerEmail: Email,
              ContactNumber: ContactNumber,
              CustomerAddress: CustomerAddress,
              food,
              TotalPrice: populatedOrder.TotalPrice,
              Status: populatedOrder.Status,
              Date: order.Date,
            };
            pendingOrders.push(OrderDetails);
          } catch (err) {
            console.error(err);
            return res.status(500).send("Server Error");
          }
        }
      }

      res.status(200).json({
        status: "Success",
        message: "Pending Order Details",
        data: {
          pendingOrders,
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
// End Point : "api/v1/Order/:id";
// Description : View Order
export const ViewOrder = async (req, res) => {
  try {
    const user = req.user;
    if (
      user.Role === "Staff-Member" ||
      user.Role === "Deliverer" ||
      user.Role === "Customer"
    ) {
      const { id } = req.params;
      let pendingOrders = [];
      let OrderDetails;
      try {
        const populatedOrder = await Order.findById(id)
          .populate({
            path: "Customer",
            model: "Customer",
          })
          .populate({
            path: "Foods.food",
            model: "Foods",
          })
          .populate({
            path: "Foods.offer",
            model: "Offers",
          })
          .exec();
        console.log(populatedOrder);
        const Name = populatedOrder.Customer.Name;
        const Email = populatedOrder.Customer.Email;
        const ContactNumber = populatedOrder.Customer.ContactNumber;
        const Address = populatedOrder.Customer.Address;
        const OrderType = populatedOrder.Type
        const lat = populatedOrder.Customer.lat;
        const lang = populatedOrder.Customer.lang;
        const food = populatedOrder.Foods.map((item) => {
          if (item.food !== undefined) {
            return {
              FoodName: item.food.FoodName,
              Category: item.food.Category,
              Foodid: item.food.id,
              image: item.food.FoodImage,
              quantity: item.Quantity,
              price: item.food.Price,
              PaymentMethod: populatedOrder.paymentMethod,
            };
          } else if (item.offer !== undefined) {
            return {
              FoodName: item.offer.OfferName,
              Category: item.offer.Category,
              Offerid: item.offer.id,
              image: item.offer.OfferImage,
              quantity: item.Quantity,
              price: item.offer.SpecialPrice,
              PaymentMethod: populatedOrder.paymentMethod,
            };
          }
        });
        OrderDetails = {
          OrderId: id,
          customerName: Name,
          customerEmail: Email,
          ContactNumber: ContactNumber,
          Address: Address,
          OrderType:OrderType,
          lat: lat,
          lang: lang,
          food,
          TotalPrice: populatedOrder.TotalPrice,
        };
        pendingOrders.push(OrderDetails);
        res.status(200).json({
          status: "Success",
          message: `Details of Order ${id}`,
          data: {
            pendingOrders,
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
// Updated : Praveen
// Method : GET
// End Point : "api/v1/OrderFoods/:id";
// Description : View Specific Order-foods
export const ViewOrderFoods = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Customer" || user.Role === "Deliverer") {
      const { id } = req.params;
      try {
        const populatedOrder = await Order.findById(id)
          .populate({
            path: "Customer",
            model: "Customer",
          })
          .populate({
            path: "Foods.food",
            model: "Foods",
          })
          .populate({
            path: "Foods.offer",
            model: "Offers",
          })
          .exec();
        console.log(populatedOrder);
        const Name = populatedOrder.Customer.Name;
        const Email = populatedOrder.Customer.Email;
        const ContactNumber = populatedOrder.Customer.ContactNumber;
        const Address = populatedOrder.Customer.Address;
        const lat = populatedOrder.Customer.lat;
        const lang = populatedOrder.Customer.lang;
        const PaymentMethod = populatedOrder.paymentMethod;
        const food = populatedOrder.Foods.map((item) => {
          if (item.food !== undefined) {
            return {
              FoodName: item.food.FoodName,
              Category: item.food.Category,
              Foodid: item.food.id,
              image: item.food.FoodImage,
              quantity: item.Quantity,
              price: item.food.Price,
              PaymentMethod: populatedOrder.paymentMethod,
            };
          } else if (item.offer !== undefined) {
            return {
              FoodName: item.offer.OfferName,
              Category: item.offer.Category,
              Offerid: item.offer.id,
              image: item.offer.OfferImage,
              quantity: item.Quantity,
              price: item.offer.SpecialPrice,
              PaymentMethod: populatedOrder.paymentMethod,
            };
          }
        });
        res.status(200).json({
          status: "Success",
          message: `Foods of Order ${id}`,
          OrderId: id,
          customerName: Name,
          customerEmail: Email,
          ContactNumber: ContactNumber,
          Address: Address,
          lat: lat,
          lang: lang,
          TotalPrice: populatedOrder.TotalPrice,
          PaymentMethod: PaymentMethod,
          data: {
            food,
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

// Method : POST
// End Point : "api/v1/OrderConfirmation/:id";
// Description : Confirm Order
export const SendOrderConfrimation = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const { _id } = req.params;
      const {
        customerName,
        Address,
        Email,
        ContactNo,
        Items,
        paymentMethod,
        totalPrice,
        customerEmail,
      } = req.body;
      const findOrder = await Order.findById(_id);
      const Type = findOrder.Type;
      if (findOrder !== null) {
        const session = await mongoose.startSession();
        try {
          session.startTransaction();
          if(findOrder.Type === "Online Order"){
            const findDeliverer = await ServiceProviders.findOne({
              Email: Email,
            }).populate("Email");
            console.log(findDeliverer);
            const UpdateOrder = await Order.findByIdAndUpdate(
              findOrder.id,
              { ServiceProvider: findDeliverer.id, Status: "Confirm" },
              { new: true, runValidators: true }
            ).session(session);
            const updateDeliverer = await ServiceProviders.findByIdAndUpdate(
              findDeliverer.id,
              { Order: findOrder.id },
              { new: true, runValidators: true }
            ).session(session);
            await session.commitTransaction();
            session.endSession();
            if(updateDeliverer && UpdateOrder){
              var message = {
                source: "ShoutDEMO",
                destinations: [updateDeliverer.ContactNumber],
                content: {
                  sms: `You have to deliver a new order please check order details through the Resto app🍽️🍔♨️`,
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
            const data = {
              id: _id,
              Type:Type,
              customerName: customerName,
              customerAddress: Address,
              customerPhone: ContactNo,
              delivererName: findDeliverer.Name,
              delivererPhone: findDeliverer.ContactNumber,
              delivererEmail: findDeliverer.Email,
              orderedItems: Items,
              paymentMethod: paymentMethod,
              totalPrice: totalPrice,
            };
            const mailOption = {
              from: "resto6430@gmail.com",
              to: customerEmail,
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
              `${__dirname}/Template/OrderConfirmationEmail.ejs`,
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
          }
          else{
            const UpdateOrder = await Order.findByIdAndUpdate(
              findOrder.id,
              {Status: "Confirm" },
              { new: true, runValidators: true }
            ).session(session);
            await session.commitTransaction();
            session.endSession();
            const data = {
              id: _id,
              customerName: customerName,
              customerAddress: Address,
              customerPhone: ContactNo,
              Type:Type,
              orderedItems: Items,
              paymentMethod: paymentMethod,
              totalPrice: totalPrice,
            };
            const mailOption = {
              from: "resto6430@gmail.com",
              to: customerEmail,
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
              `${__dirname}/Template/OrderConfirmationEmail.ejs`,
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
          }
        } catch (error) {
          res.status(401).json({
            status: "Error",
            message: error.message,
          });
        }
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
// End Point : "api/v1/Deliverer/OrderDetails";
// Description : Get Orders that deliverer have to deliver
export const CheckOrderDetails = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Deliverer") {
      const findOrder = await Order.find();
      const deliverer = await ServiceProviders.findById(user.id);
      let pendingOrders = [];
      for (const order of findOrder) {
        if (order.Type !== "Outlet Order") {
          if (
            order.Status === "Confirm" &&
            order.DeliveryStatus !== "Delivered"
          ) {
            let OrderDetails;
            try {
              const populatedOrder = await Order.findById(order.id)
                .populate({
                  path: "Customer",
                  model: "Customer",
                })
                .populate({
                  path: "Foods.food",
                  model: "Foods",
                })
                .populate({
                  path: "Foods.offer",
                  model: "Offers",
                })
                .populate({
                  path: "ServiceProvider",
                  model: "ServiceProvider",
                })
                .exec();
              console.log(populatedOrder);
              if (populatedOrder.ServiceProvider.id === deliverer.id) {
                const Name = populatedOrder.Customer.Name;
                const Email = populatedOrder.Customer.Email;
                const ContactNumber = populatedOrder.Customer.ContactNumber;
                const food = populatedOrder.Foods.map((item) => {
                  if (item.food !== undefined) {
                    return {
                      FoodName: item.food.FoodName,
                      Category: item.food.Category,
                      Foodid: item.food.id,
                      image: item.food.FoodImage,
                      quantity: item.Quantity,
                      price: item.food.Price,
                      PaymentMethod: populatedOrder.paymentMethod,
                    };
                  } else if (item.offer !== undefined) {
                    return {
                      FoodName: item.offer.OfferName,
                      Category: item.offer.Category,
                      Offerid: item.offer.id,
                      image: item.offer.OfferImage,
                      quantity: item.Quantity,
                      price: item.offer.SpecialPrice,
                      PaymentMethod: populatedOrder.paymentMethod,
                    };
                  }
                });
                OrderDetails = {
                  OrderId: order.id,
                  customerName: Name,
                  customerEmail: Email,
                  ContactNumber: ContactNumber,
                  food,
                  TotalPrice: populatedOrder.TotalPrice,
                };
                pendingOrders.push(OrderDetails);
              }
            } catch (err) {
              console.error(err);
              return res.status(500).send("Server Error");
            }
          }
        }
      }
      res.status(201).json({
        status: "success",
        message: "Received Orders",
        data: {
          pendingOrders,
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

//Updated: Praveen
// Method : GET
// End Point : "api/v1/Deliverer/AssignOrder";
// Description : Get Orders that deliverer have to deliver
export const CheckDelivererOrderDetails = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Deliverer") {
      const findOrder = await Order.find();
      let AssignedOrderId;
      for (const order of findOrder) {
        if (order.Type !== "Outlet Order") {
          if (
            order.Status === "Confirm" &&
            order.DeliveryStatus !== "Delivered"
          ) {
            console.log(order);
            try {
              AssignedOrderId = order.id;
            } catch (err) {
              console.error(err);
              return res.status(500).send("Server Error");
            }
          }
        }
      }
      res.status(201).json({
        status: "success",
        message: "Received Orders",
        yourOrderId: AssignedOrderId,
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

// Method : POST
// End Point : "api/v1/Deliverer/ConfirmDelivery";
// Description : Confirm Delivery
export const confirmDelivery = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Deliverer") {
      const { _id } = req.params;
      const findOrder = await Order.findById(_id);
      if (findOrder !== null) {
        const session = await mongoose.startSession();
        try {
          session.startTransaction();
          const findDeliverer = await ServiceProviders.findOne({
            Email: user.Email,
          }).populate("Email");
          const UpdateOrder = await Order.findByIdAndUpdate(
            findOrder.id,
            { ServiceProvider: findDeliverer.id, DeliveryStatus: "Delivered" },
            { new: true, runValidators: true }
          ).session(session);
          const updateDeliverer = await ServiceProviders.findByIdAndUpdate(
            findDeliverer.id,
            { Order: null },
            { new: true, runValidators: true }
          ).session(session);
          await session.commitTransaction();
          session.endSession();
        } catch (error) {
          res.status(401).json({
            status: "Error",
            message: error.message,
          });
        }
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
// End Point : "api/v1/Customer/Orders";
// Description :Orders Ordered By Customer
export const viewOrdersOrderedByCustomer = async (req, res) => {
  const user = req.user;
  try {
    if (user.Role === "Customer") {
      const orders = await Order.find();
      const customer = await Customer.findOne({ Email: user.Email }).populate(
        "Email"
      );
      let customerorders = [];
      let OrderDetails;
      for (const order of orders) {
        try {
          const populatedOrder = await Order.findById(order.id)
            .populate({
              path: "Customer",
              model: "Customer",
            })
            .populate({
              path: "Foods.food",
              model: "Foods",
            })
            .populate({
              path: "Foods.offer",
              model: "Offers",
            })
            .populate({
              path: "ServiceProvider",
              model: "ServiceProvider",
            })
            .exec();
          if (populatedOrder.Customer.id === customer.id) {
            const status = populatedOrder.Status;
            const deliveryStatus = populatedOrder.DeliveryStatus;
            const Address = customer.Address;
            const CustomerName = customer.Name;
            const food = populatedOrder.Foods.map((item) => {
              if (item.food !== undefined) {
                return {
                  FoodName: item.food.FoodName,
                  Category: item.food.Category,
                  Foodid: item.food.id,
                  image: item.food.FoodImage,
                  quantity: item.Quantity,
                  price: item.food.Price,
                  PaymentMethod: populatedOrder.paymentMethod,
                };
              } else if (item.offer !== undefined) {
                return {
                  FoodName: item.offer.OfferName,
                  Category: item.offer.Category,
                  Offerid: item.offer.id,
                  image: item.offer.OfferImage,
                  quantity: item.Quantity,
                  price: item.offer.SpecialPrice,
                  PaymentMethod: populatedOrder.paymentMethod,
                };
              }
            });
            OrderDetails = {
              OrderId: order.id,
              Status: status,
              Address:Address,
              Name:CustomerName,
              DeliveryStatus: deliveryStatus,
              food,
              TotalPrice: populatedOrder.TotalPrice,
            };
            customerorders.push(OrderDetails);
          }
        } catch (err) {
          console.error(err);
          return res.status(500).send("Server Error");
        }
      }
      res.status(201).json({
        status: "success",
        message: "My Orders",
        data: {
          customerorders,
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

// Method : DELETE
// End Point : "api/v1/Customer/Orders/:id";
// Description :Cancle Order
export const CancelOrder = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role == "Customer") {
      const {id}  = req.params;
      console.log(req.body);
      const order = await Order.findById(id);
      if (order.Status !== "Confirm") {
        const remove = await Order.findByIdAndRemove(id);
        if (remove) {
          res.status(200).json({
            status: "Success",
            message: "Order Cancled Successfully",
            data: {
              remove,
            },
          });
        } else {
          res.status(400).json({
            status: "Error",
            message: "Something Went Wrong",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
