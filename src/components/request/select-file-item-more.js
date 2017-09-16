import React from 'react';
import PropTypes from 'prop-types';
import List, {ListItem} from 'material-ui/List';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FileIcon from '../icons/FileIcon';
import grey from 'material-ui/colors/grey';
import Dialog, {DialogContent, DialogTitle,} from 'material-ui/Dialog';

const styles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
    svgIcon: {
        color: grey[800],
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});

class AlertDialog extends React.Component {
    state = {
        open: false,
        datas: this.props.datas,
    };

    handleRequestClose = () => {
        this.props.fileDeleteCallback(this.state.datas, true)
        this.setState({open: false});
    };

    handleRequestDelete = (event, id) => {
        this.state.datas.removeByKey('id', id)
        this.setState({})
    }

    clearAll = () =>{
        this.setState({
            datas:[]
        })
    }

    handleClick = (event) => {

    }

    getChip = (classes, n) => {
        if (n.fileType === 'png' || n.fileType === 'gif' || n.fileType === 'jpg') {
            return <Chip
                key={n.uuid}
                avatar={<Avatar src={n.preview}/>}
                label={n.fileName}
                onRequestDelete={event => this.handleRequestDelete(event, n.id)}
                className={classes.chip}
            />
        } else {
            return <Chip
                key={n.uuid}
                avatar={
                    <Avatar>
                        <FileIcon className={classes.svgIcon}/>
                    </Avatar>
                }
                label={n.fileName}
                onClick={this.handleClick}
                onRequestDelete={event => this.handleRequestDelete(event, n.id)}
                className={classes.chip}
            />
        }
    }

    render() {
        const classes = this.props.classes
        return (
            <div>
                <IconButton onClick={() => this.setState({open: true})}>
                    <i className={"iconfont icon-all1"}></i>
                </IconButton>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>
                        <List>
                            <ListItem onClick={this.clearAll} button divider>
                                清空全部
                            </ListItem>
                        </List>
                    </DialogTitle>
                    <DialogContent>
                        {
                            this.state.datas.map(n => {
                                return this.getChip(classes, n)
                            })
                        }
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

AlertDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    datas: PropTypes.array.isRequired,
    fileDeleteCallback: PropTypes.func.isRequired
};

export default withStyles(styles)(AlertDialog);