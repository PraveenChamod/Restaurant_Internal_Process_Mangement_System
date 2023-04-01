import { useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./TableDetailElement";
const TableDetail = (props) => {
    const[TableNo,setTableNo] = useState(props.table.TableNo);
    const[NoOfPersons,setNoOfPersons] = useState(props.table.NoOfPersons);
    const[price,setprice] = useState(props.table.price);
    const[Status,setStatus] = useState(props.table.Status);
    return ( 
        <Container>
        <Header>Table Details</Header>
        <l.Div>
            <l.Div1>
                <l.TextFeild 
                type="text" 
                placeholder="Table No"
                value={TableNo}
                onChange={e=>setTableNo(e.target.value)}
                />
                <l.TextFeild 
                type="text" 
                placeholder="Maximum No of Persons"
                value={NoOfPersons}
                onChange={e=>setNoOfPersons(e.target.value)}
                />
                <l.TextFeild 
                type="text" 
                placeholder="Reservation Fee"
                value={price}
                onChange={e=>setprice(e.target.value)}
                />
                <l.TextFeild 
                type="text" 
                placeholder="Status(Available/Not)"
                value={Status}
                onChange={e=>setStatus(e.target.value)}
                />
            </l.Div1>
            <l.Div2>
                <l.Sec>
                    <FormButton>
                        Delete
                    </FormButton>
                </l.Sec>
                <l.Sec>
                    <FormButton>
                        Update
                    </FormButton>
                </l.Sec>
            </l.Div2>
        </l.Div>
        <l.Div3>
            <RegularButton>
                Back
            </RegularButton>
        </l.Div3>
        </Container>
     );
}
 
export default TableDetail;