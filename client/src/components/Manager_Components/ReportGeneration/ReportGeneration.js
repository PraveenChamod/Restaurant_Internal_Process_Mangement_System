
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ReportGenerationElelments';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";

const ReportGenerationComponent = () => {
    
    return ( 
        <Container>
            <Header>REPORT GENERATION</Header>
            <l.Content>
                <l.ButtonArea>
                    <l.CustomRegularButton><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Daily Report</l.CustomRegularButton>
                    <l.CustomRegularButton><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Monthly Report</l.CustomRegularButton>
                    <l.CustomRegularButton><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Annual Report</l.CustomRegularButton>
                </l.ButtonArea>
            </l.Content>
            <l.Div3>
                <RegularButton>
                <Link to="./login" className="btn">
                    Back
                </Link>
                </RegularButton>
            </l.Div3>
        </Container>
     );
}
 
export default ReportGenerationComponent;