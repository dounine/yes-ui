import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/Menu';


const styles = {
    root: {
        marginTop: 0,
        width: '100%',
    },
    flex: {
        flex: 1,
    },
};

function ButtonAppBar(props) {
    const classes = props.classes;
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Yes Doc API
                    </Typography>
                    <Button color="contrast">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);