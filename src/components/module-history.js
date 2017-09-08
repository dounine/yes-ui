import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
// import InboxIcon from 'material-ui-icons/MoveToInbox';
// import DraftsIcon from 'material-ui-icons/Drafts';
// import SendIcon from 'material-ui-icons/Send';
// import ExpandLess from 'material-ui-icons/ExpandLess';
// import ExpandMore from 'material-ui-icons/ExpandMore';
// import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: 0,
        // marginLeft:-10
    },
});

class NestedList extends React.Component {
    state = { open: true };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    moduleClick = () =>{

    };

    render() {
        const classes = this.props.classes;
        return (
            <List className={classes.root}>
                <Divider />
                <ListItem button>
                    <Avatar>
                        <i className="iconfont icon-module"/>
                    </Avatar>
                    <ListItemText primary="用户模块"/>
                </ListItem>
                <Divider inset/>
                <ListItem button>
                    <Avatar>
                        <i className="iconfont icon-module"/>
                    </Avatar>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <Divider inset/>
                <ListItem button onClick={this.handleClick}>
                    <Avatar>
                        <i className="iconfont icon-module"/>
                    </Avatar>
                    <ListItemText primary="Inbox" />
                    {this.state.open ? <i className="iconfont icon-down"/> : <i className="iconfont icon-up"/>}
                </ListItem>
                <Collapse in={this.state.open} transitionDuration="auto" unmountOnExit>
                    <Divider inset/>
                    <ListItem className={classes.nested}>
                        {/*<Avatar>*/}
                            {/*<i className="iconfont icon-Requestforquotation"/>*/}
                        {/*</Avatar>*/}
                        <ListItemText inset primary="Starred" />
                    </ListItem>
                </Collapse>
            </List>
        );
    }
}

NestedList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);