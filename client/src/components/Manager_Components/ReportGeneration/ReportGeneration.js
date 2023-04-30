import { Container, Header } from "../../shared/SharedElements/SharedElements";
import * as l from "./ReportGenerationElelments";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RegularButton } from "../../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";

const ReportGenerationComponent = (props) => {
  console.log(props);

  const confirmOrders = props.data1.data.Orders.filter(
    (order) => order.Status === "Confirm"
  );

  console.log(confirmOrders);

  const todayDate = new Date().toISOString().slice(0, 10);
  console.log(todayDate);
  confirmOrders.map((order) => {
    console.log(order.Date.slice(0, 10));
  });
  const todayOrders = confirmOrders.filter(
    (order) => order.Date.slice(0, 10) === todayDate
  );
  //console.log(todayOrders);

  const currentMonth = new Date().getMonth() + 1;
  console.log(currentMonth);
  const currentMonthOrders = confirmOrders.filter((order) => {
    const orderMonth = new Date(order.Date).getMonth() + 1;
    return orderMonth === currentMonth;
  });

  const currentYear = new Date().getFullYear();
  const currentYearOrders = confirmOrders.filter((order) => {
    const orderYear = new Date(order.Date).getFullYear();
    return orderYear === currentYear;
  });

  return (
    //  <> {isPending && <Spinner/>}
    <>
      <Container>
        <Header>REPORT GENERATION</Header>
        <l.Content>
          <l.ButtonArea>
            <Link
              to="/ManagerReportPreview"
              state={{ dataOrders: todayOrders, reportType: "Daily Report" }}
              className="btn"
            >
              <l.CustomRegularButton>
                <l.Icon>
                  <FontAwesomeIcon icon={faFilePdf} />
                </l.Icon>
                Daily Report
              </l.CustomRegularButton>
            </Link>
            <Link
              to="/ManagerReportPreview"
              state={{
                dataOrders: currentMonthOrders,
                reportType: "Monthly Report",
              }}
              className="btn"
            >
              <l.CustomRegularButton>
                <l.Icon>
                  <FontAwesomeIcon icon={faFilePdf} />
                </l.Icon>
                Monthly Report
              </l.CustomRegularButton>
            </Link>
            <Link
              to="/ManagerReportPreview"
              state={{
                dataOrders: currentYearOrders,
                reportType: "Annual Report",
              }}
              className="btn"
            >
              <l.CustomRegularButton>
                <l.Icon>
                  <FontAwesomeIcon icon={faFilePdf} />
                </l.Icon>
                Annual Report
              </l.CustomRegularButton>
            </Link>
          </l.ButtonArea>
        </l.Content>
        <l.Div3>
          <RegularButton>
            <Link to={props.BackRoutes} className="btn">
              Back
            </Link>
          </RegularButton>
        </l.Div3>
      </Container>
    </>
  );
};

export default ReportGenerationComponent;
