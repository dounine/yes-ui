import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
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

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.container}>

                <FormControl className={classes.formControl}>
                    <Input
                        placeholder="request url"
                        inputProps={{
                            'aria-label': 'Description',
                        }}
                    />
                    <FormHelperText>可结合全局相对地扯使用</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

ComposedTextField.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);