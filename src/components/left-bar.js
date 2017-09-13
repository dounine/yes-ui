import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import {withRouter} from 'react-router';

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
    flexStart: {
        display: 'flex',
        flex: 1,
    },
    flexEnd: {
        display: 'flex',
    },
    filterIcon: {
        fontSize: 24
    }
};


class LeftBar extends Component {
    groupClick = (name) => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        arr[2] = name;
        if(pathname!==arr.join('/')){
            this.props.history.push(arr.join('/'))
        }
    };

    render() {
        return (
            <div style={styles.flexStart}>
                <IconButton onClick={() => this.groupClick('all')}>
                    <i style={styles.filterIcon} className="iconfont icon-all"/>
                </IconButton>
                <IconButton onClick={() => this.groupClick('team')}>
                    <i style={styles.filterIcon} className="iconfont icon-team"/>
                </IconButton>
                <IconButton onClick={() => this.groupClick('mine')}>
                    <i style={styles.filterIcon} className="iconfont icon-mine"/>
                </IconButton>
            </div>
        )
    }
}

const ShowTheLocationWithRouter = withRouter(LeftBar);
export default ShowTheLocationWithRouter;