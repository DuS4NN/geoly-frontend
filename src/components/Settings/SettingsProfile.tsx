import React, {useContext, useRef, useState} from "react"
import {UserContext} from "../../UserContext";
import ModalDeleteProfilePicture from "../Modals/ModalDeleteProfilePicture";
import Select, {components} from "react-select";
import chroma from "chroma-js";
import Toggle from "react-toggle";
import axios from 'axios'

import './SettingsItems.scss'
import {useAlert} from "react-alert";

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

    const ref = useRef(null) as any

    const [newImage, setNewImage] = useState(null) as Array<any>

    const [showModal, setShowModal] = useState(false) as Array<any>

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

    const handleSubmit = () => {
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
        })

        axios({
            
        })

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

    // Template
    return (
        <div className="settings-profile">

            <ModalDeleteProfilePicture showModal={showModal} setShowModal={setShowModal} setSettings={setSettings} settings={settings} />


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
                <textarea maxLength={500} ref={ref} defaultValue={settings.about} placeholder={text.settings.textAreaPlaceholder} />
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
                {settings.languageId  && (
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

            <div className="settings-submit">
                <button onClick={handleSubmit}>{text.settings.save}</button>
            </div>

        </div>
    )
}

export default SettingsProfile
