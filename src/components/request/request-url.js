import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

const styles = theme => ({
    container: {
        width:'100%'
    },
    formControl: {
        margin: theme.spacing.unit,
        width:'98%'
    }
});

class ComposedTextField extends React.Component {
    state = {
        name: 'Composed TextField',
    };

    handleChange = event => {
        this.setState({ name: event.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if(this.returnInputEl.value !== nextProps.value){
            this.returnInputEl.value = nextProps.value
        }
    }

    render() {
        const classes = this.props.classes;
        const onChange = this.props.onChange
        const urlValue = this.props.value
        const defaultTip = "可结合全局相对地扯使用"
        const returnInputEl = this.props.returnInputEl
        const tipMsg = this.props.tipMsg || defaultTip
        return (
            <div className={classes.container}>

                <FormControl className={classes.formControl}>
                    {
                        tipMsg!==defaultTip?<Input
                            error
                            placeholder="request url"
                            defaultValue={urlValue}
                            inputRef={el => {this.returnInputEl = el;returnInputEl(this.returnInputEl)}}
                            onChange={event=>onChange(event)}
                            inputProps={{
                                'aria-label': 'url',
                            }}
                        />:
                            <Input
                                placeholder="request url"
                                defaultValue={urlValue}
                                inputRef={el => {this.returnInputEl = el;returnInputEl(this.returnInputEl)}}
                                onChange={event=>onChange(event)}
                                inputProps={{
                                    'aria-label': 'url',
                                }}
                            />
                    }

                    <FormHelperText>{tipMsg}</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

ComposedTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);