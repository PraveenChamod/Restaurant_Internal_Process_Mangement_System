import express from 'express';
import { deleteUser, deleteUsers, getAvailableDeliverers, getCustomerById, getUserByEmail, getUsers, getUsersByRole, RegisterCustomer, RegisterServiceProviders, ResetPassword, UpdateProfile, updateUserProfile, getSupplierById } from '../controllers/UserController.js';
import { requireAuth } from '../middleware/Authmiddleware.js';


const UserRoutes = express.Router();

UserRoutes.route('/User/CustomerRegister').post(RegisterCustomer);
UserRoutes.route('/User/ServiceProviderRegister').post(requireAuth,RegisterServiceProviders);
UserRoutes.route('User/:id').get(requireAuth,getCustomerById);
UserRoutes.route('/User/Users').get(requireAuth,getUsers);
UserRoutes.route('/User').get(requireAuth,getUserByEmail);
UserRoutes.route('/Users/:Role').get(requireAuth,getUsersByRole);
UserRoutes.route('/User/:Email').patch(requireAuth,updateUserProfile);
UserRoutes.route('/User/:Email').delete(requireAuth,deleteUser);
UserRoutes.route('/Users').delete(requireAuth,deleteUsers);
UserRoutes.route('/AvailableDeliverers').get(requireAuth,getAvailableDeliverers);
UserRoutes.route('/User/Profile/:Email').patch(requireAuth,UpdateProfile);
UserRoutes.route('/User/resetpassword/:Email').patch(ResetPassword)
UserRoutes.route('User-Supplier/:id').get(requireAuth,getSupplierById);
export default UserRoutes;