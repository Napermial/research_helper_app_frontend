import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LoginIcon from "@mui/icons-material/Login";
import {useAuth0} from "@auth0/auth0-react";
import {Avatar} from "@mui/material";
import {deepPurple} from "@mui/material/colors";


export default function MenuAppBar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();

    const userName: string = user?.email || "U";

    const handleLogin = async () => {
        await loginWithRedirect();
    };


    const handleLogout = () => {
        logout({returnTo: window.location.origin})
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Research helper app
                    </Typography>
                    {isAuthenticated && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar sx={{bgcolor: deepPurple[500]}}>{userName[0]}</Avatar>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My experiments</MenuItem>
                                <MenuItem onClick={handleLogout}>Log out</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!isAuthenticated &&
                        <IconButton size="large" color="inherit" onClick={handleLogin}>
                            <LoginIcon/>
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        </Box>

    );
}