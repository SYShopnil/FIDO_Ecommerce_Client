import React, {useState} from 'react'
import defaultProImage from '../assert/defaultProImage.png'
import SingleFileUploadStyle  from './SIngleFileUpload.module.css'

const SingleFileUpload = ({fileLable, imageFileHandler}) => {
    const [previewImage, setPreviewImage] = useState("")
    
    // imageUploadHandler 
    const imageUploadHandler = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        // console.log(file);
       if(file) {
            const reader = new FileReader() 
            reader.onloadend = () => {
                setPreviewImage(reader.result)
            }
            reader.readAsDataURL(file) //convert file to base 64
            imageFileHandler(file)  //sent the raw file as a props
       }
    }
    return (
       <>
            <div className="mb-3">
                {/* input part */}
                <div>
                    <label for="formFileSm" className="form-label">{fileLable}</label>
                    <input className="form-control form-control-sm" id="formFileSm" type="file" onChange = {(e) => imageUploadHandler(e)}/>
                </div>

                {/* previewPart */}
                <div className = {`mt-2 d-inline-block position-relative`}>
                    {
                        previewImage &&  <i className= {`far fa-times-circle  text-primary ${SingleFileUploadStyle.previewImageDeletePart}`} onClick = {(e) => setPreviewImage("")}></i>
                    }
                    {
                        previewImage 
                        ?
                        <img src={previewImage} alt="preview" className = {`${SingleFileUploadStyle.defaultProImage}`} />
                        :
                        <img src={defaultProImage} alt="preview" className = {`${SingleFileUploadStyle.defaultProImage}`} />
                    }
                </div>
            </div>
       </>
    )
}

export default SingleFileUpload
