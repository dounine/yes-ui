import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import deepPurple from 'material-ui/colors/deepPurple';
import Avatar from 'material-ui/Avatar';
import Menu, { MenuItem } from 'material-ui/Menu';

const options = [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT',
    'OPTIONS',
];

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

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props
        return (
            <div>
                <Button
                    fab
                    aria-label="More"
                    aria-owns={this.state.open ? 'long-menu' : null}
                    aria-haspopup="true"
                    className={classes.orangeAvatar}
                    onClick={this.handleClick}
                >
                    Get
                </Button>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                    MenuListProps={{
                        style: {
                            width: 100,
                        },
                    }}
                >
                    {options.map(option => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleRequestClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(LongMenu);