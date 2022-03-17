import React from 'react'
import SideBarStyle from './SideBar.module.css'
import './SideBar.css'

const SideBar = ({toggle, passHandler}) => {
    console.log({toggle});
    const crossHandler = (e) => {
        passHandler()
    } //pass the cross status value as a props function
    if(toggle) {
        var toogleClass = "active"
    }else {
        var toogleClass = "sideBarMainWrap"
    }
    return (
        <aside >
            {/* sidebar wrapper */}
            <div className = {`row ${toogleClass}`  }>
                {/* titlePart */}
                <div className = {`col-12 mt-4 `}>
                    <h5>ShoppinCategory</h5>
                </div>
                
                {/* category */}
                <div className = {`col-12  py-2 ${SideBarStyle.categoryWrap} `} >
                    <span>Pants</span>
                </div>

                <div className = {`col-12 py-2  ${SideBarStyle.categoryWrap} `} >
                    <span>Shirts</span>
                </div>
                {/* crossSign */}
                <div className = {`${SideBarStyle.crossSign}`}>
                    <span>
                        <i class="fas fa-times" onClick={(e) => crossHandler(e)}></i>
                    </span>
                </div>
            </div>
        </aside>
    )
}

export default SideBar
