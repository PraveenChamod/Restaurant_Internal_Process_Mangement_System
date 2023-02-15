import { FaHouseUser, FaUser, FaUserMinus, FaUserPlus, FaUsers } from "react-icons/fa";
import { GiMeal, GiTabletopPlayers, GiHotMeal, GiRoundTable } from 'react-icons/gi';
import { BiLogOut } from 'react-icons/bi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import { AiOutlineStock } from 'react-icons/ai';
import { BsGraphUp } from 'react-icons/bs';
let iconStyle = {fontWeight:"600",color:"#fff",fontSize:"1.8rem"};

export const Roles = [
    {
        Role:'Admin',
        Navs:[
            {
                text:'Home',
                icon:<FaHouseUser style={iconStyle}/>,
                link:"/Admin/Home"
            },
            {
                text:'Add User',
                icon:<FaUserPlus style={iconStyle}/>,
                link:"/Admin/Add-User"
            },
            {
                text:'View User',
                icon:<FaUser style={iconStyle}/>,
                link:"/Admin/View-User"
            },
            {
                text:'Add Tables',
                icon:<GiTabletopPlayers style={iconStyle}/>,
                link:"/Admin/Add-Table"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/Admin/View-Tables"
            },
            {
                text:'Add Foods',
                icon:<GiMeal style={iconStyle}/>,
                link:"/Admin/Add-Foods"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/Admin/View-Foods"
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
                text:'Add User',
                icon:<FaUserPlus style={iconStyle}/>,
                link:"/Manager/Add-User"
            },
            {
                text:'View User',
                icon:<FaUser style={iconStyle}/>,
                link:"/Manager/View-User"
            },
            {
                text:'Add Stock',
                icon:<BsGraphUp style={iconStyle}/>,
                link:"/Manager/AddStock"
            },
            {
                text:'View Stocks',
                icon:<AiOutlineStock style={iconStyle}/>,
                link:"/Manager/ViewStock"
            },
            {
                text:'Add Tables',
                icon:<GiTabletopPlayers style={iconStyle}/>,
                link:"/Manager/Add-Table"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/Manager/View-Tables"
            },
            {
                text:'Add Foods',
                icon:<GiMeal style={iconStyle}/>,
                link:"/Manager/Add-Foods"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/Manager/View-Foods"
            },
            {
                text:'Add Offers',
                icon:<FaUsers style={iconStyle}/>,
                link:"/Manager/Add-Offers"
            },
            {
                text:'View Offers',
                icon:<GiHotMeal style={iconStyle}/>,
                link:"/Manager/View-Offers"
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
                text:'Add Offers',
                icon:<FaUsers style={iconStyle}/>,
                link:"/Manager/Add-Offers"
            },
            {
                text:'View Offers',
                icon:<GiHotMeal style={iconStyle}/>,
                link:"/Manager/View-Offers"
            },
            {
                text:'View Foods',
                icon:<IoFastFoodSharp style={iconStyle}/>,
                link:"/Manager/View-Foods"
            },
            {
                text:'View Tables',
                icon:<GoSearch style={iconStyle}/>,
                link:"/Manager/View-Tables"
            },
            {
                text:'Order Details',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-Member/Order-Details"
            },
            {
                text:'Table Reservation Details',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-Member/Table-Reservation-Details"
            },
            {
                text:'Place Order',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Staff-Member/Place-Order"
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
    }
]