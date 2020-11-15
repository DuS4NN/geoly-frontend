import React from "react"
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import AdminPaymentItem from "./AdminPaymentItem";
import {NavLink} from "react-router-dom";


// Props
interface Props {
    paymentList: any
    page: number
    count: number
    setPage: (page:number) => void
}

// Component
const AdminPaymentList: React.FC<Props> = (props) => {

    const {paymentList, page, setPage, count} = props

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
        <div className="adminPaymentList">

            <div className="header">
                <div className="user">
                  <span>{text.payment.user}</span>
                </div>
                <div className="agreement">
                    <span>{text.payment.agreement}</span>
                </div>
                <div className="state">
                    <span>{text.payment.state}</span>
                </div>
                <div className="start">
                    <span>{text.payment.start}</span>
                </div>
                <div className="end">
                    <span>{text.payment.end}</span>
                </div>
            </div>


            {paymentList.map((payment:any) => (
                <AdminPaymentItem payment={payment} key={payment.agreement} />
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

export default AdminPaymentList
