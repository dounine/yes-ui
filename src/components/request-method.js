import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

const options = [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT',
    'OPTIONS',
];

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
        return (
            <div>
                <IconButton
                    aria-label="More"
                    aria-owns={this.state.open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    GET
                </IconButton>
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

export default LongMenu;