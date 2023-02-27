import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    // axios cancel token
    // const CancelToken = axios.CancelToken();
    // const source = CancelToken.source()

    const [data, setData] = useState();

    useEffect(() => {
      
        const fetchData = async () => {
            try {
                const res = await axios.get(url);

                if (res.status === 200 || res.status === 201) {
                    setData(res.data);
                } else {
                    console.log('error');
                }

            } catch (error) {
                console.log(error);
                console.log(error.response?.data);
                console.log({ 'error.message': error?.message });
                if (error.message === 'cancel request') {
                    console.log('fetch aborted');
                } else {
                    setData(null);
                }
            }
        }

        setTimeout(() => {
            fetchData();
        }, 1500);
    
        return () => {
            // cancel axios request
            // source.cancel('cancel request');
        }
    }, [url]);// eslint-disable-line react-hooks/exhaustive-deps
    
    return {data}
}
 
export default useFetch;