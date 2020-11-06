import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminReportUserItem from "./AdminReportUserItem";

// Props
interface Props {
    reports: any
    page: number
    count: number
    setPage: (page:number) => void
    setReports: (reports:any) => void
}

// Component
const AdminReportUserList: React.FC<Props> = (props) => {

    const {reports, page, setPage, count, setReports} = props

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
        <div className="adminReportUserList">

            <div className="header">
                <div className="user">
                    <span>{text.userReport.user}</span>
                </div>
                <div className="count">
                    <span>{text.userReport.count}</span>
                </div>
            </div>


            {reports.map((report:any) => (
                <AdminReportUserItem report={report} reports={reports} setReports={setReports} key={report.userId}/>
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

export default AdminReportUserList
