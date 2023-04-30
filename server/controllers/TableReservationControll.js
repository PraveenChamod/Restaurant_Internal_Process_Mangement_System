import mongoose from "mongoose";
import Customer from "../models/Customer.js";
import TableReservation from "../models/TableReservation.js";
import Table from "../models/Tables.js";
import { transporter } from "../util/NotificationUtil.js";
import path from "path";
import ejs from "ejs";

const __dirname = path
  .dirname(path.dirname(new URL(import.meta.url).pathname))
  .slice(1);

// Method : POST
// End Point : "api/v1/TableReservation";
// Description : Reserve Table
export const ReserveTable = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Customer") {
      const logedCustomer = await Customer.findOne({
        Email: user.Email,
      }).populate("Email");
      const session = await mongoose.startSession();
      // console.log(session);
      try {
        session.startTransaction();
        req.body.TableNo.forEach(async (table) => {
          const findTable = await Table.findOne({ TableNo: table }).populate(
            "TableNo"
          );
          const updateTable = await Table.findByIdAndUpdate(
            findTable._id,
            { Status: "Reserved" },
            { new: true, runValidators: true }
          ).session(session);
        });
        const newReservation = await TableReservation.create([req.body], {
          session,
        });
        const commit = await session.commitTransaction();
        session.endSession();

        res.status(201).json({
          status: "success",
          message: "Reservation is successfull",
          data: {
            newReservation,
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

// Method : GET
// End Point : "api/v1/PendingReservations";
// Description : View Reservation
export const ViewPendingReservations = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const findReservations = await TableReservation.find();
      let pendingReservations = [];
      for (const reservation of findReservations) {
        let ReservationDetails;
        console.log(reservation);
        if (reservation.Status === "Pending") {
          try {
            const populatedReservation = await TableReservation.findById(
              reservation.id
            )
              .populate({
                path: "Customer",
                model: "Customer",
              })
              .populate({
                path: "Tables.table",
                model: "Table",
              })
              .exec();
            const Name = populatedReservation.Customer.Name;
            const ContactNo = populatedReservation.Customer.ContactNumber;
            const Tables = populatedReservation.Tables.map((table) => ({
              TableNo: table.table.TableNo,
            }));
            ReservationDetails = {
              CustomerName: Name,
              CustomerContactNo: ContactNo,
              Type: populatedReservation.Type,
              Tables,
              ArrivalTime: populatedReservation.ArrivalTime,
              DepartureTime: populatedReservation.DepartureTime,
              Date: populatedReservation.Date,
              id: populatedReservation.id,
            };
            pendingReservations.push(ReservationDetails);
          } catch (error) {
            return res.status(500).send({
              status: "Server Error",
              message: error.message,
            });
          }
        }
      }
      res.status(201).json({
        status: "success",
        message: "Details of Pending Reservations",
        data: {
          pendingReservations,
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
// End Point : "api/v1/Reservation/:_id";
// Description : View Order
export const ViewReservation = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const { _id } = req.params;
      let ReservationDetails;
      try {
        const populatedReservation = await TableReservation.findById(_id)
          .populate({
            path: "Customer",
            model: "Customer",
          })
          .populate({
            path: "Tables.table",
            model: "Table",
          })
          .exec();
        const Name = populatedReservation.Customer.Name;
        const ContactNo = populatedReservation.Customer.ContactNumber;
        const Email = populatedReservation.Customer.Email;
        const Tables = populatedReservation.Tables.map((table) => ({
          TableNo: table.table.TableNo,
        }));
        ReservationDetails = {
          CustomerName: Name,
          CustomerContactNo: ContactNo,
          Email: Email,
          Tables,
          Type: populatedReservation.Type,
          ArrivalTime: populatedReservation.ArrivalTime,
          DepartureTime: populatedReservation.DepartureTime,
          Date: populatedReservation.Date,
          id: populatedReservation.id,
          Amount: populatedReservation.amount,
        };
        res.status(200).json({
          status: "Success",
          message: `Details of Reservation ${_id}`,
          data: {
            ReservationDetails,
          },
        });
      } catch (error) {
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
// End Point : "api/v1/ReservationConfirmation/:_id";
// Description : Confirm Reservation
export const SendReservationConfirmation = async (req, res) => {
  try {
    const user = req.user;
    if (user.Role === "Staff-Member") {
      const { _id } = req.params;
      const {
        customerName,
        ContactNo,
        Tables,
        totalPrice,
        customerEmail,
        arrivalTime,
        depatureTime,
        type,
        bookedDate,
      } = req.body;
      const findReservation = await TableReservation.findById(_id);
      console.log(req.body);
      // const findTable = await Table.findById(findReservation.Table);
      if (findReservation !== null) {
        const session = await mongoose.startSession();
        try {
          session.startTransaction();
          const UpdateReservation = await TableReservation.findByIdAndUpdate(
            findReservation.id,
            { Status: "Confirm" },
            { new: true, runValidators: true }
          ).session(session);
          await session.commitTransaction();
          session.endSession();
          const data = {
            id: _id,
            customerName: customerName,
            customerPhone: ContactNo,
            customerEmail: customerEmail,
            reservedTables: Tables,
            totalPrice: totalPrice,
            depatureTime: depatureTime,
            arrivalTime: arrivalTime,
            bookedDate: bookedDate,
            type: type,
          };
          const mailOption = {
            from: "resto6430@gmail.com",
            to: customerEmail,
            subject: "Table Reservation Confrimation",
            attachments: [
              {
                filename: "logo.png",
                path: `${__dirname}/Template/logo.png`,
                cid: "logo",
              },
            ],
          };
          ejs.renderFile(
            `${__dirname}/Template/ReservationConfirmation.ejs`,
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
            message: "Table Reservation is Confirmed",
            data: {
              UpdateReservation,
            },
          });
        } catch (error) {
          res.status(401).json({
            status: "Error",
            message: error.message,
          });
        }
      } else {
        res.status(404).json({
          status: "Not Found",
          message: "There are no any reservation available related to given id",
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
