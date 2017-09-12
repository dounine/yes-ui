import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import green from 'material-ui/colors/green';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
    wrapper: {
        position: 'relative',
    },
    successButton: {
        width: 30,
        height: 30,
        top: 2,
        left: 9
    },
    progress: {
        position: 'absolute',
        top: 6,
        left: 5,
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    navBox: {
        marginTop: 10,
        marginBottom: 10,
        borderBottom: '1px solid #cccccc',
        display: 'flex'
    },
    nav: {
        marginLeft: 4,
        marginRight: 4
    },
    fileTileBox: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    fileTileItem: {
        display: 'flex',
        width: 200,
        height: 90,
        margin: 10,
        border: '1px solid #cccccc',
        borderRadius: '4px',
        // background: 'rgb(255, 216, 33)',
        cursor: 'pointer'
    },
    fileTileIcon: {
        display: 'flex',
        flex: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileTileIconSize: {
        fontSize: 38,
        color: '#666666'
    },
    fileTileInfo: {
        flex: 70,
        marginLeft: 10
    },
    fileTileName: {
        fontWeight: 700,
        width: 126,
        textAlign: 'left',
        listStyleType: 'none',
        lineHeight: '30px',
        alignItems: 'center',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap'
    },
    fileTileTip: {
        display: 'flex',
        listStyleType: 'none',
        marginTop: 10
    },
    tilePreview: {
        width: 38,
        height: 38
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: 24,
        left: 12,
    }
};

class CircularFab extends React.Component {
    state = {
        loading: false,
        success: false,
        open: false,
        navs: [
            {
                fileName: '全部资源',
                isLast: 'true',
                isRoot: 'true'
            },
        ],
        data: [
            {
                fileName: '我是文件名',
                foldCount: 10,
                fileCount: 200,
                id: 'uuid-1234adsf-asdf-asdf-qwer-1234',
                fileType: 'fold'
            },
            {
                fileName: '苍老师2017',
                foldCount: 10,
                fileCount: 200,
                id: 'uuid-1234adsf-asdf-asdf-qwer-1233',
                preview: 'http://www.easyicon.net/api/resizeApi.php?id=1176246&size=128',
                size: '1024kb',
                fileType: 'png'
            },
            {
                fileName: '苍老师2017',
                foldCount: 10,
                fileCount: 200,
                id: 'uuid-1234adsf-asdf-asdf-qwer-1233',
                preview: 'http://www.easyicon.net/api/resizeApi.php?id=1176246&size=128',
                size: '1024kb',
                fileType: 'txt'
            }
        ]
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.setState({
                            loading: false,
                            success: true,
                        });
                    }, 4e3);
                },
            );
        }
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };


    navClick = (event, n) => {
        var datas = this.state.navs
        if (n.isRoot == 'true') {
            datas = [datas[0]]
            datas[0].isLast = 'true'
            for (var i = 1, len = datas.length; i < len; i++) {
                datas.splice(i, 1)
            }
        } else {
            var isFind = false
            for (var i = 1, len = datas.length; i < len; i++) {
                if (!isFind && datas[i].id == n.id) {
                    isFind = true
                }
                if (isFind){
                    datas.splice(i, 1)
                }
            }
        }
        this.setState({
            navs: datas
        })
    };

    tileItemClick = (event, n) => {
        var datas = this.state.navs
        for (var a in datas) {
            datas[a].isLast = 'false'
        }
        datas.push({
            fileName: n.fileName,
            isLast: 'true',
            id: n.id
        })
        this.setState({})
    };

    getFileTypeInfo = (classes, n) => {
        if (n.fileType == 'fold') {
            return <li className={classes.fileTileTip}><i
                className="iconfont icon-folder"/>:{n.foldCount}&nbsp;&nbsp;<i
                className="iconfont icon-filetexto"/>:{n.fileCount}</li>
        } else if (n.fileType == 'png' || n.fileType == 'gif' || n.fileType == 'jpg') {
            return <li className={classes.fileTileTip}>
                <i className="iconfont icon-size"/>:{n.size}&nbsp;&nbsp;
                <i className="iconfont icon-format_wipe"/>:{n.fileType}
            </li>
        } else {
            return <li className={classes.fileTileTip}>
                <i className="iconfont icon-size"/>:{n.size}&nbsp;&nbsp;
                <i className="iconfont icon-format_wipe"/>:{n.fileType}
            </li>
        }
    };

    imgLoadComplete = (event,n) =>{
        n['_success'+n.id] = true
        this.setState({});
    }

    getFilePreview = (classes, n) => {
        if (n.fileType == 'fold') {
            return <i className={classes.fileTileIconSize + " iconfont icon-fold"}/>
        } else if (n.fileType == 'png' || n.fileType == 'gif' || n.fileType == 'jpg') {
            return <span><img onLoad={event => this.imgLoadComplete(event,n)} className={classes.tilePreview} src={n.preview}/>
                {n['_success'+n.id]==undefined && <CircularProgress size={36} className={classes.progress} />}
            </span>
        } else {
            return <i className={classes.fileTileIconSize + " iconfont icon-file"}/>
        }
    };

    timer = undefined;

    render() {
        const {loading, success, data, navs} = this.state;
        const classes = this.props.classes;
        let buttonClass = '';

        if (success) {
            buttonClass = classes.successButton;
        }

        return (
            <div className={classes.wrapper}>
                <IconButton className={buttonClass} onClick={this.handleOpen}>
                    <i className={"iconfont icon-resource"}></i>
                </IconButton>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    transition={<Slide direction="up"/>}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                                <i className={"iconfont icon-close"}/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                资源
                            </Typography>
                            <Button color="contrast" onClick={this.handleRequestClose}>
                                确定
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.navBox}>
                        <div style={{flex: 1, marginLeft: 10, lineHeight: '46px'}}>
                            {
                                navs.map(n => {
                                    return (
                                        <span>
                                            {
                                                n.isLast === 'true'?
                                                    <Button color="primary" onClick={event => this.navClick(event, n)}
                                                            disabled>{n.fileName}</Button>:
                                                    <Button color="primary" onClick={event => this.navClick(event, n)}
                                                            >{n.fileName}</Button>
                                            }
                                            {n.isLast === 'true' ? '' : <span className={classes.nav}>/</span>}
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <div>
                            <IconButton>
                                <i className="iconfont icon-liebiao"></i>
                            </IconButton>
                        </div>
                    </div>
                    <List hidden>
                        <ListItem button>
                            <ListItemText primary="共享资源" secondary="1个文件夹30个文件"/>
                        </ListItem>
                        <Divider/>
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys"/>
                        </ListItem>
                    </List>
                    <div className={classes.fileTileBox}>
                        {data.map(n => {
                            return (
                                <Button onClick={event => {
                                    this.tileItemClick(event, n)
                                }}
                                        className={classes.fileTileItem}>
                                    <div className={classes.fileTileIcon}>
                                        {this.getFilePreview(classes, n)}
                                    </div>
                                    <div className={classes.fileTileInfo}>
                                        <li className={classes.fileTileName}><a title={n.fileName}>{n.fileName}</a></li>
                                        {this.getFileTypeInfo(classes, n)}
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                </Dialog>
            </div>
        );
    }
}

CircularFab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularFab);