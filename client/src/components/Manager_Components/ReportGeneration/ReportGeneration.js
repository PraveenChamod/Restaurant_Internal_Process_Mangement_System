
import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from './ReportGenerationElelments';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch"
import Monthly_Repo from "../ReportPreview/Reports/Monthly_Repo";
import Daily_Repo from "../ReportPreview/Reports/Daily_Repo";


const ReportGenerationComponent = () => {
    const {data,isPending}= useFetch('api/v1/serviceProvider/Orders/AllOrders');

    const currentdDay = new Date().toISOString().slice(0, 10);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const DailyOrders = data?.allorders?.filter((order) => {
        const orderDate = new Date(order.Date).toISOString().slice(0, 10);
        return orderDate === currentdDay;
      });

    const MonthlyOrders = data?.allorders?.filter((order) => {
        const orderMonth = new Date(order.Date).getMonth() + 1;
        return orderMonth === currentMonth;
    });

    const AnnualOrders = data?.allorders?.filter((order) => {
        const orderYear = new Date(order.Date).getFullYear();
        return orderYear === currentYear;
    });

    const dailyRepoClick = () => {
        <Daily_Repo aailyOrders = {DailyOrders}/>
    }
    const monthlyRepoClick = () => {
        <Monthly_Repo monthlyOrders = {MonthlyOrders}/>
    }
    const annualRepoClick = () => {
        <Monthly_Repo annualOrders = {AnnualOrders}/>
    }

    return ( 
        <Container>
            <Header>REPORT GENERATION</Header>
            <l.Content>
                <l.ButtonArea>
                    <l.CustomRegularButton onClick={dailyRepoClick}><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Daily Report</l.CustomRegularButton>
                    <l.CustomRegularButton onClick={monthlyRepoClick}><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Monthly Report</l.CustomRegularButton>
                    <l.CustomRegularButton onClick={annualRepoClick}><l.Icon><FontAwesomeIcon icon={faFilePdf} /></l.Icon>Annual Report</l.CustomRegularButton>
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