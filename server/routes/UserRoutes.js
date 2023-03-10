import express from 'express';
import { deleteUser, deleteUsers, getAvailableDeliverers, getUserByEmail, getUsers, getUsersByRole, RegisterCustomer, RegisterServiceProviders, UpdateProfile, updateUserProfile } from '../controllers/UserController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';


const UserRoutes = express.Router();

UserRoutes.route('/User/CustomerRegister').post(RegisterCustomer);
UserRoutes.route('/User/ServiceProviderRegister').post(requireAuth,RegisterServiceProviders);
UserRoutes.route('/User/Users').get(requireAuth,getUsers);
UserRoutes.route('/User').get(requireAuth,getUserByEmail);
UserRoutes.route('/Users/:Role').get(requireAuth,getUsersByRole);
UserRoutes.route('/User/:Email').patch(requireAuth,updateUserProfile);
UserRoutes.route('/User/:Email').delete(requireAuth,deleteUser);
UserRoutes.route('/Users').delete(requireAuth,deleteUsers);
UserRoutes.route('/AvailableDeliverers').get(requireAuth,getAvailableDeliverers);
UserRoutes.route('/User/Profile/:Email').patch(requireAuth,UpdateProfile);

export default UserRoutes;