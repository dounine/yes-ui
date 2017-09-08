import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {withRouter} from 'react-router';
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

class ButtonAppBar extends Component{

    module = () =>{
        this.props.history.push('/module/1234')
    }

    render(){
        return (
            <div style={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit" style={styles.flex}>
                            Yes Doc API
                        </Typography>
                        <Button onClick={this.module} color="contrast">
                            项目
                        </Button>
                        <Button color="contrast">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ShowTheLocationWithRouter = withRouter(ButtonAppBar);
export default withStyles(styles)(ShowTheLocationWithRouter);
