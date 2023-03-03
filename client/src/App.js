import './App.css';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPg from './Pages/Login';
import { Fragment, useEffect } from 'react';
import ScrollToTop from './Hooks/ScrollToTop';
import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import AdminUserProfile from './Pages/Admin/UserProfile';
import ManagerDashBoard from './Pages/Manager/ManagerDashBoard';
import AddOutletStaff from './Pages/Manager/AddUser';
import ManagerUserProfile from './Pages/Manager/UserProfile';
import ReportGeneration from './Pages/Manager/ReportGeneration';
import ReportPreview from './Pages/Manager/ReportPreview';
import StaffMemberDashBoard from './Pages/Staff-Member/StaffMemberDashBoard';
import AddStockItem from './Pages/Manager/AddStockItem';
import ViewStock from './Pages/Manager/ViewStock';
import ViewItem from './Pages/Manager/ViewItem';
import StaffMemberUserProfile from './Pages/Staff-Member/UserProfile';
import AddOffers from './Pages/Manager/AddOffers';
import TableReservationDetails from './Pages/Staff-Member/TableReservationDetails';
import CustomerDashBoard from './Pages/Customer/CustomerDashBoard';
import CustomerUserProfile from './Pages/Customer/UserProfile';
import Cart from './Pages/Customer/Cart';
import Order from './Pages/Customer/Order';
import MyOrders from './Pages/Customer/MyOrders';
import AddReview from './Pages/Customer/Review';
import DeliveryTracking from './Pages/Customer/DeliveryTracking';
import DelivererDashBoard from './Pages/Deliverer/DelivererDashBoard';
import DelivererUserProfile from './Pages/Deliverer/UserProfile';
import DeliveryOrderDetails from './Pages/Deliverer/OrderDetails';
import SupplierDashBoard from './Pages/Supplier/SupplierDashBoard';
import SupplierUserProfile from './Pages/Supplier/UserProfile';
import Messages from './Pages/Supplier/Messages';
import PasswordReset from './Pages/PasswordReset';
import { Cards, Roles } from './Data/DashBoardLinks';
import "aos/dist/aos.css";
import Aos from 'aos';
import { MenuItems } from './Data/Menu';
import { TableColumns, ViewThings } from './Data/Content';
import AuthState from './Context/Auth/AuthState';
// import RequireAuth from './components/Routing/RequireAuth';
import AdminAddUser from './Pages/Admin/AddUser';
import AdminViewUser from './Pages/Admin/AdminViewUser';
import AdminAddTables from './Pages/Admin/AdminAddTable';
import AdminViewTables from './Pages/Admin/AdminViewTables';
import AdminAddFoods from './Pages/Admin/AddFoods';
import AdminViewFoods from './Pages/Admin/AdimnViewFoods';
import AdminViewFood from './Pages/Admin/AdminViewFood';
import ManagerViewUser from './Pages/Manager/ManagerViewUser';
import ManagerAddTables from './Pages/Manager/ManagerAddTable';
import ManagerViewTables from './Pages/Manager/ManagerViewTables';
import ManagerAddFoods from './Pages/Manager/AddFoods';
import ManagerViewFoods from './Pages/Manager/ManagerViewFoods';
import ManagerViewFood from './Pages/Manager/ManagerViewFood';
import ManagerViewOffers from './Pages/Manager/ViewOffers';
import ManagerViewOffer from './Pages/Manager/ViewOffer';
import StaffMemberAddOffers from './Pages/Staff-Member/AddOffers';
import StaffMemberViewOffers from './Pages/Staff-Member/ViewOffers';
import StaffMemberViewOffer from './Pages/Staff-Member/ViewOffer';
import StaffMemberViewFoods from './Pages/Staff-Member/StaffMemberViewFoods';
import StaffMemberViewTables from './Pages/Staff-Member/StaffMemberViewTables';
import StaffMemberOrderDetails from './Pages/Staff-Member/OrderDetails';
import StaffMemberTableReservationDetails from './Pages/Staff-Member/TableReservationDetails';
import StaffMemberPlaceOrder from './Pages/Staff-Member/PlaceOrder';
import FrogotPassword from './Pages/ForgotPassword';
import OrderDetailsComponent from './components/Staff-Member_Components/OrderDetails/OrderDetails';
import CustomerProfile from './components/Customer/CustomerProfile/CustomerProfile';
import UserProfileComponent from './components/shared/UserProfile/UserProfile';
import EditProfileComponent from './components/shared/EditProfile/Editprofile';
import CartData from './Data/CartData';
import AdminEditProfile from './Pages/Admin/AdminEditProfile';
import ManagerEditProfile from './Pages/Manager/ManagerEditProfile';
import StaffMemberEditProfile from './Pages/Staff-Member/StaffMemberEditProfile';
import DelivererEditProfile from './Pages/Deliverer/DelivererEditProfile';
import SupplierEditProfile from './Pages/Supplier/SupplierEditProfile';
import SupplierOrder from './Pages/Manager/SupplierOrder';

