import React, {ChangeEvent, FormEvent, useContext, useEffect, useRef, useState} from "react"
import {useAlert} from "react-alert"
import {UserContext} from "../../UserContext";
import './Modal.scss'
import ReactTooltip from "react-tooltip";

// Props
interface Props {
    stage: any
}

// Components
const StageItem: React.FC<Props> = props => {
    // Context
    const {userContext} = useContext(UserContext)

    // Props state
    const {stage} = props

    const [roll, setRoll] = useState(false) as Array<any>
    const [answerList, setAnswerList] = useState([]) as Array<any>

    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const questionRef = useRef(null)
    const answerRef = useRef(null)
    const adviseRef = useRef(null)

    const [addReviewValue, setAddReviewValue] = useState("") as Array<any>
    const [correctAnswer, setCorrectAnswer] = useState("") as Array<any>

    useEffect(() => {
        if(stage.answerList){
            setAnswerList(stage.answerList.split(";"))

            setCorrectAnswer(stage.answer)

        }
    }, [stage.answerList])

    const handleRoll = () => {
        setRoll(!roll)
    }

    const handleAddReviewValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddReviewValue(e.target.value)
    }

    const handleAddAnswer = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(addReviewValue.includes(";")){
            alert.error(text.error.ANSWER_SYMBOL)
            return
        }

        if(addReviewValue.length==0){
            return
        }

        if(addReviewValue.length > 100){
            alert.error(text.error.ANSWER_LENGTH)
            return
        }

        if(answerList.length >= 5){
            alert.error(text.error.ANSWERS_MAX_COUNT)
            setAddReviewValue("")
            return
        }

        if(answerList.find(function (answer:any) {
            return answer === addReviewValue
        })){
            alert.error(text.error.ANSWER_ALREADY_EXISTS)
            setAddReviewValue("")
            return
        }

        setAnswerList([...answerList, addReviewValue])
        setAddReviewValue("")
    }

    const handleDeleteAnswer = (deleteAnswer:string) => {
        setAnswerList(answerList.filter(function (answer:any) {
            return answer !== deleteAnswer
        }))
    }

    const handleChangeCorrectAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setCorrectAnswer(e.target.value)
    }

    const handleSaveStage = () => {

    }

    const returnAnswerQuestion = () => {
        return (
            <div className="stage-items">

                <div className="form-input">
                    <span className="label">{text.userQuest.question}</span>
                    <input maxLength={200} defaultValue={stage.question} ref={questionRef} placeholder={text.userQuest.question}/>
                </div>
                 <br/>
                <div className="form-input">
                    <span className="label">{text.userQuest.answer}</span>
                    <input maxLength={200} value={correctAnswer} onChange={handleChangeCorrectAnswer} ref={answerRef} placeholder={text.userQuest.answer}/>
                </div>
                <br/>
                <div className="form-input">
                    <span className="label">
                        {text.userQuest.advise}
                        <img alt="" data-tip={text.userQuest.adviseToolTip} src={require("../../assets/images/otherIcons/help.svg")} />
                    </span>
                    <input defaultValue={stage.advise} maxLength={200} ref={adviseRef} placeholder={text.userQuest.advise} />
                </div>
                <br/>
                <div className="form-input">
                    <span className="label">
                        {text.userQuest.note}
                        <img alt="" data-tip={text.userQuest.noteToolTip} src={require("../../assets/images/otherIcons/help.svg")} />
                    </span>
                    <input defaultValue={stage.note} maxLength={200} ref={adviseRef} placeholder={text.userQuest.note} />
                </div>
                <br/>
                <span className="label">
                    {text.userQuest.answers}
                    <img alt="" data-tip={text.userQuest.answersToolTip} src={require("../../assets/images/otherIcons/help.svg")} />
                </span>
                <div className="answer-list">

                    <div key={correctAnswer} className="answer-item correct">
                        <div className="name">
                            <span>{correctAnswer}</span>
                        </div>
                        <div className="buttons">
                        </div>
                    </div>

                    {answerList.map((answer:any) => (
                        <div key={answer} className="answer-item">
                            <div className="name">
                                <span>{answer}</span>
                            </div>
                            <div className="buttons">
                                    <img alt="" onClick={() => handleDeleteAnswer(answer)} src={require("../../assets/images/otherIcons/delete.svg")} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="add-answer">
                    <form onSubmit={handleAddAnswer}>
                        <input value={addReviewValue} maxLength={100} onChange={handleAddReviewValueChange} placeholder={text.userQuest.addAnswer} />
                    </form>
                </div>

                <ReactTooltip />

                <div className="form-submit-button">
                    <button onClick={handleSaveStage}>{text.userQuest.edit}</button>
                </div>
            </div>
        )
    }

    const returnScanQRCode = () => {
        return (
            <div className="stage-items">
                 <span className="label">
                     {text.userQuest.qrCode}
                     <img alt="" data-tip={text.userQuest.qrCodeToolTip} src={require("../../assets/images/otherIcons/help.svg")} />
                 </span>
                <div className="qr-code">
                    <img alt="" src={process.env.REACT_APP_IMAGE_SERVER_URL+stage.qrCodeUrl} />
                </div>

                <ReactTooltip />
            </div>
        )
    }

    const returnGoToPlace = () => {
        return (
            <div>
                lul
            </div>
        )
    }

    // Template
    return (
        <div>
            <div className="stage">
                <div className="stage-image">
                    <img alt="" src={require("../../assets/images/stageTypeImages/"+stage.type+".svg")} />
                </div>
                <div className="stage-name">
                    <span>{text.stageType[stage.type]}</span>
                </div>
                <div className="stage-roll">
                    <img alt="" onClick={handleRoll} src={roll ? require("../../assets/images/otherIcons/arrow-up.svg") : require("../../assets/images/otherIcons/arrow-down.svg")} />
                </div>
            </div>

            {roll && (
                <div>
                    {stage.type === 'GO_TO_PLACE' && returnGoToPlace()}
                    {stage.type === 'SCAN_QR_CODE' && returnScanQRCode()}
                    {stage.type === 'ANSWER_QUESTION' && returnAnswerQuestion()}
                </div>
            )}

        </div>
    )
}

export default StageItem
