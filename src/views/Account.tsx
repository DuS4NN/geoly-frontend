import React from 'react'

import SignIn from "../../src/components/Account/SignIn/SignIn"
import CreateAccount from "../../src/components/Account/SignIn/CreateAccount"

interface Props {
}

const Account: React.FC = () => {
    return (
        <div className="sign-in">
            <SignIn />
            <CreateAccount />
        </div>
    )
}

export default Account
