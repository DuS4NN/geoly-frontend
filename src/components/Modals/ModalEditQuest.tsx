import React, {useContext, useEffect, useRef, useState} from "react"
import ReactModal from "react-modal"
import Modal from 'react-modal';
import axios from "axios"
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";
import Toggle from "react-toggle";
import Select from "react-select";
import chroma from "chroma-js";
import ImageUpload from "../Elements/ImageUpload";
import {Picker} from "emoji-mart";
import {useHistory} from "react-router-dom"
import './Modal.scss'
import '../Elements/EmojiPicker.scss'

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
    const history = useHistory()

    const {showModal, setShowModal, createdQuests, createdQuest, setCreatedQuests} = props

    const [category, setCategory] = useState([]) as Array<any>
    const [images, setImages] = useState([]) as Array<any>
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [loadingSubmitImage, setLoadingSubmitImage] = useState(false)

    const nameRef = useRef(null) as any
    const descriptionRef = useRef(null) as any

    const [selectedDifficulty, setSelectedDifficulty] = useState(createdQuest.questDifficulty)
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [privateQuest, setPrivateQuest] = useState(createdQuest.questPrivate)

    const [deletedQuests, setDeletedQuests] = useState([]) as Array<any>
    const [addedQuests, setAddedQuests] = useState([]) as Array<any>

    const emojiPicker = useRef(null) as any
    const [showEmojiPicker, setShowEmojiPicker] = useState(false) as Array<any>
    const [descriptionValue, setDescriptionValue] = useState("")

    // Text
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    useEffect(() => {
       setDescriptionValue(createdQuest.questDescription)
    },[createdQuest.questDescription])

    useEffect(() => {
        Modal.setAppElement("#root")

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/getimages?id='+createdQuest.questId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.statusCode;

            if(serverResponse === 'OK'){
                let images = response.data.data.map((image:any) => extractImage(image))
                setImages(images)
            }else if(serverResponse === 'NO_CONTENT'){
                setImages([])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
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
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })
        const extractCategory = (category:any) => {
            if(category.name === createdQuest.categoryName){
                setSelectedCategory(category.id)
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

        document.removeEventListener("keydown", handleKeyPress);
    }

    const onAfterOpenModal = () => {
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
            fontFamily: 'OpenSans',
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

    const handlePrivateChange = () => {
        setPrivateQuest(!privateQuest)
    }

    const handleSubmit = () => {
        if(nameRef.current?.value.length === 0 || nameRef.current?.value.length > 50){
            alert.error(text.error.INVALID_NAME_LENGTH_SIZE)
            return
        }
        if(descriptionRef.current?.value.length === 0 || descriptionRef.current?.value.length > 500){
            alert.error(text.error.INVALID_DESCRIPTION_LENGTH_SIZE)
        }

        const extractCreatedQuests = (quest:any) => {
            if(quest.questId !== createdQuest.questId){
                return quest
            }else{
                let categoryName = ""

                for(let i=0; i<category.length; i++){
                    if(category[i].value === selectedCategory){
                        categoryName = category[i].label
                    }
                }
                return {
                    ...quest,
                    questName:  nameRef.current?.value,
                    reviewRate: 'assets/images/categoryImages/'+'view'+'.svg',
                    questDescription: descriptionRef.current?.value,
                    questDifficulty: selectedDifficulty,
                    questPrivate: privateQuest,
                    categoryName: categoryName,
                    categoryImage: 'assets/images/categoryImages/'+categoryName.toLowerCase()+'.svg'
                }
            }
        }

        setLoadingSubmit(true)
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/quest/editdetail?id='+createdQuest.questId,
            withCredentials: true,
            data: {
                categoryId: selectedCategory,
                description: descriptionRef.current?.value,
                privateQuest: privateQuest,
                difficulty: selectedDifficulty,
                name: nameRef.current?.value
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED') {
                alert.success((text.success[serverResponse]))

                let newCreatedQuests = createdQuests.map((quest:any) => extractCreatedQuests(quest))
                setCreatedQuests(newCreatedQuests)

                if(deletedQuests.length === 0 && addedQuests.length === 0){
                    handleCloseModal()
                }

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
            setLoadingSubmit(false)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        if(deletedQuests.length > 0 || addedQuests.length > 0){
            let data = new FormData()

            for(let i=0; i<addedQuests.length; i++){
                data.append('files', addedQuests[i].src)
            }

            setLoadingSubmitImage(true)
            axios({
                method: 'POST',
                url: process.env.REACT_APP_API_SERVER_URL+'/quest/editimage?id='+createdQuest.questId+'&deleted='+deletedQuests,
                withCredentials: true,
                data: data
            }).then(function (response) {
                let serverResponse = response.data.responseEntity.body
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'ACCEPTED'){
                    alert.success(text.success[serverResponse])
                    handleCloseModal()
                }else if(serverResponse === 'IMAGE_SIZE_TOO_BIG' || serverResponse === 'UNSUPPORTED_IMAGE_TYPE' || serverResponse === 'TOO_MANY_IMAGES'){
                    alert.error(text.error[serverResponse])
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
                setLoadingSubmitImage(false)
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }
    }

    const handleDifficultyChange = (e:any) => {
        setSelectedDifficulty(e.value)
    }
    const handleCategoryChange = (e:any) => {
        setSelectedCategory(e.value)
    }

    const handleShowEmojiPicker = () => {
        setShowEmojiPicker(true)
    }
    const handleEmojiSelect = (e:any) => {
        if(descriptionValue.length>=500) return
        setDescriptionValue(descriptionValue + e.native)
    }

    const handleDescriptionChange = (e:any) => {
        setDescriptionValue(e.target.value)
    }

    function useClickOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {

                if (showEmojiPicker && ref.current && !ref.current.contains(e.target)) {
                    setShowEmojiPicker(false)
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [emojiPicker, showEmojiPicker]);
    }
    useClickOutside(emojiPicker)

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
                    <h3>{text.userQuest.editQuestTitle}</h3>
                </div>
                <div className="subtitle">
                    <span>
                        {text.userQuest.editQuestSubTitle}
                    </span>
                </div>
                <div className="form">
                    <div className="form-input">
                        <input ref={nameRef} type="text" defaultValue={createdQuest.questName} />
                    </div>
                    <div className="form-textarea">
                        <textarea ref={descriptionRef} maxLength={500}  value={descriptionValue} onChange={handleDescriptionChange}/>
                        <span onClick={handleShowEmojiPicker} className="emoji-picker-button"><img alt="" src={require("../../assets/images/otherIcons/emojiPicker.svg")} /></span>
                        {showEmojiPicker && (
                            <span ref={emojiPicker} className="emoji-picker">
                                <div className="emoji-triangle">
                                </div>
                                <Picker
                                    onSelect={handleEmojiSelect}
                                    set={"facebook"}
                                    theme={userContext['darkMode'] ? "dark" : "light"}
                                />
                            </span>
                        )}
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
                                defaultValue={category.filter((cat:any) => {return cat.value === selectedCategory})}
                                placeholder={""}
                                styles={customStyle}
                            />
                        </div>
                    </div>
                    <div className="form-images">
                        <ImageUpload addedQuests={addedQuests}
                                     setAddedQuests={setAddedQuests}
                                     deletedQuests={deletedQuests}
                                     setDeletedQuests={setDeletedQuests}
                                     defaultImages={images}
                                     setImages={setImages} />
                    </div>

                    <div className="form-submit-button">
                        <button onClick={handleSubmit}>{(loadingSubmit || loadingSubmitImage) && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.userQuest.edit}</button>
                    </div>

                </div>
            </div>

            <div className="close-modal">
                <button onClick={handleCloseModal}>X</button>
            </div>
        </ReactModal>
    )
}

export default ModalEditQuest
