import './App.css';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom'
import {Home} from './Pages/Home';
import {Menu} from './Pages/Menu'
import LoginPg from './Pages/Login';
import { Fragment, useEffect, useState } from 'react';
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
import { Toaster } from 'react-hot-toast';
import { MenuItems } from './Data/Menu';
import { EditProfileLinks, TableColumns, ViewThings } from './Data/Content';
import AuthState from './Context/Auth/AuthState';
// import RequireAuth from './components/Routing/RequireAuth';
import AdminAddUser from './Pages/Admin/AddUser';
import AdminViewUser from './Pages/Admin/AdminViewUser';
import AdminAddTables from './Pages/Admin/AdminAddTable';
import AdminViewTables from './Pages/Admin/AdminViewTables';
import AdminAddFoods from './Pages/Admin/AddFoods';
import AdminAddCategories from './Pages/Admin/AddCategories';
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
import ManagerAddCategories from './Pages/Manager/AddCategories';
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
import ViewSupplierOrder from './Pages/Manager/ViewSupplierOrder';
import TableReservation from './Pages/Customer/TableReservation';
import ProductDisplay from './components/Customer/Checkout/Pay';
import OrderItems from './Pages/Customer/OrderItems';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StaffMemberPendingOrders from './Pages/Staff-Member/PendingOrders';
import AllOrderDetails from './Pages/Deliverer/AllOrderDetails';
import Map from './Pages/Deliverer/Map';
import BackRoutes, { EditProfileBackRoute } from './Data/BackRotes';
import SideNavbar from './components/Navbar/SideNavBar';
import StaffMemberPendingReservations from './Pages/Staff-Member/PendingReservations';
import ManagerViewTableDetails from './Pages/Manager/ManagerViewTable';
import SupplierItems from './Pages/Supplier/SupplyItems';
import WithoutNavAndFooter from './components/Routing/WithoutNavandFooter';
import WithNavAndFooter from './components/Routing/WithNavandFooter';
import ViewSupplierOrderDetails from './Pages/Manager/ViewSupplierOrderDetails';
import SupplierOrderConform from './Pages/Supplier/SupplierOrderConform';

