import React, { useState }from 'react'

const Error = ({title}) => {
    const [visible, setVisible] = useState(true) //set the visibility of that alert 
    setTimeout(() => {
        setVisible(false)
    }, 5000)
    return (
        	<>
                {
                    visible 
                    ?
                     <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{title}</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    :
                    ""
                }
            </>
    )
}

export default Error
