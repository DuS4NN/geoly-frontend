import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {useAlert} from "react-alert";
import ImageUpload from "../../Elements/ImageUpload";
import axios from "axios";

// Props
interface Props {
    images: any
    setImages: (images:any) => void
    id: any
}

// Component
const AdminQuestImages: React.FC<Props> = (props) => {

    const {images, setImages, id} = props

    const [addedQuests, setAddedQuests] = useState([]) as Array<any>
    const [deletedQuests, setDeletedQuests] = useState([]) as Array<any>

    const adminText = require('../../../assets/languageText/admin').adminText
    const text = require('../../../assets/languageText/2.ts').text
    const alert = useAlert()
    const history = useHistory()

    const handleSaveImages = () => {
        if(deletedQuests.length > 0 || addedQuests.length > 0){
            let data = new FormData()

            for(let i=0; i<addedQuests.length; i++){
                data.append('files', addedQuests[i].src)
            }

            axios({
                method: 'POST',
                url: process.env.REACT_APP_API_SERVER_URL+'/adminUpdateImages?id='+id+'&deleted='+deletedQuests,
                withCredentials: true,
                data: data
            }).then(function (response) {
                let serverResponse = response.data.responseEntity.body
                let statusCode = response.data.responseEntity.statusCode

                if(statusCode === 'ACCEPTED'){
                    alert.success(text.success[serverResponse])

                }else if(serverResponse === 'IMAGE_SIZE_TOO_BIG' || serverResponse === 'UNSUPPORTED_IMAGE_TYPE' || serverResponse === 'TOO_MANY_IMAGES'){
                    alert.error(text.error[serverResponse])
                }else{
                    alert.error(text.error.SOMETHING_WENT_WRONG)
                }
            }).catch(function () {
                history.push("/welcome")
                alert.error(text.error.SOMETHING_WENT_WRONG)
            })
        }
    }

    // Template
    return (
        <div className="adminQuestImages">
            <div className="title">
                <span>{adminText.questDetails.images}</span>
            </div>

            <div className="imageUploader">
                <ImageUpload
                    defaultImages={images}
                    setImages={setImages}
                    addedQuests={addedQuests}
                    setAddedQuests={setAddedQuests}
                    deletedQuests={deletedQuests}
                    setDeletedQuests={setDeletedQuests}
                />
            </div>
            <div className="submitButton">
                <button onClick={handleSaveImages}>{adminText.questDetails.saveImages}</button>
            </div>
        </div>
    )
}

export default AdminQuestImages
