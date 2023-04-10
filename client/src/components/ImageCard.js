import React from 'react'

function ImageCard({ url }) {
    return (

        <div className='image-card'>
            <div className='overlay'></div>
            <img style={{ width: '350px' }} src={url} alt="Gallery Item" />
        </div >
    )
}

export default ImageCard