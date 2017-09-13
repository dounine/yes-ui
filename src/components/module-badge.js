import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Badge from 'material-ui/Badge';
import './iconfont/iconfont.css';

const styles = theme => ({
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`,
    },
    badeFont:{
        fontSize:28
    }
});

function SimpleBadge(props) {
    const classes = props.classes;
    return (
        <div>
            <Badge className={classes.badge} badgeContent={10} color="primary">
                <i className={classes.badeFont+" iconfont icon-Requestforquotation"}></i>
            </Badge>
        </div>
    );
}

SimpleBadge.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBadge);
