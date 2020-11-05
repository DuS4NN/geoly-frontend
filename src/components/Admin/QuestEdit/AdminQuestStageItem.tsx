import React, {useState} from "react"

// Props
interface Props {
    stage: any
}

// Components
const AdminQuestStageItem: React.FC<Props> = props => {
    const {stage} = props

    const [roll, setRoll] = useState(false) as Array<any>

    const text = require('../../../assets/languageText/2.ts').text


    const handleRoll = () => {
        setRoll(!roll)
    }


    const returnGoToPlace = () => {
        return (
            <div className="stage-items">
                <div className="form-input">
                <span className="label">
                    {text.userQuest.latitude}
                </span>
                    <input disabled={true} defaultValue={stage.latitude} maxLength={200} placeholder={text.userQuest.latitude} />
                </div>

                <br/>

                <div className="form-input">
                <span className="label">
                    {text.userQuest.longitude}
                </span>
                    <input disabled={true} defaultValue={stage.longitude} maxLength={200} placeholder={text.userQuest.longitude} />
                </div>
            </div>
        )
    }

    const returnAnswerQuestion = () => {
    return (
        <div className="stage-items">

            <div className="form-input">
                <span className="label">{text.userQuest.question}</span>
                <input disabled={true} maxLength={200} defaultValue={stage.question} placeholder={text.userQuest.question}/>
            </div>
            <br/>
            <div className="form-input">
                <span className="label">{text.userQuest.answer}</span>
                <input disabled={true} maxLength={200} value={stage.answer} placeholder={text.userQuest.answer}/>
            </div>
            <br/>
            <div className="form-input">
                <span className="label">
                    {text.userQuest.advise}
                </span>
                <input disabled={true} defaultValue={stage.advise} maxLength={200} placeholder={text.userQuest.advise} />
            </div>
            <br/>
            <div className="form-input">
                <span className="label">
                    {text.userQuest.note}
                </span>
                <input disabled={true} defaultValue={stage.note} maxLength={200} placeholder={text.userQuest.note} />
            </div>
            <br/>

            {stage.answerList && (
                <div>
                    <span className="label">
                        {text.userQuest.answers}
                    </span>

                    <div className="answer-list">
                        <div key={stage.answer} className="answer-item correct">
                            <div className="name">
                                <span>{stage.answer}</span>
                            </div>
                            <div className="buttons">
                            </div>
                        </div>

                        {stage.answerList.split(";").map((answer:any) => (
                            <div key={answer} className="answer-item">
                                <div className="name">
                                    <span>{answer}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
    }

    const returnScanQRCode = () => {
        return (
            <div className="stage-items">
                 <span className="label">
                     {text.userQuest.qrCode}
                 </span>
                <div className="qr-code">
                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+stage.qrCodeUrl} />
                </div>
            </div>
        )
    }

    // Template
    return (
        <div>
            <div className="stage">
                <div className="stage-id">
                    <span>{stage.id}</span>
                </div>
                <div className="stage-image">
                    <img alt="" src={require("../../../assets/images/stageTypeImages/"+stage.type+".svg")} />
                </div>
                <div className="stage-name">
                    <span>{text.stageType[stage.type]}</span>
                </div>
                <div className="stage-roll">
                    <img alt="" onClick={handleRoll} src={roll ? require("../../../assets/images/otherIcons/arrow-up.svg") : require("../../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>

            {roll && (
                <div>
                    {stage.type === 'SCAN_QR_CODE' && returnScanQRCode()}
                    {stage.type === 'ANSWER_QUESTION' && returnAnswerQuestion()}
                    {stage.type === 'GO_TO_PLACE' && returnGoToPlace()}
                </div>
            )}

        </div>
    )
}

export default AdminQuestStageItem
