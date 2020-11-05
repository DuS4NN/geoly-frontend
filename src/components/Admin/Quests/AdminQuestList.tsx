import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminQuestItem from "./AdminQuestItem";

// Props
interface Props {
    questList: any
    page: number
    count: number
    setPage: (page:number) => void
}

// Component
const AdminQuestList: React.FC<Props> = (props) => {

    const {questList, page, setPage, count} = props

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
        <div className="adminQuestList">

            <div className="header">
                <div className="id">
                    <span>{text.quest.id}</span>
                </div>
                <div className="quest">
                    <span>{text.quest.quest}</span>
                </div>
                <div className="date">
                    <span>{text.quest.createdAt}</span>
                </div>
            </div>


            {questList.map((quest:any) => (
                <AdminQuestItem quest={quest} key={quest.id} />
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

export default AdminQuestList
