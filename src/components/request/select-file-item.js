import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import FileIcon from '../icons/FileIcon';
import grey from 'material-ui/colors/grey';

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
    imgPreview:{
        cursor:'pointer'
    }
});
const selectFilesMoreCount = 2

class Chips extends React.Component {


    state = {
        selected: [],
    }

    componentWillMount = () => {
        this.sliceFiles(this.props.selected)
    }

    sliceFiles = (datas) =>{
        if (datas.length >= selectFilesMoreCount) {
            let newArr = datas
            this.setState({
                selected:newArr.slice(0,selectFilesMoreCount)
            })
        }else{
            this.setState({
                selected:datas
            })
        }
    }

    componentWillReceiveProps = (props) =>{
        this.sliceFiles(props.selected)
    }

    handleRequestDelete = (event, id) => {
        this.props.fileDeleteCallback(id)
    }

    imgHandleClick = (event,n) =>{
        this.props.imgPreview(event, n.preview, n.fileName)
    }

    getChip = (classes, n) => {
        if (n.fileType === 'png' || n.fileType === 'gif' || n.fileType === 'jpg') {
            return <Chip
                key={n.uuid}
                avatar={<Avatar className={classes.imgPreview} onClick={event => this.imgHandleClick(event,n)} src={n.preview}/>}
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
                onRequestDelete={event => this.handleRequestDelete(event, n.id)}
                className={classes.chip}
            />
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.row}>
                {this.state.selected.map(n => {
                    return this.getChip(classes, n)
                })}
            </div>
        );
    }

}

Chips.propTypes = {
    classes: PropTypes.object.isRequired,
    selected: PropTypes.array.isRequired,
    fileDeleteCallback:PropTypes.func.isRequired
};

export default withStyles(styles)(Chips);