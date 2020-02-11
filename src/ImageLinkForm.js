import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm=()=>{
    return(
        <div>
            <p className='f3 center'>
                {'Faces will be detected in uploaded images'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center weave'>
                    <input type='text' className='f4 pa2 w-70 center'></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>{'Detect'}</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;