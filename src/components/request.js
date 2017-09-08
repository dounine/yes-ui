import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Tabs, {Tab} from 'material-ui/Tabs';
import RequestMethod from './request-method';
import RequestUrl from './request-url';
import RequestOptions from './request-options';

function TabContainer(props) {
    return <div style={{padding: 20}}>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        // backgroundColor: theme.palette.background.paper,
    },
    requestName:{
      height:40,
    },
    request: {
        display: 'flex'
    },
    requestMethod: {
        flex: 5
    },
    requestUrl: {
        flex: 50
    },
    requestOption: {
        flex: 30,
        marginTop:10
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class ScrollableTabsButtonAuto extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="white">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="用户登录操作"/>
                        <Tab label="Item Two"/>
                        <Tab label="Item Three"/>
                        <Tab label="Item Four"/>
                        <Tab label="Item Five"/>
                        <Tab label="Item Six"/>
                        <Tab label="Item Seven"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <div className={classes.requestName}>
                        <span>用户登录操作</span>
                    </div>
                    <div className={classes.request}>
                        <div className={classes.requestMethod}>
                            <RequestMethod/>
                        </div>
                        <div className={classes.requestUrl}>
                            <RequestUrl/>
                        </div>
                        <div className={classes.requestOption}>
                            <Button raised className={classes.button}>
                                参数
                            </Button>
                            <Button raised color="primary" className={classes.button}>
                                发送
                            </Button>
                        </div>
                    </div>
                    <div className={classes.requestOption}>
                        <RequestOptions />
                    </div>
                </TabContainer>}
                {value === 1 && <TabContainer>{'Item Two'}</TabContainer>}
                {value === 2 && <TabContainer>{'Item Three'}</TabContainer>}
                {value === 3 && <TabContainer>{'Item Four'}</TabContainer>}
                {value === 4 && <TabContainer>{'Item Five'}</TabContainer>}
                {value === 5 && <TabContainer>{'Item Six'}</TabContainer>}
                {value === 6 && <TabContainer>{'Item Seven'}</TabContainer>}
            </div>
        );
    }
}

ScrollableTabsButtonAuto.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);