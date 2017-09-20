import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import {blue} from 'material-ui/colors';
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import green from 'material-ui/colors/green';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Slide from 'material-ui/transitions/Slide';
import {CircularProgress} from 'material-ui/Progress';
import FileItem from './select-file-item';
import FileItemMore from './select-file-item-more';
import config from '../../config.json';
import Preview from './preview';
import File from './file';
import uuid4 from 'uuid/v4';
import axios from 'axios';

const styles = theme => ({
    wrapper: {
        position: 'relative',
    },
    successButton: {
        marginRight: 10,
        width: 30,
        height: 30,
        top: 2,
        left: 9
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
        cursor: 'pointer'
    },
    fileTileItemFold: {
        display: 'flex',
        width: 200,
        height: 90,
        margin: 10,
        border: '1px solid #cccccc',
        borderRadius: '4px',
        background: blue[300],
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
    fileTileIconSizeFold: {
        fontSize: 38,
        color: 'white'
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
});

class Resource extends React.Component {
    state = {
        fileItemMore: true,
        loading: false,
        preview: false,
        previewSrc: '',
        previewAlt: '',
        success: false,
        resourceData:this.props.resourceData,
        open: this.props.resourceButton,
        navs: [
            {
                fileName: '全部资源',
                isLast: 'true',
                uuid: uuid4(),
                id: '0',
                isRoot: 'true'
            },
        ],
        selected: [],
        data: []
    };

    componentWillMount() {
        if(this.state.resourceData.length>0){
            for(let n of this.state.resourceData){
                this.state.selected.push({
                    fileName: n.fileName,
                    uuid: uuid4(),
                    id: n.id,
                    fileType: n.fileType,
                    preview: n.preview
                })
            }
            this.setState({})
        }
        axios.get('/list')
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
    }

    tileItemClick = (event, n) => {
        var navs = this.state.navs
        if (n.fileType === 'fold' && !navs.containKeyValue('id', n.id)) {
            for (var a in navs) {
                navs[a].isLast = 'false'
            }
            navs.push({
                fileName: n.fileName,
                isLast: 'true',
                id: n.id,
                uuid: uuid4()
            })
        }
        if (n.fileType !== 'fold') {
            if (!this.state.selected.containKeyValue('id', n.id)) {
                n.check = true
                this.state.selected.push({
                    fileName: n.fileName,
                    uuid: uuid4(),
                    id: n.id,
                    fileType: n.fileType,
                    preview: n.preview
                })
            }
        } else {
            if(!n.click){
                n.click = true //禁止双击
                this.setState({})
                axios.get(config.url + `/files${n.id}`)
                    .then((response) => {
                        for(let o of response.data){ //将选中的文件变色
                            for(let oc of this.state.resourceData){
                                if(o.id===oc.id){
                                    o.check = true
                                    break
                                }
                            }
                        }
                        this.setState({
                            data: response.data
                        })
                    })
            }

        }

        this.setState({})
    };

    imgPreview = (event, src, alt) => {
        this.setState({
            preview: true,
            previewSrc: src,
            previewAlt: alt
        })
    }

    imgPreviewRequestClose = () => {
        this.setState({
            preview: false,
        })
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
        this.props.resourceClose(null)
        this.setState({open: false});
    };

    handleRequestConfirm = () => {
        this.props.resourceClose(this.state.selected,true)
        this.setState({open: false});
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.resourceButton) {
            this.setState({open: true});
        }
    };

    navClick = (event, n) => {
        var datas = this.state.navs
        if (n.isRoot === 'true') {
            datas = [datas[0]]
            datas[0].isLast = 'true'
            for (var i = 1, len = datas.length; i < len; i++) {
                datas.splice(i, 1)
            }
            axios.get(config.url + `/list`)
                .then((response) => {
                    response.data.forEach(function (r) {
                        r.uuid = uuid4()
                    })
                    this.setState({
                        data: response.data
                    })
                })
        } else {
            var isFind = false
            for (var index = 1, sizeLen = datas.length; index < sizeLen; index++) {
                if (!isFind && datas[index].id === n.id) {
                    isFind = true
                }
                if (isFind) {
                    datas.splice(index, 1)
                }
            }

        }
        this.setState({
            navs: datas
        })
    };

    fileDeleteCallback = (id, close) => {
        if (close) {
            for(let o of this.state.data){
                o['check'] = undefined
            }
            this.setState({
                selected: id
            })
        } else {
            this.state.selected.removeByKey('id', id)
            this.state.data.updateForKeyValue('id', id, 'check', undefined)
            this.setState({})
        }
    }

    getFilePreview = (classes, n) => {
        if (n.fileType === 'fold') {
            return <i className={classes.fileTileIconSizeFold + " iconfont icon-fold"}/>
        } else if (n.fileType === 'png' || n.fileType === 'gif' || n.fileType === 'jpg') {
            return <span><img onLoad={event => this.imgLoadComplete(event, n)} alt={n.fileName}
                              className={classes.tilePreview} src={n.preview}/>
                {n['_success' + n.id] === undefined && <CircularProgress size={36} className={classes.progress}/>}
            </span>
        } else {
            return <i className={classes.fileTileIconSize + " iconfont icon-file"}/>
        }
    };

    timer = undefined;

    render() {
        const {data, navs} = this.state;
        const classes = this.props.classes;

        return (
            <div
                className={classes.wrapper}>
                {/*<IconButton className={classes.successButton} onClick={this.handleOpen}>*/}
                    {/*<i className={"iconfont icon-resource"}></i>*/}
                {/*</IconButton>*/}
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
                            <Button color="contrast" onClick={this.handleRequestConfirm}>
                                确定
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.navBox}>
                        <div style={{flex: 1, marginLeft: 10, lineHeight: '46px'}}>
                            {
                                navs.map(n => {
                                    return (
                                        <span key={n.uuid}>
                                            {
                                                n.isLast === 'true' ?
                                                    <Button color="primary" onClick={event => this.navClick(event, n)}
                                                            disabled>{n.fileName}</Button> :
                                                    <Button color="primary" onClick={event => this.navClick(event, n)}
                                                    >{n.fileName}</Button>
                                            }
                                            {n.isLast === 'true' ? '' : <span className={classes.nav}>/</span>}
                                        </span>
                                    );
                                })
                            }
                        </div>
                        <div style={{display: 'flex'}}>
                            <FileItem imgPreview={this.imgPreview} fileDeleteCallback={this.fileDeleteCallback} selected={this.state.selected}/>
                            {this.state.selected.length > 2 &&
                            <FileItemMore  imgPreview={this.imgPreview} fileDeleteCallback={this.fileDeleteCallback} open={this.state.fileItemMore}
                                          datas={this.state.selected}/>}
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
                                <File imgPreview={this.imgPreview} key={n.id} n={n} tileItemClick={this.tileItemClick}/>
                            );
                        })}
                        <Preview alt={this.state.previewAlt} previewSrc={this.state.previewSrc}
                                 preview={this.state.preview} imgPreviewRequestClose={this.imgPreviewRequestClose}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

Resource.propTypes = {
    classes: PropTypes.object.isRequired,
    resourceButton: PropTypes.bool.isRequired,
    resourceClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Resource);