import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ViewStocksElements'
const ViewStocksComponent = (props) => {

    console.log(props);

    return ( 
        <Container>
            <Header>
            Stock Details
            </Header>
            <l.SubContainer>
                <l.Table>
                    <thead>
                        <l.Tr>
                            <l.Th>Item Name</l.Th>
                            <l.Th>Category</l.Th>
                            <l.Th>Qty</l.Th>
                            <l.Th>Price</l.Th>
                            <l.Th>Supplier ID</l.Th>
                            <l.Th>123</l.Th>
                        </l.Tr>
                    </thead>
                    <tbody>
                    {props.items.map(item => (
                        <l.Tr key={item._id}>
                            <l.Td>{item.ItemName}</l.Td>
                            <l.Td>{item.Category}</l.Td>
                            <l.Td>{item.Quantity}</l.Td>
                            <l.Td>{item.UnitPrice}</l.Td>
                            <l.Td>{item.id}</l.Td>
                            <l.Td><l.Icon><AiFillEye/></l.Icon></l.Td>
                            </l.Tr>
                    ))}                       
                    </tbody>
                </l.Table>
            </l.SubContainer>
            <l.ButtonSection>
                <RegularButton>
                    Back
                </RegularButton>
            </l.ButtonSection>
        </Container>
     );
}
 
export default ViewStocksComponent;