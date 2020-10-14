import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import {NavLink} from "react-router-dom"
import {debounce} from "lodash-es";
import {useHistory} from "react-router-dom"
//@ts-ignore
import {FadeIn} from "react-anim-kit"

import './Modal.scss'
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    groupId: number
}

// Components
const ModalManageGroup: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const alert = useAlert()
    const history = useHistory()

    const {showModal, setShowModal, groupId} = props

    const [users, setUsers] = useState([]) as Array<any>
    const [searchResult, setSearchResult] = useState([]) as Array<any>
    const [searchInput, setSearchInput] = useState("")

    const refUser = useRef(null) as any

    // Modal
    useEffect(() => {
        Modal.setAppElement("#root")

        if(groupId){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/group/users?id='+groupId,
                withCredentials: true
            }).then(function (response) {
                let statusCode = response.data.responseEntity.statusCode
                if(statusCode === 'OK'){
                    let newUsers = response.data.data.map((user:any) => {
                        return {
                            userId: user[0],
                            userImage: user[1],
                            userName: user[2],
                            owner: user[3]
                        }
                    })
                    setUsers(newUsers)
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }

    },[groupId])
    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text


    // Methods
    const handleKeyPress = (e: KeyboardEvent) => {
        if(e.code === 'Escape'){
            handleCloseModal()
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        document.addEventListener("keydown", handleKeyPress);
    }

    const handleSubmit = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/invite?partyId='+groupId+'&nickName='+refUser.current.value,
            withCredentials: true
        }).then(function (response) {
            console.log(response)
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){
                setSearchInput("")
                alert.success(text.success[serverResponse])
            }else if(serverResponse === 'USER_IS_ALREADY_IN_GROUP' || serverResponse === 'GROUP_IS_FULL' || serverResponse === 'USER_NOT_FOUND'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    const handleKick = (userId:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/kick?partyId='+groupId+'&userId='+userId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                setUsers(users.filter(function (user:any) {
                    return user.userId !== userId
                }))

                alert.success(text.success[serverResponse])
            }else if(serverResponse === 'CAN_NOT_KICK_OWNER'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    const handleSearch = (e:any) => {
        setSearchInput(e.value)
        if(refUser.current?.value.length < 3){
            setSearchResult([])
            return
        }
        startSearch()
    }

    const startSearch = debounce(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/finduser?nick='+refUser.current?.value
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                setSearchResult(response.data.data)
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    },500)

    const handleSelectUser = (name:string) => {
        setSearchResult([])
        setSearchInput(name)
    }

    // Template
    return (
        <ReactModal
            className="modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/edit.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.groups.kickGroupTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.kickGroupDesc}
                    </span>
                </div>

                <div className="form">

                    <div className="form-input">
                        <input onChange={handleSearch} value={searchInput} ref={refUser} placeholder={text.groups.search} />
                    </div>

                    {searchResult.length > 0 && (
                        <div className="form-search-result">
                            <FadeIn left by={70} delayBy={0.05}>
                            {searchResult.map((user:any) => (
                                <div onClick={() => handleSelectUser(user)} key={user} className="result-item">
                                    <span>{user}</span>
                                </div>
                            ))}
                            </FadeIn>
                        </div>
                    )}

                    <div className="form-submit-button">
                        <button onClick={handleSubmit}>{text.groups.invite}</button>
                    </div>

                    <div className="form-list">
                        {users.map((user:any) => (
                            <div key={user.userId} className="list-quest-item">
                                <div className="item-image">
                                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+user.userImage} />
                                </div>
                                <div className="item-name">
                                    <NavLink to={"/profile/"+user.userName}>{user.userName}</NavLink>
                                </div>
                                <div className="item-delete">
                                    {!user.owner && (
                                        <img onClick={() => handleKick(user.userId)} alt="" data-tip={text.groups.kick} src={require("../../assets/images/otherIcons/kick.svg")} />
                                    )}
                                    <ReactTooltip />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalManageGroup
