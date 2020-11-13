import React, {useEffect, useRef} from "react"

// Props
interface Props {
    stage: any
    stages: any
    setStages: (stages:any) => void
}

// Component
const StageItemScanQrCode: React.FC<Props> = (props) => {

    const {stage, stages, setStages} = props

    const adminText = require('../../../../assets/languageText/admin').adminText
    const userText = require('../../../../assets/languageText/2').text

    const noteRef = useRef(null) as any

    useEffect(() => {
        if(noteRef !== null){
            let newStages = [] as any

            stages.map((s:any) => {
                if(s.id !== stage.id){
                    newStages.push(s)
                }else{
                    newStages.push({
                        ...stage,
                        note: noteRef
                    })
                }
            })
            setStages(newStages)
        }
    }, [noteRef])


    // Template
    return (
        <div className="stageItemScanQrCode">

            <div className="formInput">
                <span className="label">
                    {userText.userQuest.note}
                </span>
                <div className="formContent">
                    <input maxLength={200} ref={noteRef} placeholder={userText.userQuest.note} />
                </div>
            </div>

            <div className="text">
                <span>{adminText.questCreator.qrCode}</span>
            </div>
        </div>
    )
}

export default StageItemScanQrCode
