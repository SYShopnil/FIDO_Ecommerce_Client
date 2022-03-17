import React from 'react'
import ButtonLoaderStyle from './ButtonLoader.module.css'

const ButtonLoader = () => {
    return (
        <div className= {`${ButtonLoaderStyle.bye}`}>
            <div className= {`${ButtonLoaderStyle.hello}`} >
                <div></div>
            </div>
        </div>
    )
}

export default ButtonLoader
