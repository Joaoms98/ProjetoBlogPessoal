import React from 'react';
import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useLocalStorage from 'react-use-localstorage';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export default function MenuAppBar() {
  let navigate = useNavigate();
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [token, setToken] = useLocalStorage('token');

  function goLogout() {
      setToken('')
      alert("Usuário deslogado")
      navigate('/login')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{backgroundColor: "#000000"}}>
        {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
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
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}><Link to='/login'><button className='text-decorator-nome-menu'> Login</button></Link></MenuItem>
                <MenuItem onClick={handleClose}><button className='text-decorator-nome-menu' onClick={goLogout}> Logout</button></MenuItem>
              </Menu>
            </div>
          )}
          <Link to='/home' className='text-decorator-nome'>
            <Typography variant="h6" className={classes.title}>
            Home
            </Typography>
          </Link>
          <Link to='/home' className='text-decorator-nome'>
            <Typography variant="h6" className={classes.title}>
            Postagens
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
