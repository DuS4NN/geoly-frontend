import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from "react"
import {useAlert} from "react-alert";

// Props
interface Props {
    stage: any
    stages: any
    setStages: (stages:any) => void
}

// Component
const StageItemAnswerQuestion: React.FC<Props> = (props) => {

    const {stage, stages, setStages} = props

    const userText = require('../../../../assets/languageText/2').text
    const alert = useAlert()

    const [answerList, setAnswerList] = useState([]) as Array<any>
    const questionRef = useRef(null) as any
    const answerRef = useRef(null) as any
    const adviseRef = useRef(null) as any
    const noteRef = useRef(null) as any

    const [addReviewValue, setAddReviewValue] = useState('') as Array<any>
    const [correctValue, setCorrectValue] = useState('') as Array<any>

    const handleDeleteAnswer = (deleteAnswer:string) => {
        setAnswerList(answerList.filter(function (answer:any) {
            return answer !== deleteAnswer
        }))
    }
    const handleAddAnswer = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(addReviewValue.includes(";")){
            alert.error(userText.error.ANSWER_SYMBOL)
            return
        }

        if(addReviewValue.length === 0){
            return
        }

        if(addReviewValue.length > 100){
            alert.error(userText.error.ANSWER_LENGTH)
            return
        }

        if(answerList.length >= 5){
            alert.error(userText.error.INVALID_ANSWER_COUNT)
            setAddReviewValue("")
            return
        }


        if(answerList.find(function (answer:any) {
            return answer === addReviewValue
        })){
            alert.error(userText.error.ANSWER_ALREADY_EXISTS)
            setAddReviewValue("")
            return
        }

        setAnswerList([...answerList, addReviewValue])
        setAddReviewValue("")
    }
    const handleChangeCorrectAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setCorrectValue(e.target.value)
    }
    const handleAddReviewValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddReviewValue(e.target.value)
    }

    useEffect(() => {
        if(noteRef !== null && adviseRef !== null && answerRef !== null && questionRef !== null){
            let newStages = [] as any

            stages.map((s:any) => {
                if(s.id !== stage.id){
                    newStages.push(s)
                }else{
                    newStages.push({
                        ...stage,
                        question: questionRef,
                        advise: adviseRef,
                        answer: answerRef,
                        note: noteRef,
                        answerList: answerList
                    })
                }
            })
            setStages(newStages)
        }
    }, [noteRef, adviseRef, answerRef, questionRef, answerList])

    // Template
    return (
        <div className="stageItemAnswerQuestion">
            <div className="formInput">
                <span className="label">
                    {userText.userQuest.question}
                </span>
                <input maxLength={200} ref={questionRef} placeholder={userText.userQuest.question}/>
            </div>
            <br/>
            <div className="formInput">
                <span className="label">
                    {userText.userQuest.answer}
                </span>
                <input maxLength={200} value={correctValue} onChange={handleChangeCorrectAnswer} ref={answerRef} placeholder={userText.userQuest.answer}/>
            </div>
            <br/>
            <div className="formInput">
                    <span className="label">
                        {userText.userQuest.advise}
                    </span>
                <input maxLength={200} ref={adviseRef} placeholder={userText.userQuest.advise} />
            </div>
            <br/>
            <div className="formInput">
                    <span className="label">
                        {userText.userQuest.note}
                    </span>
                <input maxLength={200} ref={noteRef} placeholder={userText.userQuest.note} />
            </div>
            <br/>
            <div className="formInput">
                 <span className="label">
                    {userText.userQuest.answers}
                 </span>
            </div>

            <div className="answer-list">

                <div key={answerRef.current?.value} className="answer-item correct">
                    <div className="name">
                        <span>{correctValue}</span>
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
                            <img alt="" onClick={() => handleDeleteAnswer(answer)} src={ require("../../../../assets/images/otherIcons/delete.svg")} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="add-answer">
                <form onSubmit={handleAddAnswer}>
                    <input value={addReviewValue} maxLength={100} onChange={handleAddReviewValueChange} placeholder={userText.userQuest.addAnswer} />
                </form>
            </div>

        </div>
    )
}

export default StageItemAnswerQuestion
