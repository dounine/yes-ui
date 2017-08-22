import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Icon from 'material-ui/Icon';

const options = [
    '全部',
    '20',
    '50',
    '100',
];
const styles = {
    iconSize:{
        fontSize:30,
    }
}

const ITEM_HEIGHT = 48;

class LongMenu extends Component {
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
                    <i style={styles.iconSize} className="iconfont icon-resize-vertical" ></i>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                    MenuListProps={{
                        style: {
                            width: 70
                        },
                    }}
                >
                    {options.map(option =>
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleRequestClose}>
                            {option}
                        </MenuItem>,
                    )}
                </Menu>
            </div>
        );
    }
}

export default LongMenu;