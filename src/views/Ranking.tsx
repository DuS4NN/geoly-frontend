import React, {useContext, useEffect, useState} from 'react'

// Children
import RankingImage from "../components/Ranking/RankingImage"
import RankingList from "../components/Ranking/RankingList"
import axios from "axios";

import {RankingPlayer} from '../types'
import {UserContext} from "../UserContext";

// Props
interface Props {
}

// Component
const Ranking: React.FC = () => {

    // State
    const [top, setTop] = useState(Array())
    const [user, setUser] = useState({})

    //@ts-ignore
    const {userContext} = useContext(UserContext)

    var position = 0



    useEffect( () => {

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/top'
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let data:RankingPlayer[] = response.data.data.map((player: any) => extractData(player))

                setTop(data)
            }else{
                setTop([])
            }
        })

        if(!userContext['nickName']) return

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/playerrank',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'OK'){
                let player:RankingPlayer = extractPlayer(response.data.data[0])
                if(player.position > 50){
                    setUser(player)
                }
            }
        })

        const extractPlayer = (player:any) => {
            return {
                position: player[0],
                points: player[1],
                nickname: player[2],
                profileImage: player[3]
            } as unknown as RankingPlayer
        }

        const extractData = (player:any) => {
            position++
            return {
                position: position,
                points: player[0],
                nickname: player[1],
                profileImage: player[2]
            } as unknown as RankingPlayer
        }

    }, [userContext, position])



    // Template
    return (
        <div className="ranking">
            <RankingImage />
            <RankingList ranking={top} user={user}/>
        </div>
    )
}

export default Ranking
