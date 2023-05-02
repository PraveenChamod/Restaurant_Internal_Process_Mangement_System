import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./ViewStocksElements";
const ViewStocksComponent = (props) => {
  console.log(props);
  const { user } = useAuth();
  return (
    <Container>
      <Header>Stock Details</Header>
      <l.SubContainer>
        <l.Table>
          <thead>
            <l.Tr>
              <l.Th>Item Name</l.Th>
              <l.Th>Category</l.Th>
              <l.Th>Qty</l.Th>
              <l.Th>Price</l.Th>
              <l.Th>Supplier ID</l.Th>
              <l.Th></l.Th>
            </l.Tr>
          </thead>
          <tbody>
            {props.items.map((item) => (
              <l.Tr key={item._id}>
                <l.Td>{item.ItemName}</l.Td>
                <l.Td>{item.Category}</l.Td>
                <l.Td>{item.Quantity}</l.Td>
                <l.Td>{item.WholeSalePrice}</l.Td>
                <l.Td>{item.id}</l.Td>
                {user.Role === "Manager" ? (
                  <Link
                    to={`/ManagerViewItem/${item.SerialNo}`}
                    className="btn"
                  >
                    <l.Icon>
                      <AiFillEye />
                    </l.Icon>
                  </Link>
                ) : null}
              </l.Tr>
            ))}
          </tbody>
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

export default ViewStocksComponent;