function App() {
  useEffect(() => {
    Aos.init({duration:1000});
  }, [])
  const scrollToTop = ()=>{
    if(window.pageYOffset > 200)
    {
      window.scrollTo(
        {
          top: 0, 
          behavior: "smooth",
        }
      );
    }
  }
  
  

  return (
    <div>
      <AuthState>
          <Fragment>
          <div className="App">
            <ScrollToTop/> 
            <Navbar ScrollToTop={scrollToTop}/>
            <Routes>
                <Route path="/" element={<Home ScrollToTop={scrollToTop}/>}/>
                <Route path="/Menu" element={<Menu MenuItems = {MenuItems}/>}/>
                <Route path="/login" element={<LoginPg/>}/>
                <Route path="/FrogotPassword" element={<FrogotPassword/>}/>
                <Route path="/ResetPassword/:token" element={<PasswordReset/>}/>

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Admin ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
              {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
                <Route path="/AdminDashBoard" element={<AdminDashBoard Navs = {Roles[0]} Card = {Cards[0]} ScrollToTop={scrollToTop}/>} />
                <Route path="/AdminAdd-User" element={<AdminAddUser/>}/>
                <Route path="/AdminView-User" element={<AdminViewUser/>}/>
                <Route path="/AdminMy-Profile" element={<AdminUserProfile/>}/>
                <Route path="/AdminEdit-Profile" element={<AdminEditProfile/>}/>
                <Route path="/AdminAdd-Table" element={<AdminAddTables/>}/>
                <Route path="/AdminView-Tables" element={<AdminViewTables/>}/>
                <Route path="/AdminAdd-Foods" element={<AdminAddFoods/>}/>
                <Route path="/AdminView-Foods" element={<AdminViewFoods/>}/>
                <Route path="/AdminView-Food" element={<AdminViewFood/>}/>
              {/* </Route> */}
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Manager ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                
                <Route path="/ManagerDashBoard" element={<ManagerDashBoard Navs = {Roles[1]} Card = {Cards[1]} ScrollToTop={scrollToTop}/>}/>
                <Route path="/ManagerAdd-User" element={<AddOutletStaff/>}/>
                <Route path="/ManagerView-User" element={<ManagerViewUser/>}/>
                <Route path="/ManagerMy-Profile" element={<ManagerUserProfile/>}/>
                <Route path="/ManagerEdit-Profile" element={<ManagerEditProfile/>}/>
                <Route path="/ManagerReport-Generation" element={<ReportGeneration/>}/>
                <Route path="/ManagerReportPreview" element={<ReportPreview/>}/>
                <Route path="/ManagerAddStock" element={<AddStockItem/>}/>
                <Route path="/ManagerViewStock" element={<ViewStock/>}/>
                <Route path="/ManagerViewItem" element={<ViewItem/>}/>
                <Route path="/ManagerAdd-Table" element={<ManagerAddTables/>}/>
                <Route path="/ManagerView-Tables" element={<ManagerViewTables />}/>
                <Route path="/ManagerAdd-Foods" element={<ManagerAddFoods/>}/>
                <Route path="/ManagerAdd-Offers" element={<AddOffers/>}/>
                <Route path="/ManagerView-Foods" element={<ManagerViewFoods />}/>
                <Route path="/ManagerView-Food" element={<ManagerViewFood/>}/>
                <Route path="/ManagerView-Offers" element={<ManagerViewOffers/>}/>
                <Route path="/ManagerView-Offer" element={<ManagerViewOffer/>}/>
                <Route path="/ManagerOrder-supllierorder" element={<SupplierOrder/>}/>

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Staff-Member ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                
                <Route path="/Staff-MemberDashBoard" element={<StaffMemberDashBoard Navs = {Roles[2]} Card = {Cards[2]} ScrollToTop={scrollToTop}/>}/>
                <Route path="/Staff-MemberAdd-Offers" element={<StaffMemberAddOffers/>}/>
                <Route path="/Staff-MemberView-Offers" element={<StaffMemberViewOffers/>}/>
                <Route path="/Staff-MemberView-Offer" element={<StaffMemberViewOffer/>}/>
                <Route path="/Staff-MemberView-Foods" element={<StaffMemberViewFoods />}/>
                <Route path="/Staff-MemberView-Tables" element={<StaffMemberViewTables />}/>
                <Route path="/Staff-MemberOrder-Details" element={<StaffMemberOrderDetails/>}/>
                <Route path="/Staff-MemberTable-Reservation-Details" element={<StaffMemberTableReservationDetails/>}/>
                <Route path="/Staff-MemberMy-Profile" element={<StaffMemberUserProfile/>}/>
                <Route path="/Staff-MemberEdit-Profile" element={<StaffMemberEditProfile/>}/>
                <Route path="/Staff-MemberPlace-Order" element={<StaffMemberPlaceOrder/>}/>

                
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Customer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/CustomerDashBoard" element={<CustomerDashBoard Navs={Roles[5]}/>}/>
                <Route path="/CustomerMy-Profile" element={<CustomerUserProfile/>}/>     
                <Route path="/CustomerPlace-Order" element={<Order/>}/>     
                <Route path="/CustomerMy-Cart" element={<Cart cartData = {CartData}/>}/>     
                {/* <Route path="/CustomerMy-Orders" element={<MyOrders/>}/>    */}
                <Route path="/CustomerTable-Reservation" element={<TableReservationDetails/>}/>     
                <Route path="/CustomerAdd-Review" element={<AddReview/>}/>     
                <Route path="/CustomerDelivery-Tracking" element={<DeliveryTracking/>}/>     

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Deliverer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/DelivererDashBoard" element={<DelivererDashBoard Navs = {Roles[3]} Card = {Cards[3]} ScrollToTop={scrollToTop}/>}/>
                <Route path="/DelivererMy-Profile" element={<DelivererUserProfile />}/>   
                <Route path="/DelivererEdit-Profile" element={<DelivererEditProfile/>}/>  
                <Route path="/DelivererOrderDetails" element={<DeliveryOrderDetails/>}/>   
              
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Supplier ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/SupplierDashBoard" element={<SupplierDashBoard Navs={Roles[4]} Card = {Cards[4]} ScrollToTop={scrollToTop}/>}/>
                <Route path="/SupplierMy-Profile" element={<SupplierUserProfile/>}/>    
                <Route path="/SupplierEdit-Profile" element={<SupplierEditProfile/>}/> 
                <Route path="/SupplierMessages" element={<Messages/>}/> 
            </Routes>
            <Footer/>
          </div>
          </Fragment>
      </AuthState>
    </div>
  );
}

export default App;
