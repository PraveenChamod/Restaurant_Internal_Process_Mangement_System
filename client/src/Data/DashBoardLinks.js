import { FaHouseUser, FaUser, FaUserMinus, FaUserPlus, FaUsers  , FaBookOpen} from "react-icons/fa";
import { GiMeal, GiTabletopPlayers, GiHotMeal, GiRoundTable } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GoSearch ,GoDiffAdded } from 'react-icons/go';
import { AiOutlineStock } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
import { HiDocumentReport } from 'react-icons/hi';
import { MdOutlineAddToPhotos } from "react-icons/md";
let iconStyle = {fontWeight:"600",color:"#fff",fontSize:"1.8rem"};


export const Roles = [
    {
        Role:'Admin',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/AdminMy-Profile"
            },
            {
                text:'Add User',
                icon:<FaUserPlus style={iconStyle}/>,
                link:"/AdminAdd-User"
            },
            {
                text:'View User',
                icon:<FaUser style={iconStyle}/>,
                link:"/AdminView-User"
            },
            {
                text:'Add Tables',
                icon:<GiTabletopPlayers style={iconStyle}/>,
                link:"/AdminAdd-Table"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/AdminView-Tables"
            },
            {
                text:'Add Foods',
                icon:<GiMeal style={iconStyle}/>,
                link:"/AdminAdd-Foods"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/AdminView-Foods"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            },
        ],
    },
    {
        Role:'Manager',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/ManagerMy-Profile"
            },
            {
                text:'Add User',
                icon:<FaUserPlus style={iconStyle}/>,
                link:"/ManagerAdd-User"
            },
            {
                text:'View User',
                icon:<FaUser style={iconStyle}/>,
                link:"/ManagerView-User"
            },
            {
                text:'Add Stock',
                icon:<BsGraphUp style={iconStyle}/>,
                link:"/ManagerAddStock"
            },
            {
                text:'View Stocks',
                icon:<AiOutlineStock style={iconStyle}/>,
                link:"/ManagerViewStock"
            },
            {
                text:'Add Tables',
                icon:<GiTabletopPlayers style={iconStyle}/>,
                link:"/ManagerAdd-Table"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/ManagerView-Tables"
            },
            {
                text:'Add Foods',
                icon:<GiMeal style={iconStyle}/>,
                link:"/ManagerAdd-Foods"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/ManagerView-Foods"
            },
            {
                text:'Add Offers',
                icon:<FaUsers style={iconStyle}/>,
                link:"/ManagerAdd-Offers"
            },
            {
                text:'View Offers',
                icon:<GiHotMeal style={iconStyle}/>,
                link:"/ManagerView-Offers"
            },
            {
                text:'Add Order',
                icon:<GoDiffAdded style={iconStyle}/>,
                link:"/ManagerAdd-supllierorder"
            },
            {
                text:'View Order',
                icon:<FaBookOpen style={iconStyle}/>,    
                link:"/ManagerView-supllierorder"
            },
            {
                text:'Report Generation',
                icon:<HiDocumentReport style={iconStyle}/>,
                link:"/ManagerReport-Generation"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            },
        ]
    },
    {
        Role:'Staff Member',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/Staff-MemberMy-Profile"
            },
            {
                text:'Add Offers',
                icon:<FaUsers style={iconStyle}/>,
                link:"/Staff-MemberAdd-Offers"
            },
            {
                text:'View Offers',
                icon:<GiHotMeal style={iconStyle}/>,
                link:"/Staff-MemberView-Offers"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/Staff-MemberView-Foods"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/Staff-MemberView-Tables"
            },
            {   
                text:'Order Details',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-MemberPendingOrder-Details"
            },
            {
                text:'Table Reservation Details',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-MemberPendingTable-Reservation-Details"
            },
            {
                text:'Place Order',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-MemberPlace-Order"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            }
        ]
    },
    {
        Role:'Deliverer',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/DelivererMy-Profile"
            },
            {
                text:'View Pending Orders',
                icon:<FaUsers style={iconStyle}/>,
                link:"/DelivererAllOrderDetails"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            }
        ]
    },
    {
        Role:'Supplier',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/SupplierMy-Profile"
            },
            {
                text:'View Orders',
                icon:<FaUsers style={iconStyle}/>,
                link:"/SupplierMessages"
            },
            {
                text:'Add Supply Items',
                icon:<MdOutlineAddToPhotos style={iconStyle}/>,
                link:"/AddSupplyItems"
            },
            {
                text:'View Supply Items',
                icon:<MdOutlineAddToPhotos style={iconStyle}/>,
                link:"/ViewSupplyItems"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            }
        ]
    },
    {
        Role:'Customer',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/CustomerMy-Profile"
            },
            {
                text:'Order Meal',
                icon:<FaUsers style={iconStyle}/>,
                link:"/CustomerPlace-Order"
            },
            {
                text:'My Orders',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/CustomerMy-Orders"
            },
            {
                text:'Reserve Table',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/CustomerTable-Reservation"
            },
            {
                text:'Add Review',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/CustomerAdd-Review"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/login"
            }
        ]
    }
]

export const Cards = [
    {
        Role:"Admin",
        CardContent:[
            {
                text:'Users',
                count:'6400',
                icon:<FaUsers/>
            },
            {
                text:'New Accounts',
                count:'100',
                icon:<FaUserPlus/>
            },
            {
                text:'Disable Accounts',
                count:'10',
                icon:<FaUserMinus/>
            }
        ]
    },
    {
        Role:"Manager",
        CardContent:[
            {
                text:'Foods',
                count:'64',
                icon:<IoFastFoodSharp/>
            },
            {
                text:'Offers',
                count:'9',
                icon:<GiHotMeal/>
            },
            {
                text:'Tables',
                count:'5',
                icon:<GiRoundTable/>
            }
        ]
    },
    {
        Role:"Staff-Member",
        CardContent:[
            {
                text:'Pending Orders',
                count:'64',
                icon:<IoFastFoodSharp/>
            },
            {
                text:'Pending Reservations',
                count:'9',
                icon:<GiHotMeal/>
            },
        ]
    },
    {
        Role:"Deliverer",
        CardContent:[
            {
                text:'Order Details',
                count:'64',
                icon:<IoFastFoodSharp/>
            },
        ]
    },
    {
        Role:"Supplier",
        CardContent:[
            {
                text:'Pending Orders',
                count:'64',
                icon:<IoFastFoodSharp/>
            },
        ]
    }
]