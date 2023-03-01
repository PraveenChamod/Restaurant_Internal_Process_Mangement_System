import { AiFillEye } from "react-icons/ai";
import useFetch from "../../../Hooks/useFetch";
import { RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from './FoodDetailsElements'
const FoodDetails = () => {
    const res = useFetch('api/v1/serviceProvider/food/getFoods');
    console.log(res.data);
    return ( 
        <Container>
            <Header>
                Food Details
            </Header>
            <l.SubContainer>
                <l.Table>
                    <l.Tr>
                        <l.Th>Name</l.Th>
                        <l.Th>Category</l.Th>
                        <l.Th>Price</l.Th>
                        <l.Th>Status</l.Th>
                        <l.Th></l.Th>
                    </l.Tr>
                    {
                        res.data.map(data=>{
                            return(
                                <l.Tr>
                                    <l.Td>{data.FoodName}</l.Td>
                                    <l.Td>{data.Category}</l.Td>
                                    <l.Td>{data.Price}</l.Td>
                                    <l.Td>{data.Status}</l.Td>
                                    <l.Td><l.Icon><AiFillEye/></l.Icon></l.Td>
                                </l.Tr>
                            )
                        })
                    }
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
 
export default FoodDetails;