import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminSeasonItem from "./AdminSeasonItem";


// Props
interface Props {
    seasonList: any
    page: number
    count: number
    setPage: (page:number) => void
}

// Component
const AdminSeasonList: React.FC<Props> = (props) => {

    const {seasonList, page, setPage, count} = props

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
        <div className="adminSeasonList">

            <div className="header">
                <div className="year">
                    <span>{text.season.year}</span>
                </div>
                <div className="month">
                    <span>{text.season.month}</span>
                </div>
                <div className="more">
                    <span>{text.season.show}</span>
                </div>
            </div>


            {seasonList.map((season:any) => (
                <AdminSeasonItem season={season} key={season.year+" "+season.month} />
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

export default AdminSeasonList
