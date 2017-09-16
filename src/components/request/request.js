import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Tabs, {Tab} from 'material-ui/Tabs';
import RequestMethod from './request-method';
import RequestUrl from './request-url';
import RequestOptions from './request-options';
import RequestQuery from './request-options-request';
import Response from '../response';

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
    requestName: {
        height: 40,
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
        marginTop: 10
    },
    button: {
        margin: theme.spacing.unit,
    },
    response: {}
});

class ScrollableTabsButtonAuto extends React.Component {
    defaultHost = "http://yes-ui"
    params = []
    state = {
        urlErrorTipMsg: undefined,
        value: 0,
        urlValue: '/user/login?username=lake&password=1234&a=b',
        requestQuery: false,
        params: []
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    requestQueryClick = () => {
        this.setState({
            requestQuery: !this.state.requestQuery
        })
    };


    getUrlParams = (urlPath) => {
        if (urlPath.indexOf('/') !== 0) {
            this.setState({
                urlErrorTipMsg: 'url地扯不正确,只能以/开头'
            })
            return
        } else {
            this.setState({
                urlErrorTipMsg: undefined
            })
        }

        let url = new URL(this.defaultHost + urlPath);
        var params = []
        for (let p of url.searchParams) {
            params.push({
                name: p[0],
                value: p[1]
            })
        }
        return params
    }

    componentWillMount = () => {
        let params = this.getUrlParams(this.state.urlValue)
        this.setState({
            params: params
        })
    }

    urlChange = (event) => {
        let params = this.getUrlParams(event.target.value)
        this.setState({
            params: params,
            urlValue:event.target.value
        })
    };

    returnInputEl = (target) => {
        this.requestUrlRef = target
    };

    childQueryChange = (params,reset) => {
        var ss = []
        for (let o of params) {
            if (o.name.trim() !== '' || o.value.trim() !== '') {
                ss.push(o.name + '=' + o.value)
            }
        }
        if (ss.length > 0) {
            let url = new URL(this.defaultHost + this.state.urlValue);
            let urlPath = (url.pathname + '?' + ss.join('&'))
            this.requestUrlRef.value = urlPath
            if(!reset){
                this.setState({
                    params: params
                })
            }

        } else {
            let url = new URL(this.defaultHost + this.state.urlValue);
            this.requestUrlRef.value = (url.pathname)
        }
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit">
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
                            <RequestUrl returnInputEl={this.returnInputEl} value={this.state.urlValue}
                                        tipMsg={this.state.urlErrorTipMsg} onChange={this.urlChange}/>
                        </div>
                        <div className={classes.requestOption}>
                            <Button color={this.state.requestQuery ? "contrast" : "default"}
                                    onClick={this.requestQueryClick} raised className={classes.button}>
                                参数
                            </Button>
                            <Button raised color="primary" className={classes.button}>
                                发送
                            </Button>
                        </div>
                    </div>
                    <div>
                        {
                            this.state.requestQuery ?
                                <RequestQuery childQueryChange={this.childQueryChange} params={this.state.params}/> :
                                <RequestQuery hidden="hidden" childQueryChange={this.childQueryChange}
                                              params={this.state.params}/>
                        }
                    </div>
                    <div className={classes.requestOption}>
                        <RequestOptions/>
                    </div>
                    <div className={classes.response}>
                        <Response/>
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