import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./ReceivedOrdersElements";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const DelivererReceivedOrders = (props) => {
  return (
    <Container>
      <Header>Food Details</Header>
      <l.SubContainer>
        <l.Table>
          <l.Tr>
            <l.Th>Customer Name</l.Th>
            <l.Th>Contact Number</l.Th>
            <l.Th>Amount</l.Th>
            <l.Th>Order Id</l.Th>
            <l.Th></l.Th>
          </l.Tr>
          {props.pendingOrders.map((order) => {
            return (
              <l.Tr>
                <l.Td>{order.customerName}</l.Td>
                <l.Td>{order.ContactNumber}</l.Td>
                <l.Td>{order.TotalPrice}</l.Td>
                <l.Td>{order.OrderId}</l.Td>
                <Link
                  to={`/DelivererOrderDetails/${order.OrderId}`}
                  className="btn"
                >
                  <l.Icon>
                    <AiFillEye />
                  </l.Icon>
                </Link>
              </l.Tr>
            );
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

export default DelivererReceivedOrders;
