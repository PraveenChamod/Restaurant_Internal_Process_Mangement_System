import { Container, Header } from "../shared/SharedElements/SharedElements";
import * as l from './SupplierItemsElement' 
import { FormButton, RegularButton } from "../shared/SharedElements/Buttons";
import { Link } from "react-router-dom";
import { BsFiletypePdf } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Viewer,Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
const SupplierItemsComponent = (props) => {
    const[pdf,setPdf] = useState(null);
    
    const[pdfView,setPdfView] = useState(null);
    const FileType = ['application/pdf'];
    const handleChange = (e)=>{
        let selectedFile = e.target.files[0];
        console.log(selectedFile);
        if(selectedFile){
            if(selectedFile && FileType.includes(selectedFile.type)){
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload=(e)=>{
                    setPdf(e.target.result)
                }
            }
            else{
                setPdf(null)
            }
        }
        else{
            toast.promise.error('Please Select PDF')
        }
    }
    const newPlugin = defaultLayoutPlugin();
    return ( 
        <Container>
            <l.Div1>
                <Header>Providing Items</Header>
                <l.Section>
                    <l.FormSection>
                        <l.Preview>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            {pdf && <>
                                    <Viewer fileUrl={pdf} plugins={[newPlugin]}/>
                                </>}
                                {!pdf && <Header>Upload Your PDF Here</Header>}
                            </Worker>
                        </l.Preview>
                        <l.PrintButton>
                            <l.Icon>
                                <BsFiletypePdf/>
                                <input type='file' id='file' accept="pdf" onChange={handleChange}/>
                            </l.Icon>
                        </l.PrintButton>
                    </l.FormSection>
                    <l.ButtonSection>
                        <FormButton>Add</FormButton>
                    </l.ButtonSection>
                </l.Section>
                <l.Div3>
                    <RegularButton>
                        <Link to={props.BackRoutes} className="btn">
                            Back
                        </Link>
                    </RegularButton>
                </l.Div3> 
            </l.Div1>
        </Container>
     );
}
 
export default SupplierItemsComponent;