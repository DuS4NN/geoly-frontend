import React, {useContext} from "react";
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";

import './ImageUpload.scss'
import {add} from "lodash-es";

interface Props {
    defaultImages: any
    setImages: (images:any) => void
    addedQuests: any
    setAddedQuests: (addedQuests:any) => void
    deletedQuests: any
    setDeletedQuests: (deletedQuests:any) => void

}

const ImageUpload: React.FC<Props> = (props) => {

    const {userContext} = useContext(UserContext)
    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {defaultImages, setImages, setDeletedQuests, deletedQuests, setAddedQuests, addedQuests} = props


    const handleDeleteImage = (deletedImage:any) => {
        if(deletedImage.id > 0){
            setDeletedQuests([...deletedQuests, deletedImage.id])
        }
        setImages(defaultImages.filter(function (image:any) {
            return image.id !== deletedImage.id
        }))
        setAddedQuests(addedQuests.filter(function (image:any) {
            return image.id !== deletedImage.id
        }))
    }

    const handleAddImage = (e:any) => {
        if(defaultImages.length === 5){
            alert.error(text.imageUploader.maxCount)
            return
        }

        setAddedQuests([...addedQuests,
            {src: e.target.files[0],
            id: defaultImages.length > 0 ? Math.min.apply(Math, defaultImages.map(function (img:any) {return img.id}))-1 : -1

            }])
        setImages([...defaultImages,
            {
                src: URL.createObjectURL(e.target.files[0]),
                id: defaultImages.length > 0 ? Math.min.apply(Math, defaultImages.map(function (img:any) {return img.id}))-1 : -1
            }
        ])
    }

    return (
        <div className="image-upload">
            <div className="input-wrapper">
                {text.imageUploader.buttonText}<input onChange={handleAddImage} accept="image/jpeg, image/jpg, image/png" className="file-input hidden" type="file" />
            </div>

            <div className="image-upload-preview">
                {defaultImages.length > 0 && (
                    defaultImages.map((image:any) => (
                        <div key={image.id} className={"preview-image"}>
                            <div className="preview-image-delete">
                                <div className="delete-button" onClick={() => handleDeleteImage(image)}>X</div>
                            </div>
                            <img alt="" src={image.src} />
                        </div>
                    ))
                ) }
            </div>
        </div>
    )
}
export default ImageUpload
