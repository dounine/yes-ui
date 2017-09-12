import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import deepPurple from 'material-ui/colors/deepPurple';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    }
})

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
    state = {
        anchorEl: undefined,
        open: false,
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    state = {
        type: 1,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    componentDidMount = () =>{
        this.handleChange('type',{target:{value:'GET'}})
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">method</InputLabel>
                    <Select
                        value={this.state.type}
                        onChange={this.handleChange('type')}
                        input={<Input id="age-simple" />}
                    >
                        <MenuItem value={1}>&nbsp;GET</MenuItem>
                        <MenuItem value={2}>&nbsp;POST</MenuItem>
                        <MenuItem value={3}>&nbsp;DELETE</MenuItem>
                        <MenuItem value={4}>&nbsp;PATCH</MenuItem>
                        <MenuItem value={5}>&nbsp;PUT</MenuItem>
                        <MenuItem value={6}>&nbsp;OPTIONS</MenuItem>
                    </Select>
                </FormControl>
            </div>
        );
    }
}

export default withStyles(styles)(LongMenu);