import { Box } from "@mui/material";
import { Container, Header } from "../SharedElements/SharedElements";
import {
    DataGrid
  } from '@mui/x-data-grid';
  import * as l from './ViewAllElements'
import { RegularButton } from "../SharedElements/Buttons";
const ViewAllComponent = (props) => {
    const TableHeaders = Array.from(props.Tables1.Headers);
    console.log(TableHeaders);
    const columns = TableHeaders.map(header=>{
        return (
            {field:`${header.text}`,headerName:`${header.text}`,headerClassName: 'super-app-theme--header',width:180}
        )
    })
    const rows = []
    return ( 
        <Container>
            <Header>
                {props.Tables1.TableName}
            </Header>
            <l.SubContainer>
                <l.GridContainer>
                    <Box 
                        sx={{ 
                            height: 400, 
                            width: '100%', 
                            '& .super-app-theme--header': {color: 'rgba(255,255,255)'}}}>
                        <DataGrid rows={rows} columns={columns} />
                    </Box>
                </l.GridContainer>
            </l.SubContainer>
            <l.ButtonSection>
                <RegularButton>
                    Back
                </RegularButton>
            </l.ButtonSection>
        </Container>
     );
}
 
export default ViewAllComponent;