import React from "react"
import Select from "react-select";
import Toggle from "react-toggle";
import chroma from "chroma-js";

// Props
interface Props {
    categories: any
    details: any
    setDetails: (details:any) => void
    nameRef: any
    descriptionRef: any
}

// Component
const AdminQuestCreatorForm: React.FC<Props> = (props) => {

    const {categories, details, setDetails, nameRef, descriptionRef} = props

    const adminText = require('../../../assets/languageText/admin').adminText

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
    const handleChangePremium = () => {
        setDetails({
            ...details,
            premium: !details.premium
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
        <div className="adminQuestCreatorForm">
            <div className="title">
                <span>{adminText.questCreator.title}</span>
            </div>

            <div className="form">

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.name}</span>
                    </div>
                    <div className="itemContent">
                        <input ref={nameRef} maxLength={50} placeholder={adminText.questDetails.name} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.description}</span>
                    </div>
                    <div className="itemContent">
                        <textarea ref={descriptionRef} maxLength={500} placeholder={adminText.questDetails.description} />
                    </div>
                </div>

                <div className="formItem">
                    <div className="itemLabel">
                        <span>{adminText.questDetails.category}</span>
                    </div>
                    <div className="itemContent">
                        {categories[0] && details.category && (
                            <Select
                                closeMenuOnSelect={true}
                                options={categories}
                                onChange={handleChangeCategory}
                                className={"customSelect"}
                                defaultValue={categories.filter((cat:any) => {return cat.value === details.category})}
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
                        {details.category && (
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
                        {details.category && (
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
                        {details.category && (
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

            </div>

        </div>
    )
}

export default AdminQuestCreatorForm
