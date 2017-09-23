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
        // textIndent: 20,
        color: 'rgba(0, 0, 0, 0.54)'
    },
    requestUrl: {
        overflow: 'hidden',
        marginRight: 4,
        whiteSpace: 'nowrap'
    }
});

const levelTextIndent = 16;

class NestedList extends React.Component {
    state = {
        open1: true,
        open2: true,
        requestGroups: []
    };


    constructor(props) {
        super(props);

    }

    handleClick = (o, type) => {
        if (!o.open) {
            o.open = true
        } else {
            o.open = undefined
        }
        let $self = this
        axios.get('/requestGroupFolds' + o.id)
            .then(function (response) {
                o.folds = response.data
                $self.setState({})
            })
    };

    componentWillMount = () => {
        let $self = this
        axios.get('/requestGroups').then(function (response) {
            $self.setState({
                requestGroups: response.data
            })
        })
    }

    renderGroup = (group, classes) => {
        return <div key={group.id}>
            <Divider/>
            <ListItem className={classes.group} onClick={() => this.handleClick(group)} button>
                <i className="iconfont icon-module"/>
                <ListItemText primary={group.name} secondary={group.info}/>
                {group.open ? <i className={classes.blueIcon + " iconfont icon-down"}/> :
                    <i className={classes.blueIcon + " iconfont icon-up"}/>}
            </ListItem>
        </div>
    }

    renderFold = (fold, classes) => {
        let level = fold.level
        return <div key={fold.id}>
            <Divider/>
            <ListItem className={classes.nested} onClick={() => this.handleClick(fold)} button>
                <i style={{textIndent: levelTextIndent * level - (level>1?level*3:0)}}
                   className={classes.requestGroup + ' ' + classes.fontSize + " iconfont icon-Requestforquotation"}/>
                <ListItemText primary={fold.name}/>
                {fold.open ?
                    <i className={classes.blueIcon + " iconfont icon-down"}/> :
                    <i className={classes.blueIcon + " iconfont icon-up"}/>}
            </ListItem>
        </div>
    }

    renderFoldRecursion = (o, classes, level) => {
        return <Collapse in={o.open} transitionDuration="auto" unmountOnExit>
            {
                o.folds.map(fold => {
                    fold.level = level
                    return <div key={fold.id}>
                        {
                            fold.type === 'request' ? this.renderRequest(fold, classes) : this.renderFold(fold, classes)
                        }
                        {
                            fold.open && fold.type === 'folds' && fold.folds && this.renderFoldRecursion(fold, classes, fold.level + 1)
                        }
                    </div>
                })
            }
        </Collapse>

    }

    renderRequest = (request, classes) => {
        let level = request.level
        return <div key={request.id}>
            <Divider/>
            <ListItem button>
                <span style={{paddingLeft:10,textIndent: levelTextIndent * (level-1)-(level>1?level*3:0)}}>{request.methodType}</span>
                <ListItemText className={classes.requestUrl}
                              primary={request.url}/>
            </ListItem>
        </div>
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
                            {
                                group.type === 'groups' && this.renderGroup(group, classes)
                            }
                            {
                                group.open && group.folds && this.renderFoldRecursion(group, classes, 1)
                            }
                        </div>
                    })
                }
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);