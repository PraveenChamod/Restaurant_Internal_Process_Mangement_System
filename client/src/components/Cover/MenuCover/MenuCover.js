import { Link } from "react-router-dom";
import {
    Container,
    Heading,
    SubHeading,
    ButtonSection,
    Button,
    H1,
    H2,
    Image,
    CoverImage,
    CoverContent
} from './MenuCoverElements';
import Cover from "../../../Images/MenuCover.jpg";
const MenuCover = () => {
    return ( 
        <Container>
            <CoverImage>
                <Image src={Cover}/>
            </CoverImage>
            <CoverContent>
                <Heading data-aos={"fade-right"}>
                    <H1>Menu</H1>
                </Heading>
                <SubHeading data-aos={"fade-right"}
                            data-aos-duration={1500}>
                    <H2>Find Your Favourites</H2>
                </SubHeading>
                <ButtonSection>
                    <Link to="login" className='btn'><Button data-aos={"zoom-in-up"} >Order Now</Button></Link>
                </ButtonSection>
            </CoverContent>
        </Container>
     );
}
 
export default MenuCover;