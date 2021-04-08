import {useEffect, useContext} from 'react';
import {UserContext} from "../UserContext";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";


function useUserLogin() {

    const {userContext, setUserContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()

    useEffect(() => {
        if(!userContext['nickName'] || !localStorage.getItem("nickName")){
            alert.error(text.error.UNAUTHORIZED)

            let newUser = {
                nickName: null,
                profileImage: null,
                languageId: userContext['languageId'],
                mapTheme: userContext['mapTheme'],
                darkMode: userContext['darkMode']
            }
            setUserContext(newUser)

            history.push("/login")
        }
    });
}


export default useUserLogin
