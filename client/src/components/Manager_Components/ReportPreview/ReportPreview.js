import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ReportPreviewElements';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ReportPreview = () => {
    return ( 
        <Container>
            <Header>REPORT PREVIEW</Header>
            <l.FormSection>
                <>
                </>
                <l.PrintButton>
                    <l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>
                </l.PrintButton>
            </l.FormSection>
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
 
export default ReportPreview;