import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./TableDetailElement";
import useAuth from "../../../Hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const TableDetail = (props) => {
  const [TableNo, setTableNo] = useState(props.table.TableNo);
  const [NoOfPersons, setNoOfPersons] = useState(props.table.NoOfPersons);
  const [price, setprice] = useState(props.table.price);
  const [Status, setStatus] = useState(props.table.Status);
  const { user } = useAuth();
  const { id } = useParams();
  const update = async (e) => {
    e.preventDefault();
    try {
      const data = {TableNo,NoOfPersons,price,Status};
      await toast.promise(
        axios.patch(`/api/v1/table/${id}`, data),
        {
          loading: "Table is Updating....",
          success: (data) => {
            return ` ${data.data?.message} ` || "success";
          },
          error: (err) => `${err.response.data.message}`,
        },
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "1rem",
            zIndex: "99999999",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <Header>Table Details</Header>
      <l.Div onSubmit={update}>
        <l.Div1>
          <l.TextSection>
            <l.Text>Table No</l.Text>
            <l.TextFeild
            type="text"
            placeholder="Table No"
            value={TableNo}
            onChange={(e) => setTableNo(e.target.value)}
          />
          </l.TextSection>
          <l.TextSection>
            <l.Text>Maximum Number Of Persons</l.Text>
            <l.TextFeild
            type="text"
            placeholder="Maximum No of Persons"
            value={NoOfPersons}
            onChange={(e) => setNoOfPersons(e.target.value)}
          />
          </l.TextSection>
          <l.TextSection>
            <l.Text>Reservation Fee</l.Text>
            <l.TextFeild
            type="text"
            placeholder="Reservation Fee"
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
          </l.TextSection>
          <l.TextSection>
            <l.Text>Status</l.Text>
            <l.TextFeild
            type="text"
            placeholder="Status(Available/Not)"
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
          />
          </l.TextSection>
        </l.Div1>
        <l.Div2>
          <l.Sec>
            <FormButton>Update</FormButton>
          </l.Sec>
        </l.Div2>
      </l.Div>
      <l.Div3>
        <Link
          to={
            user.Role === "Admin" ? "/AdminView-Tables" : "/ManagerView-Tables"
          }
          className="btn"
        >
          <RegularButton>Back</RegularButton>
        </Link>
      </l.Div3>
    </Container>
  );
};

export default TableDetail;
