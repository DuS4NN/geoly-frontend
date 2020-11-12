import React, {useEffect, useState} from "react"
import AdminQuestCreatorStageItem from "./AdminQuestCreatorStageItem";
import Select from "react-select";
import chroma from "chroma-js";

// Props
interface Props {
    stages: any
    setStages: (stages:any) => void
}

// Component
const AdminQuestCreatorStageList: React.FC<Props> = (props) => {

    const {setStages, stages} = props
    const [id, setId] = useState(0) as Array<any>

    const adminText = require('../../../assets/languageText/admin').adminText

    const [stageTypes] = useState([{
        value: 'GO_TO_PLACE',
        label: 'GO_TO_PLACE'
    }, {
        value: 'ANSWER_QUESTION',
        label: 'ANSWER_QUESTION'
    }, {
        value: 'SCAN_QR_CODE',
        label: 'SCAN_QR_CODE'
    }]) as Array<any>
    const [stageType, setStageType] = useState("GO_TO_PLACE") as Array<any>

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

    const handleAddStage = () => {
        if(stages.length >= 5) return

        setStages([
            ...stages,
            {
                id: id,
                type: stageType,
                answer: '',
                question: '',
                advise: '',
                answerList: '',
                latitude: stageType==='GO_TO_PLACE' ? 48.864716 : '',
                longitude: stageType==='GO_TO_PLACE' ? 2.349014 : '',
                qrCodeUrl: '',
                note: ''
            }
        ])
        setId(id+1)
    }

    useEffect(() => {
        handleAddStage()
    }, [])

    const handleChangeType = (e:any) => {
        setStageType(e.value)
    }

    // Template
    return (
        <div className="adminQuestCreatorStageList">
            <div className="title">
                <span>{adminText.questCreator.stages}</span>
            </div>

            {stages.length < 5 && (
                <div className="addStageButton">

                    <div className="typeSelection">
                        {stageTypes[0] && (
                            <Select
                                closeMenuOnSelect={true}
                                options={stageTypes}
                                onChange={handleChangeType}
                                className={"customSelect"}
                                defaultValue={stageTypes[0]}
                                placeholder={""}
                                styles={customStyle}
                            />
                        )}
                    </div>

                    <button onClick={handleAddStage}>{adminText.questCreator.addStage}</button>
                </div>
            )}

            {stages.map((stage:any) => (
                <AdminQuestCreatorStageItem stage={stage} stages={stages} setStages={setStages} key={stage.id} />
            ))}

        </div>
    )
}

export default AdminQuestCreatorStageList
