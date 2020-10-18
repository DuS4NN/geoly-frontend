import React, {useState} from 'react'

// Style
import './GroupHeader.scss'



// Component
const GroupLoading: React.FC = () => {


    const [users] = useState([1,2,3,4,5,6,7,8])

    // Template
    return (
        <div>
            <div className="header">
                <div className="header-main">
                    <div className="header-title">
                        <div className="header-create-date">

                        </div>
                    </div>

                    <div className="header-user-list">
                        <div className="list-right">
                            {users.map((user:any, index:any) => index%2===0 && (
                                <div className="user-list-item">
                                    <div className="item-image">

                                    </div>
                                    <div className="item-name">

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="list-left">
                            {users.map((user:any, index:any) => index%2 !== 0 && (
                                <div className="user-list-item">
                                    <div className="item-image">

                                    </div>
                                    <div className="item-name">
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="group-content">
                <div className="loading">
                    <img alt="" src={require("../../assets/images/otherIcons/loading.svg")} />
                </div>
            </div>

        </div>
    )
}

export default GroupLoading
