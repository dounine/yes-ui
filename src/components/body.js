import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import deepOrange from 'material-ui/colors/deepOrange';
import deepPurple from 'material-ui/colors/deepPurple';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Menu,{ MenuItem } from 'material-ui/Menu';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
        height: 500
    },
    operator:{
        border: '1px solid #ccc',
        borderBottom:'0px solid #ccc',
        // padding:10,
        display:'flex'
    },
    format:{
        // display:'inline-flex',
        // padding:'0 10px',
        // border: '1px solid #ccc',
        // borderBottom:'0px solid #ccc',
        // background:'#f0f0f0'
        display:'flex',
        flex:1
    },
    formatOutline:{
        display:'inline-flex',
        padding:'0 10px',
        // outline: '1px solid #ccc',
    },
    format_left:{
        height:48,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight:400,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight:'50px',
    },
    format_right:{
        marginLeft:0,
        marginRight:0
    },
    body: {
        display: 'flex',
        outline: '1px solid #ccc',
        fontWeight: 400,
        fontSize: 16,
    },
    pre: {
        padding: 5,
        margin: 5,
        flex: 1
    },
    showLines: {
        padding: 5,
        margin: 5,
        background: '#cccccc'
    },
    string: {
        color: 'green',
    },
    number: {
        color: 'darkorange'
    },
    boolean: {
        color: 'blue'
    },
    null: {
        color: 'magenta'
    },
    key: {
        color: 'red',
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    searchCopy:{
        display:'flex',
        // flex:1
    }
});

const options = [
    'JSON',
    'Text',
    'XML',
    'Auto',
    'HTML'
];
const ITEM_HEIGHT = 48;

class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        multiline: 'Controlled',
        value: 'nihao',
        anchorEl: undefined,
        open: false,
    };

    handleChangeMultiline = event => {
        this.setState({
            multiline: event.target.value,
        });
    };

    componentWillMount = () => {
        this.setState({
            value: {
                name: 'nihao',
                value: {
                    age: 100
                }
            }
        });
    }

    syntaxHighlightLines = cc => {
        var json = this.state.value
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        var objs = []
        for (var i = 1, len = json.split('\n').length; i <= len; i++) {
            objs.push('<span>' + i + '</span>');
        }
        return {__html: objs.join('\n')}
    }

    syntaxHighlight = cc => {
        var json = this.state.value
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

        var body = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = cc.number;
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = cc.key;
                } else {
                    cls = cc.string;
                }
            } else if (/true|false/.test(match)) {
                cls = cc.boolean;
            } else if (/null/.test(match)) {
                cls = cc.null;
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
        return {__html: body}
    };

    typeHandleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };
    typeHandleRequestClose = event => {
        this.setState({ open: false });
    };

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <div className={classes.operator}>
                    <div className={classes.format}>
                        <div className={classes.formatOutline}>
                            <div className={classes.format_left}>格式化</div>
                            <FormControlLabel
                                className={classes.format_right}
                                control={
                                    <Switch
                                        checked={this.state.checkedA}
                                        onChange={(event, checked) => this.setState({ checkedA: checked })}
                                    />
                                }
                                label="预览"
                            />
                        </div>

                        <div>
                            <Button
                                dense
                                aria-owns={this.state.open ? 'long-menu' : null}
                                aria-haspopup="true"
                                className={classes.orangeAvatar}
                                onClick={this.typeHandleClick}
                            >
                                JSON
                            </Button>
                            <Menu
                                id="long-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onRequestClose={this.typeHandleRequestClose}
                                style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                                MenuListProps={{
                                    style: {
                                        width: 70,
                                    },
                                }}
                            >
                                {options.map(option => (
                                    <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.typeHandleRequestClose}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>
                    <div className={classes.searchCopy}>
                        <IconButton>
                            <i className={"iconfont icon-copy"}></i>
                        </IconButton>
                        <IconButton>
                            <i className={"iconfont icon-search"}></i>
                        </IconButton>
                    </div>
                </div>
                <div className={classes.body}>
                    <pre className={classes.showLines} dangerouslySetInnerHTML={this.syntaxHighlightLines(classes)}/>
                    <pre className={classes.pre} dangerouslySetInnerHTML={this.syntaxHighlight(classes)}/>
                </div>
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);