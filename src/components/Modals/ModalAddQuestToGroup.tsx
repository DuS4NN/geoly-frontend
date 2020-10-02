import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import Select from "react-select";

import './Modal.scss'
import chroma from "chroma-js";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    questId: any
}

// Components
const ModalAddQuestToGroup: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    const [groups, setGroups] = useState([]) as Array<any>

    // Props state
    const {showModal, setShowModal, questId} = props

    const [selectedGroup, setSelectedGroup] = useState(0)

    const customStyle = {
        //@ts-ignore
        control: (styles, state) => ({ ...styles,
            backgroundColor: 'white',
            fontFamily: 'OpenSans',
            color: state.isFocused ? '#023a1c' : '',
            width: '100%',
            boxShadow: 'none',
            borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,80%)',
            '&:hover': {borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,60%)'}
        }),
        //@ts-ignore
        menuList: (styles, state) => ({...styles,
            height: '110px',
            position: 'relative'
        }),
        //@ts-ignore
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma('#2bb673');
            return {
                ...styles,
                fontFamily: 'OpenSans',
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : 'null',
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? '#2bb673'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                },
            };
        },
    };

    // Modal
    useEffect(() => {
        Modal.setAppElement("#root")

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/group/getallcreated',
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                setGroups(response.data.data.map((group:any) => {
                    return {
                        value: group[0],
                        label: group[1]
                    }
                }))
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })

    },[])
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
            url: process.env.REACT_APP_API_SERVER_URL+'/group/addquest?partyId='+selectedGroup+'&questId='+questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                handleCloseModal()
            }else if(serverResponse === 'QUEST_ALREADY_IN_GROUP' || serverResponse === 'QUEST_IS_PRIVATE'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    const handleQuestSelect = (e:any) => {
        setSelectedGroup(e.value)
    }

    // Template
    return (
        <ReactModal
            className="modal"
            closeTimeoutMS={500}
            isOpen={showModal}
            onAfterOpen={onAfterOpenModal}>

            <div className="image">
                <img src={require("../../assets/images/create.svg")} alt="" />
            </div>

            <div className="modal-form">
                <div className="title">
                    <h3>{text.groups.addQuestTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.groups.addQuestDesc}
                    </span>
                </div>

                <div className="form">

                    <div className="form-select">
                        <Select
                            closeMenuOnSelect={true}
                            onChange={handleQuestSelect}
                            options={groups}
                            placeholder={text.mapFilter.selectCategory}
                            noOptionsMessage={() => text.groups.noGroupLeft}
                            className="custom-select"
                            styles={customStyle}
                        />
                    </div>

                    <div className="form-submit-button">
                        <button onClick={handleSubmit}>{text.groups.add}</button>
                    </div>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalAddQuestToGroup
