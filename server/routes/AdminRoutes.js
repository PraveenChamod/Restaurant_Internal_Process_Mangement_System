
import express from "express";
import { deleteUser, deleteUsers, getUserById, getUsers, getUserByEmail, getUsersByRole, updateUserByEmail, RegisterServiceProviders } from "../controllers/AdminController.js";

const AdminRoutes = express.Router();

//Get All Users
AdminRoutes.route('/GetUsers').get(getUsers);

//Get User By Email
AdminRoutes.route('/GetUserByEmail').get(getUserByEmail);

//Get User By ID
AdminRoutes.route('/GetUserById/:id').get(getUserById);

//Update User By Email
AdminRoutes.route('/UpdateUser/:Email').patch(updateUserByEmail);

//Delete User By Email
AdminRoutes.route('/DeleteUser/:Email').delete(deleteUser);

//Delete all Users 
AdminRoutes.route('/DeleteUsers').delete(deleteUsers);


AdminRoutes.route('/getUsersByRole').get(getUsersByRole);

//Register ServiceProviders
AdminRoutes.route('/RegisterServiceProvider').post(RegisterServiceProviders);

export default AdminRoutes;