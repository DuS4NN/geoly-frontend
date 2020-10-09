import React, {useContext, useEffect, useRef} from "react"
import {NavLink} from "react-router-dom"

import './InvitationRoll.scss'

// Context
import {UserContext} from "../../UserContext"

// Style
import './NotificationRoll.scss'
import {debounce} from "lodash-es";

// Props
interface Props {
    invitations: any
    setShowRoll: (showRoll:boolean) => void
    getInvitations: () => void
}

// Component
const InvitationsRoll: React.FC<Props> = (props) => {

    const {getInvitations, invitations, setShowRoll} = props
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

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

    return (
        <div className="invitations-roll" ref={invitationsRoll}>
            <div className="navigation-triangle">
            </div>

            <div  id="roll-items" className="roll-items" ref={ref}>
                {invitations.length>0 && invitations.map((invitation:any) => (
                    <div key={invitation.invitationId} className="roll-item">
                        <div className="item-text">
                            <span>{text.invitations.user}</span>
                            <NavLink to={"/profile/"+invitation.userNick}> {invitation.userNick} </NavLink>
                            <span>{text.invitations.sentInvite}</span>
                            <span> {invitation.partyName}</span>
                        </div>
                        <div className="item-buttons">
                            <div className="buttons-images">
                                <button>Accept</button>
                            </div>
                            <div className="buttons-images">
                                <button className="decline">Decline</button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}
export default InvitationsRoll
