import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from '../icons/CloseIcon';
import Slide from 'material-ui/transitions/Slide';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    previewBox:{
        textAlign:'center',
    }
};

class FullScreenDialog extends React.Component {

    handleRequestClose = () => {
        this.props.imgPreviewRequestClose()
    };


    render() {
        const {classes,preview,previewSrc,alt} = this.props;
        return (
            <Dialog
                fullScreen
                open={preview}
                onRequestClose={this.handleRequestClose}
                transition={<Slide direction="up"/>}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            图片预览
                        </Typography>
                        <Button fab color="primary" onClick={this.handleRequestClose} aria-label="Close">
                            <CloseIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <div className={classes.previewBox}>
                    <img src={previewSrc} alt={alt} title={alt}/>
                </div>
            </Dialog>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);