import React from 'react'
import './FaceRecognition.css'

const FaceRecognition=({InputImage, box })=>{

    return(
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='uploadedPicture' alt='' src={InputImage} width='500px' height='auto'/>
                <div className='bounding-box' style={{top:box.top, left:box.left, right:box.right, bottom:box.bottom}}></div>
            </div>
        </div>
    )
}
export default FaceRecognition;