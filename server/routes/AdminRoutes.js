
import express from "express";
import { deleteUser, deleteUsers, getUsers, getUserByEmail, getUsersByRole, updateUserByEmail, RegisterServiceProviders } from "../controllers/AdminController.js";

const AdminRoutes = express.Router();

//Get All Users
AdminRoutes.route('/GetUsers').get(getUsers);

//Get User By Email
AdminRoutes.route('/GetUserByEmail').get(getUserByEmail);

//Update User By Email
AdminRoutes.route('/UpdateUser/:Email').patch(updateUserByEmail);

//Delete User By Email
AdminRoutes.route('/DeleteUser/:Email').delete(deleteUser);

//Delete all Users 
AdminRoutes.route('/DeleteUsers').delete(deleteUsers);

//Get Users By Role
AdminRoutes.route('/getUsersByRole').get(getUsersByRole);

//Register ServiceProviders
AdminRoutes.route('/RegisterServiceProvider').post(RegisterServiceProviders);


export default AdminRoutes;