import React, {useContext, useState} from 'react'
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import GroupsListCreatedItem from "./GroupListCreatedItem";
import {UserContext} from "../../UserContext"

// Style
import './GroupsList.scss'
import GroupListEnteredItem from "./GroupListEnteredItem";
import ModalLeaveGroup from "../Modals/ModalLeaveGroup";

// Props
interface Props {
    enteredGroups: any
    count: number
    setCount: (count:number) => void
    getEnteredGroups: (page:number) => void
}

// Component
const GroupsListEntered: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {count, setCount, enteredGroups, getEnteredGroups} = props

    const [showLeaveModal, setShowLeaveModal] = useState(false)
    const [leaveGroupId, setLeaveGroupId] = useState(0)

    const [page, setPage] = useState(1)

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getEnteredGroups(value)
    };

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }))
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#30dd8a",
            },
        },
    });
    const classes = useStyles();

    const handleShowLeaveModal = (id:number) => {
        setLeaveGroupId(id)
        setShowLeaveModal(true)
    }

    // Template
    return (
        <div className="group-list-table">

            {enteredGroups !== null && enteredGroups.length > 0 &&(
                <div>
                    <ModalLeaveGroup
                        showModal={showLeaveModal}
                        setShowModal={setShowLeaveModal}
                        leaveGroupId={leaveGroupId}
                        groups={enteredGroups}
                        page={page}
                        setPage={setPage}
                        count={count}
                        setCount={setCount}
                        getEnteredGroups={getEnteredGroups} />

                    <div className="group-list-container">

                        <div className="container-title">
                            <h2>{text.groups.joinedGroups}</h2>
                        </div>

                        <div className="container-content">
                            {enteredGroups.map((group:any) => (
                                <GroupListEnteredItem key={group.groupId} group={group} handleShowLeaveModal={handleShowLeaveModal} />
                            ))
                            }
                        </div>

                        {count > 5 && (
                            <MuiThemeProvider theme={theme}>
                                <Pagination
                                    className={classes.alignItemsAndJustifyContent + " pagination"}
                                    count={Math.ceil(count/5)}
                                    page={page}
                                    color="primary"
                                    onChange={handleChangePage}
                                />
                            </MuiThemeProvider>
                        )}

                    </div>
                </div>
            )}

        </div>
    )
}

export default GroupsListEntered

/*
{createdGroups.map((group:any) => (
                        <GroupsListCreatedItem
                            key={group.groupId}
                            group={group}
                            handleShowDeleteModal={handleShowDeleteModal}
                            handleShowEditModal={handleShowEditModal}
                            handleShowManageModal={handleShowManageModal}
                        />
                    ))}
 */
