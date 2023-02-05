import img1 from "../Images/foods/burger.jpg"
import img2 from "../Images/foods/burrito.jpg"
import img3 from "../Images/foods/macaron.jpg"
import img4 from "../Images/foods/pancake.jpg"
import img5 from "../Images/foods/sandwitch.jpg"

export const card = [
    {
        img:`${img1}`,
        Name: "Burger",
        price : "Rs. 999.99"
    },
    {
        img:`${img2}`,
        Name: "Burrito",
        price : "Rs. 999.99"
    },
    {
        img:`${img3}`,
        Name: "Macaron",
        price : "Rs. 999.99"
    },
    {
        img:`${img4}`,
        Name: "Pancake",
        price : "Rs. 999.99"
    },
    {
        img:`${img5}`,
        Name: "Sandwitch",
        price : "Rs. 999.99"
    }    
]

export const responsive = {
    0: {
        items: 1,
    },
    769:{
        items: 3,
    },
};
export const TableColumns = [
    {
        TableName:"Food Details",
        Headers:[
            {
                text:'Name'
            },
            {
                text:'Category'
            },
            {
                text:'Qty'
            },
            {
                text:'Price'
            },
            {
                text:'Status'
            },
        ]
    },
    {
        TableName:"Details Of All Tables",
        Headers:[
            {
                text:'Table No'
            },
            {
                text:'Maximum No of Persons'
            },
            {
                text:'Reservation Fee'
            },
            {
                text:'Status'
            }
        ]
    },
    {
        TableName:"Stock Details",
        Headers:[
            {
                text:'Item Name'
            },
            {
                text:'Category'
            },
            {
                text:'Qty'
            },
            {
                text:'Price'
            },
            {
                text:'Supplier ID'
            },
        ]
    },
    {
        TableName:"Pending Orders",
        Headers:[
            {
                text:'Customer Name'
            },
            {
                text:'Email'
            },
            {
                text:'Contact No'
            },
            {
                text:'Time'
            },
            {
                text:'Order Id'
            },
        ]
    },
    {
        TableName:"Pending Reservation",
        Headers:[
            {
                text:'Customer Name'
            },
            {
                text:'Table No'
            },
            {
                text:'Contact No'
            },
            {
                text:'Date & Time'
            },
        ]
    },
    {
        TableName:"All Offers",
        Headers:[
            {
                text:'Meal Name'
            },
            {
                text:'Special Price'
            },
            {
                text:'Validity'
            },
            {
                text:'Status'
            },
        ]
    }
]
export const ViewThings = [
    {
        Title:'Food Details',
        TextFeilds:[
            {
                text:'Name'
            },
            {
                text:'Category'
            },
            {
                text:'Price'
            },
            {
                text:'Status(Available/Not)'
            },
        ]
    },
    {
        Title:'Offer Details',
        TextFeilds:[
            {
                text:'Meal Name'
            },
            {
                text:'Special Price'
            },
            {
                text:'Validity'
            },
            {
                text:'Status(Available/Not)'
            },
        ]
    },
    {
        Title:'Table Details',
        TextFeilds:[
            {
                text:'Table No'
            },
            {
                text:'Maximum No of Persons'
            },
            {
                text:'Reservation Fee'
            },
            {
                text:'Status(Available/Not)'
            }
        ]
    }
]