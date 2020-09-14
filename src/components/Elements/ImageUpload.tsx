import React, {useContext, useRef, useState} from "react";
import {UserContext} from "../../UserContext";
import {useAlert} from "react-alert";

import './ImageUpload.scss'

interface Props {
    defaultImages: any
    setImages: (images:any) => void
}

const ImageUpload: React.FC<Props> = (props) => {

    const {userContext} = useContext(UserContext)
    const alert = useAlert()
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {defaultImages, setImages} = props


    const handleDeleteImage = (id:number) => {
        setImages(defaultImages.filter(function (image:any) {
            return image.id !== id
        }))
    }

    const handleAddImage = (e:any) => {
        if(defaultImages.length === 5){
            alert.error(text.imageUploader.maxCount)
            return
        }

        setImages([...defaultImages,
            {
                src: URL.createObjectURL(e.target.files[0]),
                id: Math.max.apply(Math, defaultImages.map(function (img:any) {return img.id}))+1
            }
        ])
    }

    return (
        <div className="image-upload">

            <div className="input-wrapper">
                {text.imageUploader.buttonText}<input onChange={handleAddImage} className="file-input hidden" type="file" />
            </div>


            <div className="image-upload-preview">
                {defaultImages.length > 0 && (
                    defaultImages.map((image:any) => (
                        <div key={image.id} className={"preview-image"}>
                            <div className="preview-image-delete">
                                <div className="delete-button" onClick={() => handleDeleteImage(image.id)}>X</div>
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
