import { FaHouseUser, FaUser, FaUserMinus, FaUserPlus, FaUsers } from "react-icons/fa";
import { BiLogOut } from 'react-icons/bi';
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
                text:'View Users',
                icon:<FaUsers style={iconStyle}/>,
                link:"/Admin/View-Users"
            },
            {
                text:'Remove User',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Admin/Remove-User"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/Admin/Add-User"
            },
        ],
    },
    {
        Role:'Manager',
        Navs:[
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
                text:'View Users',
                icon:<FaUsers style={iconStyle}/>,
                link:"/Admin/View-Users"
            },
            {
                text:'Remove User',
                icon:<FaUserMinus style={iconStyle}/>,
                link:"/Admin/Remove-User"
            },
            {
                text:'Log Out',
                icon:<BiLogOut style={iconStyle}/>,
                link:"/Admin/Add-User"
            },
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
    }
]