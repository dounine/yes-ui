import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import green from 'material-ui/colors/green';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
// import CheckIcon from 'material-ui-icons/Check';
// import SaveIcon from 'material-ui-icons/Save';

const styles = {
    wrapper: {
        position: 'relative',
    },
    successButton: {
        width:30,
        height:30,
        top:2,
        left:9,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    progress: {
        color: green[500],
        position: 'absolute',
        top: 6,
        left: 5,
    },
};

class CircularFab extends React.Component {
    state = {
        loading: false,
        success: false,
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

    timer = undefined;

    render() {
        const { loading, success } = this.state;
        const classes = this.props.classes;
        let buttonClass = '';

        if (success) {
            buttonClass = classes.successButton;
        }

        return (
            <div className={classes.wrapper}>
                <IconButton className={buttonClass} onClick={this.handleButtonClick}>
                    {success ? <i style={{color:'white'}} className={"iconfont icon-success"}></i> : <i className={"iconfont icon-upload"}></i>}
                </IconButton>
                {loading && <CircularProgress size={36} className={classes.progress} />}
            </div>
        );
    }
}

CircularFab.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularFab);