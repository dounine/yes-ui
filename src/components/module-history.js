import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: 0,
    },
    blueIcon:{
        color:'#9cf'
    },
    group: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    fontSize: {
        fontSize: 24,
    },
    requestGroup: {
        textIndent:20,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    requestUrl: {
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
});

class NestedList extends React.Component {
    state = {
        open1: true,
        open2: true
    };

    handleClick = (a) => {
        var name = "open" + a
        var value = !this.state[name]
        var obj = {}
        obj[name] = value
        this.setState(obj);
    };

    moduleClick = () => {

    };

    render() {
        const classes = this.props.classes;
        return (
            <List className={classes.root}>
                <Divider/>
                <ListItem className={classes.group} button>
                    <i className="iconfont icon-module"/>
                    <ListItemText primary="用户模块"/>
                </ListItem>
                <Divider/>
                <ListItem className={classes.group} button>
                    <i className="iconfont icon-module"/>
                    <ListItemText primary="Drafts"/>
                </ListItem>
                <Divider/>
                <ListItem className={classes.group} button onClick={() => this.handleClick('1')}>
                    <i className="iconfont icon-module"/>
                    <ListItemText primary="Inbox"/>
                    {this.state.open1 ? <i className={classes.blueIcon + " iconfont icon-down"}/> : <i className={classes.blueIcon + " iconfont icon-up"}/>}
                </ListItem>
                <Collapse in={this.state.open1} transitionDuration="auto" unmountOnExit>
                    <Divider/>
                    <ListItem button className={classes.nested} onClick={() => this.handleClick('2')}>
                        <i className={classes.requestGroup + ' ' + classes.fontSize + " iconfont icon-Requestforquotation"}/>
                        <ListItemText inset primary="请求分组"/>
                        {this.state.open2 ? <i className={classes.blueIcon + " iconfont icon-down"}/> : <i className={classes.blueIcon + " iconfont icon-up"}/>}
                    </ListItem>
                    <Collapse in={this.state.open2} transitionDuration="auto" unmountOnExit>
                        <Divider/>
                        <ListItem button>
                            <span>GE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>PO</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>PU</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>PA</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <ListItem button>
                            <span>DE</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <span>OP</span>
                            <ListItemText className={classes.requestUrl}
                                          primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                        </ListItem>
                    </Collapse>
                </Collapse>
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);