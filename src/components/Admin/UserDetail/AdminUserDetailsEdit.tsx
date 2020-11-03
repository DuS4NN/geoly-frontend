import React, {useEffect, useRef, useState} from "react"
import axios from "axios";
import chroma from "chroma-js";
import Select from "react-select";
import Toggle from "react-toggle";
import {useAlert} from "react-alert";
import {useHistory} from "react-router-dom";
import {add} from "lodash-es";

// Props
interface Props {
    details: any
    setDetails: (details:any) => void
}

// Component
const AdminUserDetailsEdit: React.FC<Props> = (props) => {

    const {details, setDetails} = props

    const [languages, setLanguages] = useState([]) as Array<any>

    const nickName = useRef(null) as any
    const email = useRef(null) as any
    const address = useRef(null) as any
    const about = useRef(null) as any

    const adminText = require('../../../assets/languageText/admin.ts').adminText
    const text = require('../../../assets/languageText/2.ts').text

    const alert = useAlert()
    const history = useHistory()
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

    const handleEditUser = () => {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminEditUser',
            withCredentials: true,
            data: {
                id: details.id,
                nickName: nickName.current?.value,
                email: email.current?.value,
                address: address.current?.value,
                about: about.current?.value,
                language: details.language,
                active: details.active,
                verified: details.verified,
                privateProfile: details.private
            }
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(adminText.success[serverResponse])
            }else if(statusCode === 'BAD_REQUEST'){
                alert.error(text.error[serverResponse])
            }else{
                alert.error(adminText.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }

    const handleRemoveImage = () => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminRemoveProfileImage?id='+details.id,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                setDetails({
                    ...details,
                    image: 'static/images/user/default_profile_picture.png'
                })

                alert.success(adminText.success[serverResponse])
            }else{
                alert.error(adminText.error.SOMETHING_WENT_WRONG)
            }
        }).catch(function () {
            history.push("/welcome")
            alert.error(adminText.error.SOMETHING_WENT_WRONG)
        })
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getlanguages'
        }).then(function (response) {
            let newLanguages = response.data.map((language:any) => {
                return {
                    value: language.id,
                    label: adminText.language[language.name],
                    image: require('../../../assets/images/languageImages/'+(language.name).toLowerCase()+'.svg')
                }
            })

            setLanguages(newLanguages)
        })
    }, [])

    const handleChangeLanguage = (e:any) => {
        setDetails({
            ...details,
            language: e.value
        })
    }
    const handleChangeActive = () => {
        setDetails({
            ...details,
            active: !details.active
        })
    }
    const handleChangeVerified = () => {
        setDetails({
            ...details,
            verified: !details.verified
        })
    }
    const handleChangePrivate = () => {
        setDetails({
            ...details,
            private: !details.private
        })
    }


    // Template
    return (
        <div className="adminUserDetailsEdit">
            <div className="title">
                <span>{details.nick}</span>
            </div>
            <div className="form">

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.image}</span>
                    </div>
                    <div className="itemContent">
                        <div className="image">
                            <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+details.image} />
                        </div>
                        <div className="deleteButton">
                            <button onClick={handleRemoveImage}>{adminText.userDetails.delete}</button>
                        </div>
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.nick}</span>
                    </div>
                    <div className="itemContent">
                        <input ref={nickName} maxLength={15} placeholder={adminText.userDetails.nick} defaultValue={details.nick} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.email}</span>
                    </div>
                    <div className="itemContent">
                        <input ref={email} placeholder={adminText.userDetails.email} defaultValue={details.email} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.address}</span>
                    </div>
                    <div className="itemContent">
                        <input ref={address} placeholder={adminText.userDetails.address} defaultValue={details.address} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.about}</span>
                    </div>
                    <div className="itemContent">
                        <textarea ref={about} maxLength={500} placeholder={adminText.userDetails.about} defaultValue={details.about} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.language}</span>
                    </div>
                    <div className="itemContent">
                        {languages[0] && details.language && (
                            <Select
                                closeMenuOnSelect={true}
                                options={languages}
                                onChange={handleChangeLanguage}

                                className={"customSelect"}
                                defaultValue={languages.filter((cat:any) => {return cat.value === details.language})}
                                placeholder={""}
                                styles={customStyle}
                            />
                        )}
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.active}</span>
                    </div>
                    <div className="itemContent">
                        {details.language && (
                            <Toggle
                                defaultChecked={details.active}
                                onChange={handleChangeActive}
                                icons={{
                                    checked: null,
                                    unchecked: null,
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.verified}</span>
                    </div>
                    <div className="itemContent">
                        {details.language && (
                            <Toggle
                                defaultChecked={details.verified}
                                onChange={handleChangeVerified}
                                icons={{
                                    checked: null,
                                    unchecked: null,
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.userDetails.private}</span>
                    </div>
                    <div className="itemContent">
                        {details.language && (
                            <Toggle
                                defaultChecked={details.private}
                                onChange={handleChangePrivate}
                                icons={{
                                    checked: null,
                                    unchecked: null,
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="formButton">
                    <button onClick={handleEditUser}>{adminText.userDetails.submit}</button>
                </div>

            </div>
        </div>
    )
}

export default AdminUserDetailsEdit

