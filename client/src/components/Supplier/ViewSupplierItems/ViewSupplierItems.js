import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import { AiFillEye } from 'react-icons/ai';
import * as l from "./ViewSupplierItemsElements";
const ViewSupplyItems = (props) => {
    return ( 
        <Container>
            <Header>
                Item Details
            </Header>
                <l.SubContainer>
                    <l.Table>
                        <l.Tr>
                            <l.Th>Item Name</l.Th>
                            <l.Th>Category</l.Th>
                            <l.Th>Price</l.Th>
                            <l.Th>Status</l.Th>
                            <l.Th></l.Th>
                        </l.Tr>
                        {
                            props.data.supplierItem.map(row=>{
                                return(
                                    <l.Tr>
                                        <l.Td>{row.ItemName}</l.Td>
                                        <l.Td>{row.Category}</l.Td>
                                        <l.Td>{row.Price}</l.Td>
                                        <l.Td>{row.Status}</l.Td>
                                    </l.Tr>
                                )
                            })
                        }
                    </l.Table>
                </l.SubContainer>
            <l.ButtonSection>
                <Link to={props.BackRoutes} className="btn">
                    <RegularButton>
                        Back
                    </RegularButton>
                </Link>
            </l.ButtonSection>
        </Container>
     );
}
 
export default ViewSupplyItems;