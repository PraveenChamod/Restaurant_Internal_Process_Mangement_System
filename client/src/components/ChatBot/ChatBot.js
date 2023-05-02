import { useEffect } from "react";

const ChatBot = () => {
    useEffect(() => {
        (function(d, m){
            var kommunicateSettings = {"appId":"33c9ae9a0b40550a832c4974d7f1db383","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
          })(document, window.kommunicate || {});
    }, [])
    
    return ( 
        <></>
     );
}
 
export default ChatBot;