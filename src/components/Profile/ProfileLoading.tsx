import React from "react";

const ProfileLoading: React.FC = () => {

    // Template
    return (
        <div>
            <div className="header">
                <div className="header-main">
                    <div className="header-title">
                        <div className="header-user">
                            <div className="user-info">
                                <div className="user-image">

                                </div>
                                <div className="user-nick">

                                </div>
                            </div>

                        </div>

                        <div className="header-create-date">

                        </div>
                    </div>

                    <div className="header-list">

                        <div className="list-item">
                            <div className="item-image">
                                <img src={require("../../assets/images/profileImages/created.svg")} alt="" />
                            </div>
                            <div className="item-text">

                            </div>
                        </div>

                        <div className="list-item">
                            <div className="item-image">
                                <img src={require("../../assets/images/profileImages/finished.svg")} alt="" />
                            </div>
                            <div className="item-text">

                            </div>
                        </div>

                        <div className="list-item">
                            <div className="item-image">
                                <img src={require("../../assets/images/profileImages/best.svg")} alt="" />
                            </div>
                            <div className="item-text">

                            </div>
                        </div>

                        <div className="list-item">
                            <div className="item-image">
                                <img src={require("../../assets/images/profileImages/season.svg")} alt="" />
                            </div>
                            <div className="item-text">

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="profile-list">
                <div className="loading-image">
                    <img alt="" src={require("../../assets/images/otherIcons/loading.svg")} />
                </div>

            </div>

        </div>
    )
}

export default ProfileLoading
