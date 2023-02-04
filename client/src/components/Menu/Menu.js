import {
    Container,
    Column1,
    Column2,
    Column3,
    Items1,
    Items2,
    Items3,
    ImageSection1,
    Category1,
    Category2,
    Category3,
    Meals,
    ItemDetails,
    ItemDetails1,
    Price,
    ItemName,
    Image1,
    ImageSection2,
    Image2
} from './MenuElements';
import image1 from '../../Images/ayesha-firdaus-c3esWyvW3E4-unsplash.jpg';
import image2 from '../../Images/jennifer-schmidt-MRHyv-hHxgk-unsplash.jpg';
const MenuPage = (props) => {
    const MenuArray1 = props.MenuItems1;
    const Array1 = MenuArray1[0].Item;
    const Array2 = MenuArray1[1].Item;
    const Array3 = MenuArray1[2].Item;
    const Array4 = MenuArray1[3].Item;
    const Array5 = MenuArray1[4].Item;
    const Array6 = MenuArray1[5].Item;
    const Array7 = MenuArray1[6].Item;

    return ( 
        <Container>
            <Column1>
                <Items1>
                    <Category1 data-aos={"zoom-in"}>
                        {MenuArray1[0].Category}
                    </Category1>
                    <Meals>
                        {
                            Array1.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <Items1>
                    <Category1 data-aos={"zoom-in"}>
                        {MenuArray1[1].Category}
                    </Category1>
                    <Meals>
                        {
                            Array2.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <ImageSection1 data-aos={"zoom-in"}>
                        <Image1 src={image1}/>
                </ImageSection1>
            </Column1>
            <Column2>
                <Items1>
                    <Category2 data-aos={"zoom-in"}>
                        {MenuArray1[2].Category}
                    </Category2>
                    <Meals>
                        {
                            Array3.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails1 key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails1>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <Items1>
                    <Category2 data-aos={"zoom-in"}>
                        {MenuArray1[3].Category}
                    </Category2>
                    <Meals>
                        {
                            Array4.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails1 key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails1>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <Items1>
                    <Category2 data-aos={"zoom-in"}>
                        {MenuArray1[4].Category}
                    </Category2>
                    <Meals>
                        {
                            Array5.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails1 key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails1>
                                )
                            })
                        }
                    </Meals>
                </Items1>
            </Column2>
            <Column3>
            <Items1>
                    <Category1 data-aos={"zoom-in"}>
                        {MenuArray1[5].Category}
                    </Category1>
                    <Meals>
                        {
                            Array6.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <Items1>
                    <Category1 data-aos={"zoom-in"}>
                        {MenuArray1[6].Category}
                    </Category1>
                    <Meals>
                        {
                            Array7.map((item,id)=>{
                                console.log(item);
                                return(
                                    <ItemDetails key={id}>
                                        <ItemName data-aos={"zoom-out-down"}
                                                    data-aos-duration={1500}>{item.food}</ItemName>
                                        <Price data-aos={"zoom-out-down"}
                                                data-aos-duration={1500}>{item.price}</Price>
                                    </ItemDetails>
                                )
                            })
                        }
                    </Meals>
                </Items1>
                <ImageSection2 data-aos={"zoom-in"}>
                    <Image2 src={image2}/>
                </ImageSection2>
            </Column3>
        </Container>
     );
}
 
export default MenuPage;