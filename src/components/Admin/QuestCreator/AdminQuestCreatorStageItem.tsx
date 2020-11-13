import React from "react"
import StageItemGoToPlace from "./StageTypes/StageItemGoToPlace";
import StageItemAnswerQuestion from "./StageTypes/StageItemAnswerQuestion";
import StageItemScanQrCode from "./StageTypes/StageItemScanQrCode";

// Props
interface Props {
    stage: any
    stages: any
    setStages: (stage:any) => void
}

// Component
const AdminQuestCreatorStageItem: React.FC<Props> = (props) => {

    const {stage, stages, setStages} = props

    const adminText = require('../../../assets/languageText/admin').adminText

    const handleDeleteStage = () => {
        if(stage.id === 0) return
        setStages(stages.filter((s:any) => {
            return s.id !== stage.id
        }))
    }

    // Template
    return (
        <div className="adminQuestCreatorStageItem">


            {stage.type === 'GO_TO_PLACE' && (
                <StageItemGoToPlace stage={stage} setStages={setStages} stages={stages} />
            )}
            {stage.type === 'ANSWER_QUESTION' && (
                <StageItemAnswerQuestion stage={stage} stages={stages} setStages={setStages} />
            )}
            {stage.type === 'SCAN_QR_CODE' && (
                <StageItemScanQrCode stage={stage} setStages={setStages} />
            )}

            {stage.id !== 0 && (
                <div className="deleteStage">
                    <button onClick={handleDeleteStage}>{adminText.questCreator.delete}</button>
                </div>
            )}

        </div>
    )
}

export default AdminQuestCreatorStageItem
