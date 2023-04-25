import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ReportPreviewElements';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link, useLocation } from "react-router-dom";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PDFreport from "./PDFreport";
import React from 'react';
import logo from '../../../Images/restoLogodark.png'

const ReportPreview = (props) => {
   
    const location = useLocation();
    const orders  = location.state?.dataOrders;
    const report = location.state?.reportType;

    console.log(orders);

    const totalPrices = orders.map(order => order.TotalPrice);
    const sumTotalPrices = totalPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const foodQuantities = {};
    let cashOnDeliveryCount = 0;
    let onlinePaymentCount = 0;
    orders.forEach(order => {
        order.food.forEach(item => {
            if (item.FoodName in foodQuantities) {
            foodQuantities[item.FoodName].quantity += item.quantity;
            foodQuantities[item.FoodName].totalPrice += item.price * item.quantity;
            } else {
            foodQuantities[item.FoodName] = {
                quantity: item.quantity,
                food: item.FoodName,
                unitPrice: item.price,
                totalPrice: item.price * item.quantity
            };
            }
            if (item.PaymentMethod === "Cash On Delivery") {
                cashOnDeliveryCount++;
            } else {
                onlinePaymentCount++;
            }
        });
    });
   
    console.log(foodQuantities);

    const customerFoodQuantities = {};
    
    orders.forEach(order => {
        const customerName = order.customerName;
        if (!customerFoodQuantities[customerName]) {
            customerFoodQuantities[customerName] = 0;
        }
        customerFoodQuantities[customerName] += order.food.length;
        
    });

    let maxCustomer = null;
    let maxQuantity = -1;
    for (const customer in customerFoodQuantities) {
        if (customerFoodQuantities[customer] > maxQuantity) {
            maxCustomer = customer;
            maxQuantity = customerFoodQuantities[customer];
          }
    }
        
    const numOrders = orders.length;

    const handleClick = () => {
        PDFreport(orders, report);
    }

    return ( 
        <Container>
            <Header>{report}</Header>
            <l.FormSection>
                <>
                <l.Table>
                    <thead>
                        <l.Tr>
                            <l.Th colSpan="2">
                                <img src={logo} alt="Logo" height="50px" />
                            </l.Th>
                            <l.Th colSpan="3">
                                Resto, No:01, Main Street, Matara
                            </l.Th>
                        </l.Tr>
                        <l.Tr>
                            
                            <l.Th>Food Name</l.Th>
                            <l.Th>Unit Price</l.Th>
                            <l.Th>Qty</l.Th>
                            <l.Th>Total Price</l.Th>
                        </l.Tr>
                        
                    </thead>
                    <tbody>
                        {Object.values(foodQuantities).map(item => (
                            <l.Tr key={item.food}>
                            <l.Td>{item.food}</l.Td>
                            <l.Td>{item.unitPrice}</l.Td>
                            <l.Td>{item.quantity}</l.Td>
                            <l.Td>{item.totalPrice}</l.Td>
                            </l.Tr>
                        ))}
                          
                        <l.Tr>
                            <l.Th colSpan="5">Income :  Rs.{sumTotalPrices}</l.Th>
                        </l.Tr> 
                        <l.Tr>
                            <l.Th colSpan="5">Best customer :  {maxCustomer}</l.Th>
                        </l.Tr> 
                        <l.Tr>
                            <l.Th colSpan="5">No of orders :  {numOrders}</l.Th>
                        </l.Tr> 
                        <l.Tr>
                            <l.Th colSpan="2">Cash On Delivery :  {cashOnDeliveryCount}</l.Th>
                            <l.Th colSpan="2">Card Payment :  {onlinePaymentCount}</l.Th>
                        </l.Tr>
                        <l.Tr>
                            <l.Th colSpan="5">Report generated at {new Date().toLocaleString()}</l.Th>
                        </l.Tr>                    
                    </tbody>
                </l.Table>
                
           
                
                </>
                <l.PrintButton  onClick={handleClick}>
                    <l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>
                </l.PrintButton>
            </l.FormSection>
            <l.Div3>
                <RegularButton>
                    <Link to="./login" className="btn">
                        Back
                    </Link>
                </RegularButton>
            </l.Div3> 
        </Container>
     );
}
 
export default ReportPreview;