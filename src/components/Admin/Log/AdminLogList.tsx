import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminLogItem from "./AdminLogItem";

interface Props {
    logList: any
    page: any
    setPage: (page:number) => void
    count: any
}

// Component
const AdminLogList: React.FC<Props> = (props) => {

    const {setPage, count, logList, page} = props

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
        <div className="adminLogList">

            <div className="header">
                <div className="id">
                    <span>{text.log.id}</span>
                </div>
                <div className="type">
                    <span>{text.log.type}</span>
                </div>
                <div className="data">
                    <span>{text.log.data}</span>
                </div>
                <div className="date">
                    <span>{text.log.date}</span>
                </div>
            </div>

            {logList.map((log:any) => (
                <AdminLogItem log={log} key={log.id} />
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

export default AdminLogList
