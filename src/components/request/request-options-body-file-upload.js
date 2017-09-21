import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {CircularProgress} from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import axios from 'axios';
import IconButton from 'material-ui/IconButton';

const styles = {
    wrapper: {
        position: 'relative',
    },
    successButton: {
        width: 30,
        height: 30,
        top: 2,
        left: 9,
        marginRight: 18,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: 2,
        left: 1,
    },
    iconSize: {
        fontSize: 24
    }
};

class CircularFab extends React.Component {
    state = {
        loading: false,
        success: false,
        uploadError: false,
        uploadDisabled:this.props.uploadDisabled
    };
    fileEl = this.props.fileEl

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleButtonClick = () => {
        if (!this.state.loading) {
            var fd = new FormData();
            var files = this.props.fileEl.files;
            for (var i = 0; i < files.length; i++) {
                var f = files[i];
                fd.append('files', f);
            }
            this.setState({
                success: false,
                loading: true,
                uploadError: false,
                progress:0
            });
            var $self = this
            axios.post('http://localhost:8081/result/file',fd ,{
                headers: {'Content-Type': fd.type},
                onUploadProgress:function (progressEvent) {
                    let value = parseInt((progressEvent.loaded / progressEvent.total) * 100)
                    $self.setState({
                        progress: value
                    })
                }
            }).then(function (response) {
                if(response.data.code===0){
                    $self.setState({
                        loading: false,
                        success: true,
                        uploadError: false
                    });
                }else{
                    $self.setState({
                        loading: false,
                        success: false,
                        uploadError: true
                    });
                }

            }).catch(function (error) {
                $self.setState({
                    loading: false,
                    success: false,
                    uploadError: true
                });
            })
        }
    };

    componentWillReceiveProps = (props) =>{
        if(!props.uploadDisabled){
            this.setState({
                uploadDisabled:false
            })
        }
    }

    render() {
        const {loading, success} = this.state;
        const classes = this.props.classes;
        let buttonClass = '';

        if (success) {
            buttonClass = classes.successButton;
        }

        return (
            <div className={classes.wrapper}>
                <IconButton disabled={this.state.uploadDisabled} className={buttonClass} onClick={this.handleButtonClick}>
                    {success ?
                        <i style={{color: 'white'}} className={classes.iconSize + " iconfont icon-success"}></i> :
                        (this.state.uploadError ? <i className={classes.iconSize + " iconfont icon-error"}></i> :
                            <i className={classes.iconSize + " iconfont icon-upload"}></i>)}
                </IconButton>
                {loading && <CircularProgress min={0} max={100} value={this.state.progress} size={46} className={classes.progress}/>}
            </div>
        );
    }
}

CircularFab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularFab);