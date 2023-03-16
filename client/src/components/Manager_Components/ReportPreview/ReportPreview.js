import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ReportPreviewElements';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link, useLocation, useParams } from "react-router-dom";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import PDFreport from "./PDFreport";

const ReportPreview = (props) => {
   
    const location = useLocation();
    const orders  = location.state?.dataOrders;
    const report = location.state?.reportType;

    console.log(report);

    const totalPrices = orders.map(order => order.TotalPrice);
    const sumTotalPrices = totalPrices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

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
                            <l.Th>Customer</l.Th>
                            <l.Th>Qty</l.Th>
                            <l.Th>Price</l.Th>
                            <l.Th>Payment Method</l.Th>
                        </l.Tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <l.Tr key={order._id}>
                                <l.Td>{order.Customer}</l.Td>
                                <l.Td>{order.Quantity}</l.Td>
                                <l.Td>{order.TotalPrice}</l.Td>
                                <l.Td>{order.paymentMethod}</l.Td>
                                </l.Tr>
                        ))} 
                        <l.Tr>
                            <l.Th></l.Th>
                            <l.Th>Income: </l.Th>
                            <l.Th>{sumTotalPrices}</l.Th>
                            <l.Th></l.Th>
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