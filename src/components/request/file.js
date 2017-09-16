import React from 'react';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import {blue} from 'material-ui/colors';
import {CircularProgress} from 'material-ui/Progress';

const styles = theme => ({
    fileTileItem: {
        display: 'flex',
        width: 200,
        height: 90,
        margin: 10,
        border: '1px dashed #cccccc',
        borderRadius: '4px',
    },
    fileTileItemFold: {
        display: 'flex',
        width: 200,
        height: 80,
        margin: 10,
        border: '1px solid #cccccc',
        borderRadius: '4px',
    },
    fileTileIcon: {
        display: 'flex',
        flex: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fileTileIconSize: {
        marginLeft:10,
        fontSize: 38,
        color: '#666666'
    },
    fileTileIconSizeFold: {
        marginLeft:10,
        fontSize: 38,
        color: '#666666'
    },
    fileTileInfo: {
        flex: 70,
        marginLeft: 10,
    },
    fileTileName: {
        maxWidth: 126,
        height:24,
        lineHeight:'24px',
        textAlign: 'left',
        listStyleType: 'none',
        marginTop:14,
        alignItems: 'center',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
        cursor: 'pointer'
    },
    fileTileTip: {
        display: 'flex',
        listStyleType: 'none',
        marginTop: 10
    },
    tilePreview: {
        width: 38,
        height: 38,
        boxShadow: '4px 4px 3px #888888',
        cursor: 'pointer'
    }
});

class File extends React.Component{

    constructor(props){
        super(props)
        this.onClick = this.props.tileItemClick.bind(this)
        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter = (event,type) =>{
        event.currentTarget.style.background='#cccccc'
        event.currentTarget.style.border='1px '+(type==='fold'?'solid':'dashed')+' #777777'
    }

    onMouseLeave = (event,type) =>{
        event.currentTarget.style.background='white'
        event.currentTarget.style.border='1px '+(type==='fold'?'solid':'dashed')+' #cccccc'
    }

    imgLoadComplete = (event, n) => {
        n['_success' + n.id] = true
        this.setState({});
    };

    getFileTypeInfo = (classes, n) => {
        if (n.fileType === 'fold') {
            return <li className={classes.fileTileTip}><i
                className="iconfont icon-folder"/>:{n.foldCount}&nbsp;&nbsp;<i
                className="iconfont icon-filetexto"/>:{n.fileCount}</li>
        } else if (n.fileType === 'png' || n.fileType === 'gif' || n.fileType === 'jpg') {
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

    getFilePreview = (classes, n) => {
        if (n.fileType === 'fold') {
            return <i className={classes.fileTileIconSizeFold + " iconfont icon-fold"}/>
        } else if (n.fileType === 'png' || n.fileType === 'gif' || n.fileType === 'jpg') {
            return <span><img onClick={event => this.props.imgPreview(event,n.preview,n.fileName)} onLoad={event => this.imgLoadComplete(event, n)} title={n.fileName} alt={n.fileName}
                              className={classes.tilePreview} src={n.preview}/>
                {n['_success' + n.id] === undefined && <CircularProgress size={36} className={classes.progress}/>}
            </span>
        } else {
            return <i className={classes.fileTileIconSize + " iconfont icon-file"}/>
        }
    };

    render(){
        const {classes,n} = this.props;
        return (
            <div key={n.id}
                    onMouseEnter = {event => this.onMouseEnter(event,n.fileType)}
                    onMouseLeave = {event => this.onMouseLeave(event,n.fileType)}
                    className={n.fileType === 'fold' ? classes.fileTileItemFold : classes.fileTileItem}>
                <div className={classes.fileTileIcon}>
                    {this.getFilePreview(classes, n)}
                </div>
                <div className={classes.fileTileInfo}>
                    <li className={classes.fileTileName} onClick={event => {
                        this.props.tileItemClick(event, n)
                    }}><a title={n.fileName}>{n.fileName}</a></li>
                    {this.getFileTypeInfo(classes, n)}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(File)