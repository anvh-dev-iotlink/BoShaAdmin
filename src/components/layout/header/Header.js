import '../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import * as React from 'react';
import { useState } from 'react';
import { AppBar, Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Grid } from "@mui/material";
import { useEffect } from 'react';
import { firebaseService } from '../../../services/firebase.services';

const settings = ['Tài khoản','Đăng xuất'];

function Header() {
    let navigate = useNavigate()
    let isLogin = false;
    const userName = localStorage.getItem("Name")
    const [ava, setAva] = useState("")
    const [isHover, setIsHover] = useState(true)
    const [isLoadingCate, setIsLoadingCate] = useState(true)
    const [isLoadingAva, setIsLoadingAva] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [categories, setCategories] = React.useState([])
    const [data, setData] = useState([])


    if (userName) {
        isLogin = true
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }

    const SignIn = (event) => {
        navigate("/logIn")
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAvaMenuClick = (event, setting) => {
        switch (setting) {
            case 'Đăng xuất': logout()
                break;
            case 'Tài khoản': navigate('/user/userInfo')
                break;
            default: navigate('/')
        }
        handleCloseUserMenu()
    };

    const setAvaImg = (rs) => {
        setAva(rs)
        setIsLoadingAva(false);
    }


    useEffect(() => {
        if (localStorage.getItem("UserId")) {
            setIsLoadingAva(true);
            firebaseService.getAva(localStorage.getItem("UserId"), setAvaImg)
        }else{
            setIsLoadingAva(false)
        }
    }, [])

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#89D5C9" }}>
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => { navigate("/") }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            BOSHA-ADMIN
                        </Typography>

                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            BOSHA-ADMIN
                        </Typography>

                        {isLogin ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Mở trang của bạn">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        {isLoadingAva === false ?
                                            <Avatar alt={userName} src={ava} />
                                            : <></>}
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={(event) => handleAvaMenuClick(event, setting)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            :
                            <Box sx={{ flexGrow: 0 }}>
                                <Button sx={{ my: 2, color: 'white', display: 'block', fontFamily: 'monospace', fontSize: 20 }}
                                    onClick={(event) => SignIn(event)}>
                                    Đăng nhập
                                </Button>
                            </Box>
                        }
                    </Toolbar>
                    {isLoadingCate === false ? <div className='header__toolbar-hover' hidden={isHover} style={{ zIndex: 1 }} onMouseLeave={() => { setIsHover(!isHover); }}>
                        {categories.map((cate) => (
                            <div className='header__toolbar-category-list-item' onClick={(e) => { navigate(`/book/search/true?categories=${cate.id}`) }}>{cate.name}</div>
                        ))}
                    </div> : <></>}
                </Container>
            </AppBar>
        </>
    );
}

export default Header;