function App() {
  
  const stripePromise = loadStripe('pk_test_51MbCY3GuiFrtKvgKd8w5qdphJciL87lB1ITs2nFL1FUNQnfIqxPA4hX2A3qrhDd7Gfcsab01gcVNpXlTJs6ArcyF00t5WxYsrg');

  useEffect(() => {
    Aos.init({
      disable: 'mobile',
      duration:1000
    });
  }, [])
  console.log(loadStripe);
  useEffect(() => {
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
  
  const[view,setView] = useState(window.innerWidth >= 800 ? true : false);
  useEffect(()=>{
    const resize = ()=>{
      if(window.innerWidth >= 800){
          setView(true);
      }else{
          setView(false);
      }
    }
    window.addEventListener('resize',resize);
  })
  

  return (
    <div>
      <AuthState>
          <Fragment>
          <div className="App">
          <Toaster
              position="top-center"
              reverseOrder={false}/>
            <ScrollToTop/> 
            
            <Routes>
              <Route element={<WithNavAndFooter ScrollToTop = {scrollToTop}/>}>
                <Route path="/" element={<Home ScrollToTop={scrollToTop}/>}/>
                <Route path="/Menu" element={<Menu MenuItems = {MenuItems} login = '/login'/>}/>
                <Route path="/login" element={<LoginPg ScrollToTop={scrollToTop}/>}/>
                <Route path="/FrogotPassword" element={<FrogotPassword BackRoutes = '/login'/>}/>
                <Route path="/ResetPassword/:Email" element={<PasswordReset/>}/>
              </Route>
              <Route element={<WithoutNavAndFooter ScrollToTop = {scrollToTop}/>}>
                  {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Admin ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
              {/* <Route element={<RequireAuth allowedRoles={['Admin']} />}> */}
                <Route path="/AdminDashBoard" element={<AdminDashBoard Navs = {Roles[0]} Card = {Cards[0]} ScrollToTop={scrollToTop} view={view}/>} />
                <Route path="/AdminAdd-User" element={<AdminAddUser BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminView-User" element={<AdminViewUser BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminMy-Profile" element={<AdminUserProfile route={EditProfileLinks[0]} BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminEdit-Profile" element={<AdminEditProfile EditProfileBackRoute={EditProfileBackRoute[0].nav}/>}/>
                <Route path="/AdminAdd-Table" element={<AdminAddTables BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminView-Tables" element={<AdminViewTables BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminView-Table/:id" element={< ManagerViewTableDetails/>}/>
                <Route path="/AdminAdd-Foods" element={<AdminAddFoods BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminView-Foods" element={<AdminViewFoods BackRoutes={BackRoutes[0].nav}/>}/>
                <Route path="/AdminView-Food/:id" element={<AdminViewFood/>}/>
                <Route path="/AdminAdd-Categories" element={<AdminAddCategories BackRoutes={BackRoutes[0].nav}/>}/>
              {/* </Route> */}
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Manager ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                
                <Route path="/ManagerDashBoard" element={<ManagerDashBoard Navs = {Roles[1]} Card = {Cards[1]} ScrollToTop={scrollToTop}  view={view}/>}/>
                <Route path="/ManagerAdd-User" element={<AddOutletStaff BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-User" element={<ManagerViewUser BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerMy-Profile" element={<ManagerUserProfile route={EditProfileLinks[1]} BackRoutes={BackRoutes[1]}/>}/>
                <Route path="/ManagerEdit-Profile" element={<ManagerEditProfile EditProfileBackRoute={EditProfileBackRoute[1].nav}/>}/>
                <Route path="/ManagerReport-Generation" element={<ReportGeneration BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerReportPreview" element={<ReportPreview/>}/>
                <Route path="/ManagerAddStock" element={<AddStockItem BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerViewStock" element={<ViewStock BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerViewItem/:SerialNo" element={<ViewItem/>}/>
                <Route path="/ManagerAdd-Table" element={<ManagerAddTables BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-Tables" element={<ManagerViewTables BackRoutes={BackRoutes[1].nav} />}/>
                <Route path="/ManagerView-Table/:id" element={< ManagerViewTableDetails/>}/>
                <Route path="/ManagerAdd-Foods" element={<ManagerAddFoods BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerAdd-Offers" element={<AddOffers BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-Foods" element={<ManagerViewFoods BackRoutes={BackRoutes[1].nav} />}/>
                <Route path="/ManagerView-Food/:id" element={<ManagerViewFood/>}/>
                <Route path="/ManagerView-Offers" element={<ManagerViewOffers BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-Offer/:id" element={<ManagerViewOffer/>}/>
                <Route path="/ManagerAdd-supllierorder" element={<SupplierOrder BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-supllierorder" element={<ViewSupplierOrder BackRoutes={BackRoutes[1].nav}/>}/>
                <Route path="/ManagerView-supllierorder-details/:id" element={<ViewSupplierOrderDetails/>}/>
                <Route path="/ManagerAdd-Categories" element={<ManagerAddCategories BackRoutes={BackRoutes[1].nav}/>}/>

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Staff-Member ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                
                <Route path="/Staff-MemberDashBoard" element={<StaffMemberDashBoard Navs = {Roles[2]} Card = {Cards[2]} ScrollToTop={scrollToTop}  view={view}/>}/>
                <Route path="/Staff-MemberAdd-Offers" element={<StaffMemberAddOffers BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberView-Offers" element={<StaffMemberViewOffers BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberView-Offer" element={<StaffMemberViewOffer BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberView-Foods" element={<StaffMemberViewFoods BackRoutes={BackRoutes[2].nav} />}/>
                <Route path="/Staff-MemberView-Tables" element={<StaffMemberViewTables BackRoutes={BackRoutes[2].nav} />}/>
                <Route path="/Staff-MemberPendingOrder-Details" element={<StaffMemberPendingOrders BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberOrder-Details/:id" element={<StaffMemberOrderDetails BackRoutes = '/Staff-MemberPendingOrder-Details'/>}/>
                <Route path="/Staff-MemberPendingTable-Reservation-Details" element={<StaffMemberPendingReservations BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberTable-Reservation-Details/:id" element={<StaffMemberTableReservationDetails BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberMy-Profile" element={<StaffMemberUserProfile route={EditProfileLinks[2]} BackRoutes={BackRoutes[2].nav}/>}/>
                <Route path="/Staff-MemberEdit-Profile" element={<StaffMemberEditProfile EditProfileBackRoute={EditProfileBackRoute[2].nav}/>}/>
                <Route path="/Staff-MemberPlace-Order" element={<StaffMemberPlaceOrder BackRoutes={BackRoutes[2].nav}/>}/>
                
                
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Customer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/CustomerDashBoard" element={<CustomerDashBoard Navs={Roles[5]} />}/>
                <Route path="/CustomerMy-Profile" element={<CustomerUserProfile BackRoutes={BackRoutes[3].nav}/>}/>     
                <Route path="/CustomerPlace-Order" element={<Order BackRoutes={BackRoutes[3].nav}/>}/> 
                <Route path="/CustomerPay" element={<ProductDisplay/>}/>     
                <Route path="/CustomerMyCart" element={<Cart cartData = {CartData} BackRoutes={BackRoutes[3].nav}/>}/>     
                {/* <Route path="/CustomerMy-Orders" element={<MyOrders/>}/>    */}
                <Route path="/CustomerTable-Reservation" element={
                  <Elements stripe={stripePromise}>
                    <TableReservation BackRoutes={BackRoutes[3].nav}/>     
                  </Elements>
                }/>     
                <Route path="/CustomerAdd-Review" element={<AddReview BackRoutes={BackRoutes[3].nav} />}/>     
                <Route path="/CustomerDelivery-Tracking" element={<DeliveryTracking/>}/> 
                <Route path="/CustomerOrdering" element={
                  <Elements stripe={stripePromise}>
                    <OrderItems/>       
                  </Elements>
                }/>
                <Route path="/CustomerMy-Orders" element={<MyOrders BackRoutes={BackRoutes[3].nav} />}/>   
                <Route path="/CustomerDelivery-Tracking" element={<DeliveryTracking/>}/>     

              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Deliverer ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/DelivererDashBoard" element={<DelivererDashBoard Navs = {Roles[3]} Card = {Cards[3]} ScrollToTop={scrollToTop}  view={view}/>}/>
                <Route path="/DelivererMy-Profile" element={<DelivererUserProfile route={EditProfileLinks[3]} BackRoutes={BackRoutes[4].nav}/>}/>   
                <Route path="/DelivererEdit-Profile" element={<DelivererEditProfile EditProfileBackRoute={EditProfileBackRoute[3].nav}/>}/>  
                <Route path="/DelivererAllOrderDetails" element={<AllOrderDetails BackRoutes={BackRoutes[4].nav}/>}/>   
                <Route path="/DelivererOrderDetails/:id" element={<DeliveryOrderDetails/>}/>   
                <Route path="/DelivererMap/:id" element={<Map/>}/>   
              
              {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Supplier ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */}
                  
                <Route path="/SupplierDashBoard" element={<SupplierDashBoard Navs={Roles[4]} Card = {Cards[4]} ScrollToTop={scrollToTop} view={view}/>} />
                <Route path="/SupplierMy-Profile" element={<SupplierUserProfile route={EditProfileLinks[4]} BackRoutes={BackRoutes[5].nav}/>}/>    
                <Route path="/SupplierEdit-Profile" element={<SupplierEditProfile EditProfileBackRoute={EditProfileBackRoute[3].nav}/>}/> 
                <Route path="/AddSupplyItems" element={<SupplierItems BackRoutes={BackRoutes[5].nav}/>}/> 
                {/* <Route path="/ViewSupplyItems" element={<SupplierItems BackRoutes={BackRoutes[5].nav}/>}/>  */}
                {/* <Route path="/ViewSupplyItem/:id" element={<SupplierItems BackRoutes={BackRoutes[5].nav}/>}/>  */}
                <Route path="/SupplierMessages" element={<Messages BackRoutes={BackRoutes[5].nav}/>}/> 
                <Route path="/SupplierConformOrder/:id" element={<SupplierOrderConform/>}/>

              </Route>
            </Routes>
          </div>
          </Fragment>
      </AuthState>
    </div>
  );
}

export default App;
