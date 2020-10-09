import React, {useEffect, useState} from "react"
import axios from "axios"
import InvitationsRoll from "./InvitationsRoll";

// Props
interface Props {
    invitations: any
    unseenCount: any
    setInvitations: (invitations:any) => void
    setUnseenCount: (count:any) => void
}

// Component
const NavigationInvitations: React.FC<Props> = (props) => {
    const {setInvitations, invitations, unseenCount, setUnseenCount} = props

    const [showInvitationsRoll, setShowInvitationsRoll] = useState(false) as Array<any>
    const [isEmpty, setIsEmpty] = useState(false)

    const getInvitations = () => {
        if(isEmpty) return

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/invite?count='+invitations.length,
            withCredentials: true
        }).then(function (response) {
            let statusCode = response.data.responseEntity.statusCode
            if(statusCode === 'OK'){
                let newInvitations = response.data.data.map((invitation:any) => {
                    return {
                        invitationId: invitation[0],
                        userNick: invitation[1],
                        partyName: invitation[2],
                        partyId: invitation[3]
                    }
                })

                if(newInvitations.length === 0){
                    setIsEmpty(true)
                }

                invitations.push(...newInvitations)
                setInvitations(Array().concat(invitations))
            }
        })
    }

    useEffect(() => {
        getInvitations()
    }, [])

    const handleShowRoll = () => {
        if(unseenCount>0 && !isEmpty && invitations.length<=10){
            axios({
                method: 'GET',
                url: process.env.REACT_APP_API_SERVER_URL+'/invite/setunseen',
                withCredentials: true
            })
        }
        setUnseenCount(0)
        setShowInvitationsRoll(true)
    }

    // Template
    return (
        <div className="navigation-invitations">
            <img onClick={handleShowRoll} src={require("../../assets/images/inputImages/message.svg")} alt="" />

            {unseenCount !== null && unseenCount > 0 && (
                <div className="invitations-count">
                    <span>{unseenCount}</span>
                </div>
            )}

            {showInvitationsRoll && (
                <InvitationsRoll invitations={invitations} setShowRoll={setShowInvitationsRoll} getInvitations={getInvitations} />
            )}

        </div>
    )
}

export default NavigationInvitations
