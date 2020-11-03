import React, {useEffect, useState} from "react"
import axios from "axios";
import chroma from "chroma-js";
import Select from "react-select";
import Toggle from "react-toggle";

// Props
interface Props {
    details: any
    setDetails: (details:any) => void
}

// Component
const AdminUserDetailsEdit: React.FC<Props> = (props) => {

    const {details, setDetails} = props

    const [languages, setLanguages] = useState([]) as Array<any>

    const text = require('../../../assets/languageText/admin').adminText

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


    useEffect(() => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/getlanguages'
        }).then(function (response) {
            let newLanguages = response.data.map((language:any) => {
                return {
                    value: language.id,
                    label: text.language[language.name],
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
                        <span>{text.userDetails.image}</span>
                    </div>
                    <div className="itemContent">
                        <div className="image">
                            <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+details.image} />
                        </div>
                        <div className="deleteButton">
                            <button>{text.userDetails.delete}</button>
                        </div>
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{text.userDetails.nick}</span>
                    </div>
                    <div className="itemContent">
                        <input placeholder={text.userDetails.nick} defaultValue={details.nick} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{text.userDetails.email}</span>
                    </div>
                    <div className="itemContent">
                        <input placeholder={text.userDetails.email} defaultValue={details.email} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{text.userDetails.address}</span>
                    </div>
                    <div className="itemContent">
                        <input placeholder={text.userDetails.address} defaultValue={details.address} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{text.userDetails.about}</span>
                    </div>
                    <div className="itemContent">
                        <textarea placeholder={text.userDetails.about} defaultValue={details.about} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{text.userDetails.language}</span>
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
                        <span>{text.userDetails.active}</span>
                    </div>
                    <div className="itemContent">
                        {details.active && (
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
                        <span>{text.userDetails.verified}</span>
                    </div>
                    <div className="itemContent">
                        {details.verified && (
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
                        <span>{text.userDetails.private}</span>
                    </div>
                    <div className="itemContent">
                        {details.verified && (
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
                    <button>{text.userDetails.submit}</button>
                </div>

            </div>
        </div>
    )
}

export default AdminUserDetailsEdit

