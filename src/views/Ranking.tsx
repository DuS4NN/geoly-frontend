import React, {useContext, useEffect, useState} from 'react'

// Children
import RankingImage from "../components/Ranking/RankingImage"
import RankingList from "../components/Ranking/RankingList"
import axios from "axios";
import {useHistory} from "react-router-dom"
import {RankingPlayer} from '../types'
import {UserContext} from "../UserContext";
import {useAlert} from "react-alert";
import '../components/Ranking/SmallDeviceRanking.scss'

// Props
interface Props {
}

// Component
const Ranking: React.FC = () => {

    const {userContext} = useContext(UserContext)
    const text = require('../assets/languageText/'+userContext['languageId']+'.ts').text

    // State
    const [top, setTop] = useState(null) as Array<any>
    const [user, setUser] = useState({})

    const history = useHistory()
    const alert = useAlert()

    var position = 0

    useEffect( () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/top'
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let data:RankingPlayer[] = response.data.data.map((player: any) => {
                    position++
                    return {
                        position: position,
                        points: player[0],
                        nickname: player[1],
                        profileImage: player[2]
                    } as unknown as RankingPlayer
                })

                setTop(data)
            }else{
                setTop([])
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        if(!userContext['nickName']) return

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/playerrank',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                let player:RankingPlayer = {
                    position: response.data.data[0][0],
                    points: response.data.data[0][1],
                    nickname: response.data.data[0][2],
                    profileImage: response.data.data[0][3]
                }
                if(player.position > 50){
                    setUser(player)
                }
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

    }, [userContext, position, setTop])



    // Template
    return (
        <div className="ranking">
            <RankingImage />
            <RankingList ranking={top} user={user}/>
        </div>
    )
}

export default Ranking
