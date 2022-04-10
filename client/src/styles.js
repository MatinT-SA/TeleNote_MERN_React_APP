import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
        heading: {
            fontSize: "2rem",
        },
        appBar: {
            padding: "0.25rem 2rem"
        }
    },
    heading: {
        color: 'rgba(0, 183, 255, 1)',
        fontWeight: 'bold'
    },
    image: {
        marginLeft: '25px',
        borderRadius: '7px'
    },
    [theme.breakpoints.down('sm')]: {
        cardContent: {
            flexDirection: "column-reverse"
        }
    }
}));
