import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./OrderDetailsElements";
const OrderDetails = (props) => {
  console.log(props.data3);

  return (
    <Container>
      <Header>Supplier Orders</Header>
      <l.SubContainer>
        <l.Table>
          <l.Tr>
            <l.Th>Buyer</l.Th>
            <l.Th>Buyer's Email</l.Th>
            <l.Th>Item</l.Th>
            <l.Th>Quantity</l.Th>
            <l.Th>Date</l.Th>
            <l.Th></l.Th>
          </l.Tr>
          {props.data3.map((row) => {
            console.log(row);
            return row.Item.map((item) => {
              return (
                <l.Tr key={row.id}>
                  <l.Td>{row.managerName}</l.Td>
                  <l.Td>{row.managerEmail}</l.Td>
                  <l.Td>{item.ItemName}</l.Td>
                  <l.Td>{item.Quantity}</l.Td>
                  <l.Td>
                    <Link
                      to={`/SupplierConformOrder/${row.id}`}
                      className="btn"
                    >
                      <l.Icon>
                        <AiFillEye />
                      </l.Icon>
                    </Link>
                  </l.Td>
                </l.Tr>
              );
            });
          })}
        </l.Table>
      </l.SubContainer>
      <l.ButtonSection>
        <Link to={props.BackRoutes} className="btn">
          <RegularButton>Back</RegularButton>
        </Link>
      </l.ButtonSection>
    </Container>
  );
};

export default OrderDetails;
