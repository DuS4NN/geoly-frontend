import React from "react"

import './CreateAccount.scss'

interface Props {

}

const CreateAccount: React.FC<Props> = () => {

    return (
        <div className="create-account">
            <div className="create-account-box">
                <div className="create-account-title">
                    <h2>Hello,<br /> Friend!</h2>
                </div>
                <div className="create-account-description">
                <span>Enter your personal details<br/>
                and start journey with us</span>
                </div>

                <div className="create-account-button">
                    <button>Sign Up</button>
                </div>
            </div>

        </div>
    )
}

export default CreateAccount
