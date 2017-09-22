import React from 'react';
import withRoot from '../components/withRoot';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/Menu';
import Search from '../components/search';
import ModuleLeftTabs from '../components/module-slide';
import Requests from '../components/request/requests';
import SearchIcon from '../components/icons/SearchIcon';
import ErrorTip from '../components/error-tip';
import config from '../config.json';
import axios from 'axios';
// import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';


const drawerWidth = 340;

const styles = theme => ({
    root: {
        width: '100%',
        // height: '100%',//selected会引起header左边标题移动
        // marginTop: theme.spacing.unit * 3,
        marginTop: 0,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawerInner:{
        height: 'auto',
        overflowX:'hidden',
    },
    drawerPaper: {
        height: 'calc(100% - 10px)',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        width: '100%',
        marginLeft: -drawerWidth,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: 'calc(100% - 60px)',
        marginTop: 60,
        [theme.breakpoints.up('sm')]: {
            content: {
                height: 'calc(100% - 64px)',
                marginTop: 64,
            },
        },
    },
    contentShift: {
        marginLeft: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
});

class PersistentDrawer extends React.Component {
    state = {
        open: false,
        errorTip: false,
        rootHeight:document.documentElement.clientHeight,
        errorMsg:''
    };

    componentDidMount = () =>{
        let $self = this
        window.onresize = function () {//改变浏览器大小有性能影响,不要会有样式错乱影响
            $self.setState({
                rootHeight:document.documentElement.clientHeight
            })
        }
    }

    componentWillMount = () => {
        var $self = this
        axios.defaults.baseURL = config.url;
        axios.interceptors.response.use(function (response) {
            $self.setState({
                errorTip: false
            })
            return response;
        }, function (error) {
            $self.setState({
                errorTip: true,
                errorMsg: error.toString()
            })
            return Promise.reject(error);
        });
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root} style={{height:this.state.rootHeight,overflowY:'auto'}}>
                <ErrorTip errorMsg={this.state.errorMsg} errorTip={this.state.errorTip}/>
                <div className={classes.appFrame}>
                    <AppBar id={"header"} className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="contrast"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <i className="iconfont icon-slidedot"/>
                            </IconButton>
                            <Typography type="title" color="inherit" noWrap>
                                用户模块
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        type="persistent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.drawerInner}>
                            <div className={classes.drawerHeader}>
                                <Search/>
                                <IconButton>
                                    <SearchIcon/>
                                </IconButton>
                                <IconButton onClick={this.handleDrawerClose}>
                                    <i className="iconfont icon-left"/>
                                </IconButton>
                            </div>
                            <Divider/>
                            <ModuleLeftTabs/>
                        </div>
                    </Drawer>
                    <main className={classNames(classes.content, this.state.open && classes.contentShift)}>
                        <Requests/>
                    </main>
                </div>
            </div>
        );
    }
}

PersistentDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};
const ShowTheLocationWithRouter = withStyles(styles)(PersistentDrawer)
// export default withStyles(styles)(PersistentDrawer);
export default withRoot(ShowTheLocationWithRouter);