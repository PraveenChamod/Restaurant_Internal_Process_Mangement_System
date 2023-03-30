import { useEffect, useState } from "react";
import { FormButton, RegularButton } from "../SharedElements/Buttons";
import { Container, Header } from "../SharedElements/SharedElements";
import * as l from "./TableDetailElement";
const TableDetail = ({table}) => {
    console.log("table data " , table);
    const [tableNo,setTableNo] = useState(0)
    const  [maxpersons,setmaxPersons] = useState(0)
    const [reservationFee,setReservationFee] = useState(0)
    const [status,setStatus] = useState('')
    useEffect(()=>{
        setTableNo(table?.TableNo)
        setmaxPersons(table?.NoOfPersons)
        setReservationFee(table?.price)
        setStatus(table?.Status)
    },[table])
    return ( 
        <Container>
        <Header>Table Details</Header>
        <l.Div>
            <l.Div1>
                <l.TextFeild type="text" placeholder="Table No" value={tableNo}/>
                <l.TextFeild type="text" placeholder="Maximum No of Persons" value={maxpersons}/>
                <l.TextFeild type="text" placeholder="Reservation Fee" value={reservationFee}/>
                <l.TextFeild type="text" placeholder="Status(Available/Not)" value={status}/>
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