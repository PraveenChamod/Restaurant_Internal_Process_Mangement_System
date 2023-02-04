import './App.css';
import {Routes, Route} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import {Cart} from './Pages/Customer/Cart'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPg from './Pages/Login';

import { useEffect } from 'react';
import ScrollToTop from './Hooks/ScrollToTop';
import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import AddUser from './Pages/Admin/AddUser';
import ViewUsers from './Pages/Admin/ViewUsers';
import ViewUser from './Pages/Admin/ViewUser';
import AdminUserProfile from './Pages/Admin/UserProfile';
import ManagerDashBoard from './Pages/Manager/ManagerDashBoard';
import AddOutletStaff from './Pages/Manager/AddUser';
import ViewStaff from './Pages/Manager/ViewUsers';
import ViewStaffMember from './Pages/Manager/ViewUser';
import ManagerUserProfile from './Pages/Manager/UserProfile';
import ReportGeneration from './Pages/Manager/ReportGeneration';
import ReportPreview from './Pages/Manager/ReportPreview';
import StaffMemberDashBoard from './Pages/Staff-Member/StaffMemberDashBoard';
import AddStockItem from './Pages/Manager/AddStockItem';
import ViewStock from './Pages/Manager/ViewStock';
import ViewItem from './Pages/Manager/ViewItem';
import StaffMemberUserProfile from './Pages/Staff-Member/UserProfile';
import AddOffers from './Pages/Staff-Member/AddOffers';
import OrderDetails from './Pages/Staff-Member/OrderDetails';
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
import FrogotPassword from './Pages/FrogotPassword';
import PasswordReset from './Pages/PasswordReset';
import { Cards, Roles } from './Data/DashBoardLinks';
import PlaceOrder from './Pages/Staff-Member/PlaceOrder';
import AddTables from './Pages/SharedOnes/AddTable';
import ViewTables from './Pages/SharedOnes/ViewTables';
import ViewTable from './Pages/SharedOnes/ViewTable';
import AddFoods from './Pages/SharedOnes/AddFoods';
import ViewFood from './Pages/SharedOnes/ViewFood';
import ViewOffers from './Pages/SharedOnes/ViewOffers';
import ViewOffer from './Pages/SharedOnes/ViewOffer';
import ViewFoods from './Pages/SharedOnes/ViewFoods';
import "aos/dist/aos.css";
import Aos from 'aos';
import { MenuItems } from './Data/Menu';
function App() {
  useEffect(() => {
    Aos.init({duration:1000});
  }, [])
  const scrollToTop = ()=>{
    if(window.pageYOffset > 200){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}
  return (
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
          <Route path="/Admin/View-Users" element={<ViewUsers/>}/>
          <Route path="/Admin/View-User" element={<ViewUser/>}/>
          <Route path="/Admin/My-Profile" element={<AdminUserProfile/>}/>
          <Route path="/Admin/Add-Table" element={<AddTables/>}/>
          <Route path="/Admin/View-Tables" element={<ViewTables/>}/>
          <Route path="/Admin/View-Table" element={<ViewTable/>}/>
          <Route path="/Admin/Add-Foods" element={<AddFoods/>}/>
          <Route path="/Admin/View-Foods" element={<ViewFoods/>}/>
          <Route path="/Admin/View-Food" element={<ViewFood/>}/>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Manager ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
          
          <Route path="/Manager/DashBoard" element={<ManagerDashBoard/>}/>
          <Route path="/Manager/Add-User" element={<AddOutletStaff/>}/>
          <Route path="/Manager/View-Users" element={<ViewStaff/>}/>
          <Route path="/Manager/View-User" element={<ViewStaffMember/>}/>
          <Route path="/Manager/My-Profile" element={<ManagerUserProfile/>}/>
          <Route path="/Manager/Report-Generation" element={<ReportGeneration/>}/>
          <Route path="/Manager/ReportPreview" element={<ReportPreview/>}/>
          <Route path="/Manager/AddStcok" element={<AddStockItem/>}/>
          <Route path="/Manager/ViewStock" element={<ViewStock/>}/>
          <Route path="/Manager/ViewItem" element={<ViewItem/>}/>
          <Route path="/Manager/Add-Table" element={<AddTables/>}/>
          <Route path="/Manager/View-Tables" element={<ViewTables/>}/>
          <Route path="/Manager/View-Table" element={<ViewTables/>}/>
          <Route path="/Manager/Add-Foods" element={<AddFoods/>}/>
          <Route path="/Manager/View-Foods" element={<ViewFoods/>}/>
          <Route path="/Manager/View-Food" element={<ViewFood/>}/>
          <Route path="/Staff-Member/View-Offers" element={<ViewOffers/>}/>
          <Route path="/Staff-Member/View-Offer" element={<ViewOffer/>}/>

        {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Staff-Member ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
          
          <Route path="/Staff-Member/DashBoard" element={<StaffMemberDashBoard/>}/>
          <Route path="/Staff-Member/Add-Offers" element={<AddOffers/>}/>
          <Route path="/Staff-Member/View-Offers" element={<ViewOffers/>}/>
          <Route path="/Staff-Member/View-Offer" element={<ViewOffer/>}/>
          <Route path="/Staff-Member/View-Foods" element={<ViewFoods/>}/>
          <Route path="/Staff-Member/View-Tables" element={<ViewTables/>}/>
          <Route path="/Staff-Member/Order-Details" element={<OrderDetails/>}/>
          <Route path="/Staff-Member/Table-Reservation-Details" element={<TableReservationDetails/>}/>
          <Route path="/Staff-Member/My-Profile" element={<StaffMemberUserProfile/>}/>
          <Route path="/Staff-Member/Place-Order" element={<PlaceOrder/>}/>

          
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
  );
}

export default App;
