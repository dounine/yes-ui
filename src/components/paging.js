import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton'
import Pages from './pages';


const styles = {
    pages: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    pageButton: {
        margin: 4,
        fontSize: 30,
    },
    pageBlock: {
        width: 377,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    pageIcon: {
        fontSize: 30
    },
};

function Paging(props) {
    const classes = props.classes;

        return (
            <div style={styles.pages}>
                <div style={styles.pageButton}>
                    <Pages/>
                </div>
                <IconButton style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-rentou"/>
                </IconButton>
                <IconButton style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-prev"/>
                </IconButton>
                <IconButton style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-next"/>
                </IconButton>
                <IconButton style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-foot"/>
                </IconButton>
            </div>
        );
}

Paging.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Paging);