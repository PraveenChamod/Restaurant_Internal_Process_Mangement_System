import ReportGenerationComponent from "../../components/Manager_Components/ReportGeneration/ReportGeneration";
import Spinner from "../../components/shared/Spinner/Spinner";
import useFetch from "../../Hooks/useFetch";


const ReportGeneration = () => {

    const {data,isPending} = useFetch ('api/v1/Orders');
    console.log(data);
    return ( 
        <>
            {isPending && <Spinner/>}
            {data && <ReportGenerationComponent data1 = {data} />}
        </>
     );
}
 
export default ReportGeneration;