import React, {useContext, useEffect, useRef, useState} from "react"
import {UserContext} from "../../UserContext";
import ModalDeleteProfilePicture from "../Modals/ModalDeleteProfilePicture";
import Select, {components} from "react-select";
import chroma from "chroma-js";
import Toggle from "react-toggle";
import axios from 'axios'
import { Picker } from 'emoji-mart'
import {useAlert} from "react-alert";
import ModalCancelSubscription from "../Modals/ModalCancelSubscription";
import {useHistory} from "react-router-dom"
import './SettingsItems.scss'
import '../Elements/EmojiPicker.scss'
// Props
interface Props {
    settings: any
    languages: any
    setSettings: (settings:any) => void
}

// Component
const SettingsProfile: React.FC<Props> = (props) => {
    const {Option} = components;
    const {setSettings, settings, languages} = props
    const {userContext, setUserContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()
    const history = useHistory()
    const ref = useRef(null) as any
    const emojiPicker = useRef(null) as any

    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [loadingSubmitImage, setLoadingSubmitImage] = useState(false)

    const [newImage, setNewImage] = useState(null) as Array<any>
    const [showEmojiPicker, setShowEmojiPicker] = useState(false) as Array<any>
    const [showModal, setShowModal] = useState(false) as Array<any>
    const [showCancelModal, setShowCancelModal] = useState(false) as Array<any>
    const [aboutValue, setAboutValue] = useState("")

    useEffect(() => {
        if(settings != null){
            setAboutValue(settings.about)
        }
    }, [settings])

    const handleChangeImage = (e:any) => {
        let image = e.target.files[0]
        setNewImage(image)
    }

    const handleShowModal = () => {
        setShowModal(true)
    }

    const handleChangeLanguage = (e:any) => {
        setSettings({
            ...settings,
            languageId: e.value
        })
    }

    const handleChangePrivate = () => {
        setSettings({
            ...settings,
            privateProfile: !settings.privateProfile
        })
    }

    const handleCancelSubscription = () => {
        setShowCancelModal(true)
    }

    const handleSubmit = () => {
        setLoadingSubmit(true)
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/settings?language='+settings.languageId,
            withCredentials: true,
            data: {
                about: ref.current?.value,
                languageId: settings.languageId,
                privateProfile: settings.privateProfile
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){

                setUserContext({
                    ...userContext,
                    languageId: settings.languageId
                })

                alert.success(text.success[serverResponse])
            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
            setLoadingSubmit(false)
        }).catch(function () {
            history.push("/welcome")
            alert.error(text.error.SOMETHING_WENT_WRONG)
        })

        if(newImage === null) return

        let data = new FormData()
        data.append('file', newImage)

        setLoadingSubmitImage(true)
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/settings/setimage',
            withCredentials: true,
            data: data
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])
                setUserContext({
                    ...userContext,
                    profileImage: '/images/user/'+settings.userId+'/'+settings.userId+'.jpg'
                })
            }else if(statusCode === 'METHOD_NOT_ALLOWED'){
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

    const handleShowEmojiPicker = () => {
        setShowEmojiPicker(true)
    }

    const handleEmojiSelect = (e:any) => {
        if(aboutValue.length>=500) return
        setAboutValue(aboutValue + e.native)
    }

    const handleAboutChange = (e:any) => {
        setAboutValue(e.target.value)
    }

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
    //@ts-ignore
    const IconOption = (props: languages) => (
        <Option {...props}>
            <div className="map-filter-select">
                <div className="map-filter-select-image">
                    <img src={props.data.image} alt=""/>
                </div>
                <div className="map-filter-select-label">
                    {props.data.label}
                </div>
            </div>
        </Option>
    )

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
        <div className="settings-profile">

            {settings === null && (
                <div className="loading">
                    <img alt="" src={require("../../assets/images/otherIcons/loading.svg")} />
                </div>
            )}

            {settings !== null && (
                <div>
                    <ModalDeleteProfilePicture showModal={showModal} setShowModal={setShowModal} setSettings={setSettings} settings={settings} />
                    <ModalCancelSubscription showModal={showCancelModal} setShowModal={setShowCancelModal} settings={settings} setSettings={setSettings} />

                    <div className="settings-image">
                        <div className="settings-label">
                            <span>{text.settings.profileImage}</span>
                        </div>
                        <div className="image-show">
                            <img alt="" src={newImage === null ? process.env.REACT_APP_IMAGE_SERVER_URL+settings.profileImage : URL.createObjectURL(newImage)} />
                        </div>

                        <div className="input-wrapper">
                            {text.imageUploader.buttonText}<input onChange={handleChangeImage} accept="image/jpeg, image/jpg, image/png" className="file-input hidden" type="file" />
                        </div>

                        <div className="image-delete">
                            <button onClick={handleShowModal}>{text.settings.delete}</button>
                        </div>
                    </div>

                    <div className="settings-about">
                        <div className="settings-label">
                            <span>{text.settings.about}</span>
                        </div>


                        <textarea maxLength={500} ref={ref} defaultValue={settings.about} value={aboutValue} onChange={handleAboutChange} placeholder={text.settings.textAreaPlaceholder} />
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

                    <div className="settings-language">
                        <div className="settings-label">
                            <span>{text.settings.language}</span>
                        </div>
                        {languages[0] && settings.languageId && (
                            <Select
                                closeMenuOnSelect={true}
                                options={languages}
                                onChange={handleChangeLanguage}
                                components={{Option: IconOption}}
                                className={"customSelect"}
                                defaultValue={languages.filter((cat:any) => {return cat.value === settings.languageId})}
                                placeholder={""}
                                styles={customStyle}
                            />
                        )}
                    </div>

                    <div className="settings-private">
                        <div className="settings-label">
                            <span>{text.settings.private}</span>
                        </div>
                        {settings.languageId && (
                            <Toggle
                                defaultChecked={settings.privateProfile}
                                onChange={handleChangePrivate}
                                icons={{
                                    checked: null,
                                    unchecked: null,
                                }}
                            />
                        )}
                    </div>


                    {settings.premium > 0 && (
                        <div className="settings-subscription">
                            <button onClick={handleCancelSubscription}>{text.settings.cancelSubscription}</button>
                        </div>
                    )}

                    <div className="settings-submit">
                        <button onClick={handleSubmit}>{(loadingSubmit || loadingSubmitImage) && (<img alt="" src={require("../../assets/images/otherIcons/loading-button.svg")} />)}{text.settings.save}</button>
                    </div>
                </div>
            )}


        </div>
    )
}

export default SettingsProfile
