// @flow

import React, {Component} from 'react';
import Button from 'material-ui/Button';
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import withRoot from '../components/withRoot';
import Header from '../components/top';
import IconButton from 'material-ui/IconButton'
import Module from '../components/module';
import Search from '../components/search';


const styles = {
    container: {},
    list: {
        display: 'flex',
        paddingLeft:20,
        paddingRight:10,
        flexWrap:'wrap'
    },
    search: {
        display: 'inline-flex'
    },
    pages: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    pageButton: {
        margin: 4,
        fontSize: 30
    },
    pageBlock: {
        width: 377,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    pageIcon: {
        fontSize: 30
    },
    filterIcon: {
        fontSize: 24
    },
    filterIconHeight: {
        height: 60,
        display: 'flex',
        alignItems: 'center'
    },
    flexStart:{
        display:'flex',
        flex:1,
    },
    flexEnd:{
        display: 'flex',

    }
};

class Index extends Component {
    state = {
        open: false,
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    render() {
        return (
            <div style={styles.container}>
                <Header/>
                <div style={styles.filterIconHeight}>
                    <div style={styles.flexStart}>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-all"/>
                        </IconButton>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-team"/>
                        </IconButton>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-mine"/>
                        </IconButton>
                        <div style={styles.search}>
                            <Search/>
                        </div>
                    </div>

                    <div style={styles.flexEnd}>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-list"/>
                        </IconButton>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-liebiao"/>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <div style={styles.list}>
                        <Module/>
                        <Module/>
                        <Module/>

                        <Module/>
                        <Module/>
                        <Module/>
                    </div>
                </div>
                <div style={styles.pages}>
                    <div style={styles.pageBlock}></div>
                    <div style={styles.pageBlock}></div>
                    <div style={styles.pageBlock}>
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

                </div>
            </div>
        );
    }
}

export default withRoot(Index);
