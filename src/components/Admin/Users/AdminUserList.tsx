import React from "react"
import AdminUserItem from "./AdminUserItem";
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

// Props
interface Props {
    userList: any
    page: number
    count: number
    setPage: (page:number) => void
}

// Component
const AdminUserList: React.FC<Props> = (props) => {

    const {userList, page, setPage, count} = props

    const text = require('../../../assets/languageText/admin').adminText

    const useStyles = makeStyles(theme => ({
        alignItemsAndJustifyContent: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '20px',
            paddingBottom: '20px'
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

    const handleChangePage = (event:any, value:number) => {
        setPage(value)
    }

    // Template
    return (
        <div className="adminUserList">

            <div className="header">
                <div className="id">
                    <span>{text.user.id}</span>
                </div>
                <div className="user">
                    <span>{text.user.user}</span>
                </div>
                <div className="date">
                    <span>{text.user.registeredAt}</span>
                </div>
            </div>


            {userList.map((user:any) => (
                <AdminUserItem key={user.id} user={user} />
            ))}

            {count > 20 && (
                <MuiThemeProvider theme={theme}>
                    <Pagination
                        className={classes.alignItemsAndJustifyContent + " pagination"}
                        count={Math.ceil(count/20)}
                        page={page}
                        color="primary"
                        onChange={handleChangePage}
                    />
                </MuiThemeProvider>
            )}
        </div>
    )
}

export default AdminUserList
