import { FaUser, FaUserMinus, FaUserPlus, FaUsers } from "react-icons/fa";
import { BiLogOut } from 'react-icons/bi';
let iconStyle = {fontWeight:"600",color:"#fff",fontSize:"1.5rem"};

const Roles = [{
    Role:'Admin',
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
}]