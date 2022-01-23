import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";

import { logout } from "../../actions/auth";
import memories from "../../images/memories.png";
import useStyles from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();

  const logoutHandler = useCallback(() => {
    dispatch(logout(navigate));
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logoutHandler();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logoutHandler]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/" className={classes.link}>
          <Typography className={classes.heading} variant="h2" align="center">
            Memories
          </Typography>
        </Link>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/auth" className={classes.link}>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
