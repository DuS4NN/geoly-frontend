import React from "react"
import Select from "react-select";
import chroma from "chroma-js";

interface Props {
    logTypes: any
    setSelectedType: (selectedType: any) => void
    setPage: (page:number) => void
}

// Component
const AdminLogSelect: React.FC<Props> = (props) => {

    const {logTypes, setSelectedType, setPage} = props

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

    const handleChangeLogType = (e:any) => {
        setSelectedType(e.value)
        setPage(1)
    }

    // Template
    return (
        <div className="adminLogSelect">

            <div className="title">
                <span>{text.log.title}</span>
            </div>

            <div className="select">
                {logTypes.length>0 && (
                    <Select
                        closeMenuOnSelect={true}
                        options={logTypes}
                        onChange={handleChangeLogType}
                        className={"customSelect"}
                        defaultValue={logTypes[0]}
                        placeholder={""}
                        styles={customStyle}
                    />
                )}
            </div>

        </div>
    )
}

export default AdminLogSelect
