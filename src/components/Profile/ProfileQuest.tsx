import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../UserContext"
import {useHistory} from "react-router-dom"
import axios from 'axios'
// Style
import './ProfileQuest.scss'
import ProfileQuestItem from "./ProfileQuestItem";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {useAlert} from "react-alert";

// Props
interface Props {
    playedQuests: any
    createdQuests: any
    createdLength: any
    playedLength: any
    nick: any
}

// Component
const ProfileQuest: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const history = useHistory()
    const alert = useAlert()

    const {playedQuests, createdQuests, createdLength, playedLength, nick} = props

    const [selected, setSelected] = useState(0) as Array<any>
    const [quests, setQuests] = useState([]) as Array<any>
    const [page, setPage] = useState(1) as Array<any>

    useEffect(() => {
        if(createdQuests.length>0){
            setQuests(createdQuests)
        }
    }, [createdQuests])

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getQuests(value)
    };

    const getQuests = (page:number) => {
        let url = selected === 0 ? "/profile/created" : "/profile/finished"

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+url+"?nickName="+nick+"&page="+page
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                setQuests(response.data.data.map((quest:any) => {
                    return {
                        categoryImage: quest[0],
                        categoryName: quest[1],
                        questDifficulty: quest[2],
                        questId: quest[3],
                        userName: quest[4],
                        userImage: quest[5],
                        questDate: new Date(quest[6]),
                        questName: quest[7]
                    }
                }))
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
    }

    const handleSelectCreated = () => {
        if(selected === 0){
            return
        }
        setSelected(0)
        setQuests(createdQuests)
    }
    const handleSelectFinished = () => {
        if(selected === 1){
            return
        }
        setSelected(1)
        setQuests(playedQuests)
    }

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }))
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#30dd8a",
            },
        },
    });
    const classes = useStyles();

    // Template
    return (
      <div className="profile-quest">
          <div className="profile-quest-navigation">
              <div onClick={handleSelectCreated} className={selected === 0 ? "profile-quest-navigation-item selected" : "profile-quest-navigation-item"}>

                  <div className="item-name">
                      <span>{text.profile.createdQuests}</span>
                  </div>
              </div>
              <div onClick={handleSelectFinished} className={selected === 1 ? "profile-quest-navigation-item selected" : "profile-quest-navigation-item"}>

                  <div className="item-name">
                      <span>{text.profile.finishedQuests}</span>
                  </div>
              </div>
          </div>

          {quests.length > 0 ?
              (
              <div>
                  {quests.map((quest:any) => (
                      <ProfileQuestItem key={quest.questId} quest={quest} />
                  ))}

                  {( (selected === 0 && createdLength > 5) || (selected === 1 && playedLength > 5) ) && (
                      <MuiThemeProvider theme={theme}>
                          <Pagination
                              className={classes.alignItemsAndJustifyContent + " pagination"}
                              count={selected === 0 ? Math.ceil(createdLength/5) : Math.ceil(playedLength/5)}
                              page={page}
                              color="primary"
                              onChange={handleChangePage}
                          />
                      </MuiThemeProvider>
                  )}
              </div>
              ) : (
              <div className="no-data">
                <div className="title">{selected === 0 ? ""+text.profile.noCreatedQuests : ""+text.profile.noFinishedQuests}</div>
                  <img src={require("../../assets/images/noData.svg")} alt="" />
              </div>
              )}
      </div>
    )
}

export default ProfileQuest
