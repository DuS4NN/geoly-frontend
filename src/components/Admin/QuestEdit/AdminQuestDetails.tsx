import React, {useRef} from "react"
import {NavLink, useHistory} from "react-router-dom"
import Select from "react-select";
import chroma from "chroma-js";
import Toggle from "react-toggle";
import axios from "axios"
import {useAlert} from "react-alert";

// Props
interface Props {
    details: any
    category:any
    setDetails: (details:any) => void
}

// Component
const AdminQuestDetails: React.FC<Props> = (props) => {

    const {details, category, setDetails} = props

    const adminText = require('../../../assets/languageText/admin').adminText
    const text = require('../../../assets/languageText/2.ts').text
    const alert = useAlert()
    const history = useHistory()

    const name = useRef(null) as any
    const description = useRef(null) as any

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

    const handleChangeCategory = (e:any) => {
        setDetails({
            ...details,
            category: e.value
        })
    }
    const handleChangeDifficulty = (e:any) => {
        setDetails({
            ...details,
            difficulty: e.value
        })
    }

    const handleChangeActive = () => {
        setDetails({
            ...details,
            active: !details.active
        })
    }
    const handleChangePrivate = () => {
        setDetails({
            ...details,
            privateQuest: !details.privateQuest
        })
    }
    const handleChangePremium = () => {
        setDetails({
            ...details,
            premium: !details.premium
        })
    }

    const handleEditQuest = () => {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_SERVER_URL+'/adminEditQuest',
            withCredentials: true,
            data: {
                id: details.id,
                name: name.current?.value,
                active: details.active,
                premium: details.premium,
                privateQuest: details.privateQuest,
                difficulty: details.difficulty,
                description: description.current?.value,
                category: details.category
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

    // Template
    return (
        <div className="adminQuestDetails">
            <div className="title">
                <span>{details.name}</span>
            </div>

            <div className="form">

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.user}</span>
                    </div>
                    <div className="itemContent">
                        <NavLink to={"/admin/user/"+details.userId}>{details.userId}</NavLink>
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.createdAt}</span>
                    </div>
                    <div className="itemContent">
                        <span>{new Date(details.createdAt).getDate()+". "+(new Date(details.createdAt).getMonth()+1)+". "+new Date(details.createdAt).getFullYear()+" "+ (new Date(details.createdAt).getHours() < 10 ? '0' : '') +new Date(details.createdAt).getHours()+":"+ (new Date(details.createdAt).getMinutes() < 10 ? '0' : '') +new Date(details.createdAt).getMinutes()}</span>
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.name}</span>
                    </div>
                    <div className="itemContent">
                        <input ref={name} maxLength={50} placeholder={adminText.questDetails.name} defaultValue={details.name} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.description}</span>
                    </div>
                    <div className="itemContent">
                        <textarea ref={description} maxLength={500} placeholder={adminText.questDetails.name} defaultValue={details.description} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.category}</span>
                    </div>
                    <div className="itemContent">
                        {category[0] && details.category && (
                            <Select
                                closeMenuOnSelect={true}
                                options={category}
                                onChange={handleChangeCategory}
                                className={"customSelect"}
                                defaultValue={category.filter((cat:any) => {return cat.value === details.category})}
                                placeholder={""}
                                styles={customStyle}
                            />
                        )}
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.difficulty}</span>
                    </div>
                    <div className="itemContent">
                        {difficulty[0] && details.difficulty && (
                            <Select
                                closeMenuOnSelect={true}
                                options={difficulty}
                                onChange={handleChangeDifficulty}
                                className={"customSelect"}
                                defaultValue={difficulty[details.difficulty-1]}
                                placeholder={""}
                                styles={customStyle}
                            />
                        )}
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.active}</span>
                    </div>
                    <div className="itemContent">
                        {details.name && (
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
                        <span>{adminText.questDetails.premium}</span>
                    </div>
                    <div className="itemContent">
                        {details.name && (
                            <Toggle
                                defaultChecked={details.premium}
                                onChange={handleChangePremium}
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
                        <span>{adminText.questDetails.private}</span>
                    </div>
                    <div className="itemContent">
                        {details.name && (
                            <Toggle
                                defaultChecked={details.privateQuest}
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
                    <button onClick={handleEditQuest}>{adminText.questDetails.submit}</button>
                </div>

            </div>

        </div>
    )
}

export default AdminQuestDetails
