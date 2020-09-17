import React, {useContext, useState} from 'react'
// Context
import {UserContext} from "../../UserContext"

// Style
import './GroupsList.scss'
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import GroupsListCreatedItem from "./GroupsListCreatedItem";
import ModalDeleteGroup from "../Modals/ModalDeleteGroup";
import ModalEditGroup from "../Modals/ModalEditGroup";
import ModalAddGroup from "../Modals/ModalAddGroup";

// Props
interface Props {
    createdGroups: any
    setCreatedGroups: (createdGroups: any) => void
    count: number
    setCount: (count:number) => void
    getCreatedGroups: (page:number) => void
}

// Component
const GroupsListCreated: React.FC<Props> = (props) => {
    const {userContext} = useContext(UserContext)
    const text = require('../../assets/languageText/'+userContext['languageId']+'.ts').text

    const {count, setCount, createdGroups, setCreatedGroups, getCreatedGroups} = props

    const [page, setPage] = useState(1)

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleteGroupId, setDeleteGroupId] = useState(0)

    const [showEditModal, setShowEditModal] = useState(false)
    const [editGroup, setEditGroup] = useState({}) as any

    const [showAddModal, setShowAddModal] = useState(false)

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
        getCreatedGroups(value)
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

    const handleShowDeleteModal = (deleteGroupId:number) => {
        setDeleteGroupId(deleteGroupId)
        setShowDeleteModal(true)
    }
    const handleShowEditModal = (editGroup:number) => {
        setEditGroup(editGroup)
        setShowEditModal(true)
    }

    const handleShowAddModal = () => {
        setShowAddModal(true)
    }

    // Template
    return (
        <div className="group-list-table">

            <ModalDeleteGroup showModal={showDeleteModal} setShowModal={setShowDeleteModal} deleteGroupId={deleteGroupId} createdGroups={createdGroups} count={count} setCount={setCount} page={page} setPage={setPage} getCreatedGroups={getCreatedGroups} />
            <ModalEditGroup showModal={showEditModal} setShowModal={setShowEditModal} editGroup={editGroup} createdGroups={createdGroups} setCreatedGroups={setCreatedGroups} />
            <ModalAddGroup showModal={showAddModal} setShowModal={setShowAddModal} count={count} setCount={setCount} setPage={setPage} getCreatedGroups={getCreatedGroups} />

            <div className="group-list-container">

                <div className="container-title">
                    <h2>{text.groups.createdGroups}</h2>
                </div>

                <div className="container-content">
                    {createdGroups.map((group:any) => (
                        <GroupsListCreatedItem
                            key={group.groupId}
                            group={group}
                            handleShowDeleteModal={handleShowDeleteModal}
                            handleShowEditModal={handleShowEditModal}
                        />
                    ))}
                    <div className="content-item">
                        <div className="item-add">
                            <div className="add-image" onClick={handleShowAddModal}>
                                <img src={require("../../assets/images/otherIcons/add.svg")} alt="" />
                            </div>
                            <div className="add-title" onClick={handleShowAddModal}>
                                <h2>{text.groups.create}</h2>
                            </div>
                        </div>

                    </div>
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
    )
}

export default GroupsListCreated
