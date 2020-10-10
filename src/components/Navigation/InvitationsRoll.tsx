import React, {useContext, useEffect, useRef} from "react"
import {NavLink} from "react-router-dom"
import axios from "axios"
import {debounce} from "lodash-es";
import {UserContext} from "../../UserContext"

// Style
import './InvitationRoll.scss'
import {useAlert} from "react-alert";

// Props
interface Props {
    invitations: any
    setInvitations: (invitations:any) => void
    setShowRoll: (showRoll:boolean) => void
    getInvitations: () => void
}

// Component
const InvitationsRoll: React.FC<Props> = (props) => {

    const {getInvitations, invitations, setShowRoll, setInvitations} = props
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text
    const alert = useAlert()

    const invitationsRoll = useRef(null)
    const ref = useRef(null) as any

    useEffect(() => {
        document.getElementById("roll-items")?.addEventListener('scroll', handleScroll);
        return () => document.getElementById("roll-items")?.removeEventListener('scroll', handleScroll);
    })

    const handleScroll = debounce((e:any) => {
        if(ref){
            if((100/ref.current?.scrollTopMax) * e.target.scrollTop >= 70){
                getInvitations()
            }
        }
    },100)

    // Click outside of component
    function useClickOutside(ref: any) {
        useEffect(() => {
            function handleClickOutside(e: MouseEvent) {
                if (ref.current && !ref.current.contains(e.target)) {
                    setShowRoll(false)
                }
            }

            document.addEventListener("click", handleClickOutside);
            return () => {
                document.removeEventListener("click", handleClickOutside);
            };
        }, [ref]);
    }
    useClickOutside(invitationsRoll)

    const handleAccept = (partyId:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/invite/accept?id='+partyId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])

                setInvitations(invitations.filter(function (invitation:any) {
                    return invitation.invitationId !== partyId
                }))

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    const handleDecline = (partyId:number) => {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_SERVER_URL+'/invite/cancel?id='+partyId,
            withCredentials: true
        }).then(function (response) {
            let serverResponse = response.data.responseEntity.body
            let statusCode = response.data.responseEntity.statusCode

            if(statusCode === 'ACCEPTED'){
                alert.success(text.success[serverResponse])

                setInvitations(invitations.filter(function (invitation:any) {
                    return invitation.invitationId !== partyId
                }))

            }else{
                alert.error(text.error.SOMETHING_WENT_WRONG)
            }
        })
    }

    return (
        <div className="invitations-roll" ref={invitationsRoll}>
            <div className="navigation-triangle">
            </div>

            <div  id="roll-items" className="roll-items" ref={ref}>
                {invitations.length>0 && invitations.map((invitation:any) => (
                    <div key={invitation.invitationId} className="roll-item">

                        <div className="item-image">
                            <img alt="" src={require("../../assets/images/notificationImages/invitation.svg")} />
                        </div>

                        <div className="item-text">
                            <span>{text.invitations.user}</span>
                            <NavLink to={"/profile/"+invitation.userNick}> {invitation.userNick} </NavLink>
                            <span>{text.invitations.sentInvite}</span>
                            <span> {invitation.partyName}</span>
                        </div>
                        <div className="item-buttons">
                            <div className="buttons-images">
                                <button onClick={() => handleAccept(invitation.invitationId)}>{text.invitations.accept}</button>
                            </div>
                            <div className="buttons-images">
                                <button onClick={() => handleDecline(invitation.invitationId)} className="decline">{text.invitations.deny}</button>
                            </div>
                        </div>
                    </div>
                ))}

                {invitations.length === 0 && (
                    <div className="no-content">
                        <div className="item">{text.invitations.noContent}</div>
                    </div>
                )}

            </div>

        </div>
    )
}
export default InvitationsRoll
