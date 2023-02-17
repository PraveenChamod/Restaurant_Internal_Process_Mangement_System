import './App.css';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import {Cart} from './Pages/Customer/Cart'
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
import AdminViewTable from './Pages/Admin/AdminViewTable';
import AdminAddFoods from './Pages/Admin/AddFoods';
import AdminViewFoods from './Pages/Admin/AdimnViewFoods';
import AdminViewFood from './Pages/Admin/AdminViewFood';
import ManagerViewUser from './Pages/Manager/ManagerViewUser';
import ManagerAddTables from './Pages/Manager/ManagerAddTable';
import ManagerViewTables from './Pages/Manager/ManagerViewTables';
import ManagerViewTable from './Pages/Manager/ManagerViewTable';
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
          
          <Route path="/Admin/DashBoard" element={<AdminDashBoard Navs = {Roles[0]} Card = {Cards[0]}/>} />
          <Route path="/Admin/Add-User" element={<AddUser/>}/>
          <Route path="/Admin/View-User" element={<ViewUser/>}/>
          <Route path="/Admin/My-Profile" element={<AdminUserProfile/>}/>
          <Route path="/Admin/Add-Table" element={<AddTables/>}/>
          <Route path="/Admin/View-Tables" element={<ViewTables Tables={TableColumns[1]}/>}/>
          <Route path="/Admin/View-Table" element={<ViewTable View = {ViewThings[2]}/>}/>
          <Route path="/Admin/Add-Foods" element={<AddFoods/>}/>
          <Route path="/Admin/View-Foods" element={<ViewFoods Tables={TableColumns[0]}/>}/>
          <Route path="/Admin/View-Food" element={<ViewFood View = {ViewThings[0]}/>}/>

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Staff-Member ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                
                <Route path="/Staff-Member/DashBoard" element={<StaffMemberDashBoard Navs = {Roles[1]}/>}/>
                <Route path="/Staff-Member/Add-Offers" element={<StaffMemberAddOffers/>}/>
                <Route path="/Staff-Member/View-Offers" element={<StaffMemberViewOffers Tables={TableColumns[5]}/>}/>
                <Route path="/Staff-Member/View-Offer" element={<StaffMemberViewOffer View = {ViewThings[1]}/>}/>
                <Route path="/Staff-Member/View-Foods" element={<StaffMemberViewFoods Tables={TableColumns[0]}/>}/>
                <Route path="/Staff-Member/View-Tables" element={<StaffMemberViewTables Tables={TableColumns[1]}/>}/>
                <Route path="/Staff-Member/Order-Details" element={<StaffMemberOrderDetails/>}/>
                <Route path="/Staff-Member/Table-Reservation-Details" element={<StaffMemberTableReservationDetails/>}/>
                <Route path="/Staff-Member/My-Profile" element={<StaffMemberUserProfile/>}/>
                <Route path="/Staff-Member/Place-Order" element={<StaffMemberPlaceOrder/>}/>

                
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Customer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/Customer/DashBoard" element={<CustomerDashBoard/>}/>
                <Route path="/Customer/My-Profile" element={<CustomerUserProfile/>}/>     
                <Route path="/Customer/Place-Order" element={<Order/>}/>     
                <Route path="/Customer/My-Cart" element={<Cart/>}/>     
                <Route path="/Customer/My-Orders" element={<MyOrders/>}/>   
                <Route path="/Customer/Table-Reservation" element={<TableReservationDetails/>}/>     
                <Route path="/Customer/Add-Review" element={<AddReview/>}/>     
                <Route path="/Customer/Delivery-Tracking" element={<DeliveryTracking/>}/>     

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Deliverer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/Deliverer/DashBoard" element={<DelivererDashBoard/>}/>
                <Route path="/Deliverer/My-Profile" element={<DelivererUserProfile/>}/>     
                <Route path="/Deliverer/Place-Order" element={<DeliveryOrderDetails/>}/>     
              
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Supplier ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/Supplier/DashBoard" element={<SupplierDashBoard/>}/>
                <Route path="/Supplier/My-Profile" element={<SupplierUserProfile/>}/>     
                <Route path="/Supplier/Messages" element={<Messages/>}/> 
                
            </Routes>
            <Footer/>
          </div>
          </Fragment>
      </AuthState>
    </div>
  );
}

export default App;
