import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode';

import useStyles from './styles'
import TeleNoteLogo from '../../images/TeleNoteLogo.png'
import { LOGOUT } from '../../constants/actionTypes'

const Navbar = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            //the code below is in milliseconds which means 1 second here and it helps us to find out if the token is expired or not
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: LOGOUT });

        history.push('/');

        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img src={TeleNoteLogo} className={classes.image} alt="TeleNote Logo" height="100" width="170" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>
                            {user?.result.name}
                        </Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;