import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminQuestPlayedItem from "./AdminQuestPlayedItem";

// Props
interface Props {
    played: any
    count: number
    page: number
    setPage: (page:number) => void
}

// Component
const AdminQuestPlayedList: React.FC<Props> = (props) => {

    const {played, count, page, setPage} = props

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
        <div className="adminQuestPlayedList">
            <div className="header">
                <div className="id">
                    <span>{text.questDetails.id}</span>
                </div>
                <div className="stage">
                    <span>{text.questDetails.stage}</span>
                </div>
                <div className="user">
                    <span>{text.questDetails.userName}</span>
                </div>
                <div className="status">
                    <span>{text.questDetails.status}</span>
                </div>
            </div>


            {played.map((quest:any) => (
               <AdminQuestPlayedItem played={quest} key={quest.userQuestId} />
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

export default AdminQuestPlayedList
