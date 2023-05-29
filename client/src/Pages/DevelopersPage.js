import Developers from "../components/Developers/Developers";

const DevelopersPage = (props) => {
    return ( 
        <>
            <Developers developers={props.developers} />
        </>
     );
}
 
export default DevelopersPage;