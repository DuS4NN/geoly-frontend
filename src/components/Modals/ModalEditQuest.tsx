import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
//@ts-ignore
import disableScroll from 'disable-scroll'
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";


import './ModalEditQuest.scss'
import Toggle from "react-toggle";
import Select from "react-select";
import chroma from "chroma-js";
import ImageUpload from "../Elements/ImageUpload";

// Props
interface Props {
    showModal: boolean
    setShowModal: (show: boolean) => void
    createdQuest: any
    createdQuests: any
    setCreatedQuests: (createdQuests: any) => void
}

// Components
const ModalEditQuest: React.FC<Props> = (props) => {
    // Context
    const {userContext} = useContext(UserContext)
    const alert = useAlert()

    const {showModal, setShowModal, createdQuests, createdQuest, setCreatedQuests} = props

    const [category, setCategory] = useState([])
    const [images, setImages] = useState([]) as Array<any>

    const nameRef = useRef(null) as any
    const descriptionRef = useRef(null) as any

    const [selectedDifficulty, setSelectedDifficulty] = useState(createdQuest.questDifficulty)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [privateQuest, setPrivateQuest] = useState(createdQuest.questPrivate)

    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
        Modal.setAppElement("#root")

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/getimages?id='+createdQuest.questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body;

            if(serverResponse === 'OK'){
                let images = response.data.data.map((image:any) => extractImage(image))
                setImages(images)
            }
        })
        const extractImage = (image:any) => {
            let src = process.env.REACT_APP_IMAGE_SERVER_URL+image[0]
            return {
                src: src,
                id: image[1]
            }
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/categories'
        }).then(function (response) {
            let category = response.data.map((category:any) => extractCategory(category))
            setCategory(category)
        })
        const extractCategory = (category:any) => {
            if(category.name === createdQuest.categoryName){
                setSelectedCategory(category.id-1)
            }
            return {
                value: category.id,
                label: text.category[category.name.toLowerCase()]
            }
        }
    }, [])

    // Methods
    const handleKeyPress = (e: KeyboardEvent) => {
        if(e.code === 'Escape'){
            handleCloseModal()
        }
    }

    const handleCloseModal = () => {
        setShowModal(false)
        disableScroll.off()

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
        disableScroll.on(null,{
            disableKeys: false
        })

        document.addEventListener("keydown", handleKeyPress);
    }

    const difficulty = [
        {
            value: "1",
            label: "1",
        },
        {
            value: "2",
            label: "2"
        },
        {
            value: "3",
            label: "3"
        },
        {
            value: "4",
            label: "4"
        },
        {
            value: "5",
            label: "5"
        }
    ]

    const customStyle = {
        //@ts-ignore
        control: (styles, state) => ({ ...styles,
            backgroundColor: 'white',
            color: state.isFocused ? '#023a1c' : '',
            width: '100%',
            boxShadow: 'none',
            borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,80%)',
            '&:hover': {borderColor: state.isFocused ? '#2bb673' : 'hsl(0,0%,60%)'}
        }),
        //@ts-ignore
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma('#2bb673');
            return {
                ...styles,
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

    const handlePrivateChange = () => {
        setPrivateQuest(!privateQuest)
    }

    const handleSubmit = () => {
        console.log(nameRef.current?.value)
        console.log(descriptionRef.current?.value)
        console.log(selectedDifficulty)
        console.log(privateQuest)
        console.log(selectedCategory)

        console.log(images)

    }

    const handleDifficultyChange = (e:any) => {
        setSelectedDifficulty(e.value)
    }
    const handleCategoryChange = (e:any) => {
        setSelectedCategory(e.value)
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
                    <h3>{text.userQuest.deleteQuestTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.userQuest.deleteQuestDesc}
                    </span>
                </div>
                <div className="form">
                    <div className="form-name">
                        <input ref={nameRef} type="text" defaultValue={createdQuest.questName} />
                    </div>
                    <div className="form-description">
                        <textarea ref={descriptionRef}  defaultValue={createdQuest.questDescription} />
                    </div>
                    <div className="form-details">
                        <div className="form-difficulty">
                            <div className="label">{text.userQuest.difficultyLabel}</div>
                            <Select
                                closeMenuOnSelect={true}
                                onChange={handleDifficultyChange}
                                options={difficulty}
                                className={"customSelect"}
                                defaultValue={difficulty[createdQuest.questDifficulty-1]}
                                placeholder={""}
                                styles={customStyle}
                            />
                        </div>
                        <div className="form-private">
                            <div className="label">{text.userQuest.privateLabel}</div>
                            <br/>
                            <Toggle
                                defaultChecked={privateQuest}
                                className={"custom-toggle"}
                                onChange={handlePrivateChange}
                                icons={{
                                    checked: null,
                                    unchecked: null,
                                }}
                            />
                        </div>
                        <div className="form-category">
                            <div className="label">{text.userQuest.categoryLabel}</div>
                            <Select
                                closeMenuOnSelect={true}
                                options={category}
                                onChange={handleCategoryChange}
                                className={"customSelect"}
                                defaultValue={category[selectedCategory]}
                                placeholder={""}
                                styles={customStyle}
                            />
                        </div>
                    </div>
                    <div className="form-images">
                        <ImageUpload defaultImages={images} setImages={setImages} />
                    </div>

                    <button onClick={handleSubmit}>{text.userQuest.edit}</button>
                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalEditQuest
