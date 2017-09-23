import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import axios from 'axios';

const styles = theme => ({
    root: {
        paddingTop: 0,
        width: '100%',
        maxWidth: 360,
        // background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: 0,
    },
    blueIcon: {
        color: '#9cf'
    },
    group: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    fontSize: {
        fontSize: 24,
    },
    requestGroup: {
        textIndent: 20,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    requestUrl: {
        overflow: 'hidden',
        marginRight: 4,
        whiteSpace: 'nowrap'
    }
});

class NestedList extends React.Component {
    state = {
        open1: true,
        open2: true,
        requestGroups: []
    };

    constructor(props) {
        super(props);

    }

    handleClick = (o,type) => {
        if (!o.open) {
            o.open = true
        } else {
            o.open = undefined
        }
        let $self = this
        axios.get('http://localhost:3001/requestGroupFolds' + o.id)
            .then(function (response) {
                if(type==='group'){
                    o.folds = response.data
                }else if(type==='folds'){
                    o.requests = response.data
                }
                $self.setState({})
            })
    };

    componentWillMount = () => {
        let $self = this
        axios.get('http://localhost:3001/requestGroups').then(function (response) {
            $self.setState({
                requestGroups: response.data
            })
        })
    }

    moduleClick = () => {

    };

    render() {
        const classes = this.props.classes;
        return (
            <List className={classes.root}>
                {
                    this.state.requestGroups.map(group => {
                        return <div key={group.id}>
                            <Divider/>
                            <ListItem className={classes.group} onClick={() => this.handleClick(group,'group')} button>
                                <i className="iconfont icon-module"/>
                                <ListItemText primary={group.name} secondary={group.info}/>
                                {group.open ? <i className={classes.blueIcon + " iconfont icon-down"}/> :
                                    <i className={classes.blueIcon + " iconfont icon-up"}/>}
                            </ListItem>
                            {group.open && group.folds &&
                            group.folds.map(fold => {
                                return <Collapse key={fold.id} in={true} transitionDuration="auto" unmountOnExit>
                                    <Divider/>
                                    <ListItem button className={classes.nested} onClick={() => this.handleClick(fold,'folds')}>
                                        <i className={classes.requestGroup + ' ' + classes.fontSize + " iconfont icon-Requestforquotation"}/>
                                        <ListItemText inset primary={fold.name}/>
                                        {fold.open ? <i className={classes.blueIcon + " iconfont icon-down"}/> :
                                            <i className={classes.blueIcon + " iconfont icon-up"}/>}
                                    </ListItem>
                                    {
                                        fold.open && fold.requests &&
                                        <Collapse in={fold.open} transitionDuration="auto" unmountOnExit>
                                            {fold.requests.map(request => {
                                                return <div key={request.id}>
                                                    <Divider/>
                                                    <ListItem button>
                                                        <span>{request.type}</span>
                                                        <ListItemText className={classes.requestUrl}
                                                                      primary={request.url}/>
                                                    </ListItem>
                                                </div>
                                            })
                                            }
                                        </Collapse>
                                    }
                                </Collapse>
                            })
                            }
                        </div>
                    })
                }
                {/*<Divider/>*/}
                {/*<ListItem className={classes.group} button>*/}
                {/*<i className="iconfont icon-module"/>*/}
                {/*<ListItemText primary="用户模块" secondary="80th requests"/>*/}
                {/*</ListItem>*/}
                {/*<Divider/>*/}
                {/*<ListItem className={classes.group} button>*/}
                {/*<i className="iconfont icon-module"/>*/}
                {/*<ListItemText primary="Drafts" secondary="20th requests"/>*/}
                {/*</ListItem>*/}
                {/*<Divider/>*/}
                {/*<ListItem className={classes.group} button onClick={() => this.handleClick('1')}>*/}
                {/*<i className="iconfont icon-module"/>*/}
                {/*<ListItemText primary="Inbox" secondary="33th requests"/>*/}
                {/*{this.state.open1 ? <i className={classes.blueIcon + " iconfont icon-down"}/> :*/}
                {/*<i className={classes.blueIcon + " iconfont icon-up"}/>}*/}
                {/*</ListItem>*/}
                {/*<Collapse in={this.state.open1} transitionDuration="auto" unmountOnExit>*/}
                {/*<Divider/>*/}
                {/*<ListItem button className={classes.nested} onClick={() => this.handleClick('2')}>*/}
                {/*<i className={classes.requestGroup + ' ' + classes.fontSize + " iconfont icon-Requestforquotation"}/>*/}
                {/*<ListItemText inset primary="请求分组"/>*/}
                {/*{this.state.open2 ? <i className={classes.blueIcon + " iconfont icon-down"}/> :*/}
                {/*<i className={classes.blueIcon + " iconfont icon-up"}/>}*/}
                {/*</ListItem>*/}
                {/*<Collapse in={this.state.open2} transitionDuration="auto" unmountOnExit>*/}
                {/*<Divider/>*/}
                {/*<ListItem button>*/}
                {/*<span>GE</span>*/}
                {/*<ListItemText className={classes.requestUrl}*/}
                {/*primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>*/}
                {/*</ListItem>*/}
                {/*<Divider/>*/}
                {/*<ListItem button>*/}
                {/*<span>PO</span>*/}
                {/*<ListItemText className={classes.requestUrl}*/}
                {/*primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>*/}
                {/*</ListItem>*/}
                {/*</Collapse>*/}
                {/*<Divider/>*/}
                {/*<ListItem button>*/}
                {/*<span>GE</span>*/}
                {/*<ListItemText className={classes.requestUrl}*/}
                {/*primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>*/}
                {/*</ListItem>*/}
                {/*</Collapse>*/}
                <Divider/>
                <ListItem button>
                    <span>GE</span>
                    <ListItemText className={classes.requestUrl}
                                  primary="/user/asdfdf/asdffdkfd/asdfadsf?name=lake&uuc=asdf"/>
                </ListItem>
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);