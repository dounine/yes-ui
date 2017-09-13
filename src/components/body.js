import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import deepPurple from 'material-ui/colors/deepPurple';
import IconButton from 'material-ui/IconButton';
import {MenuItem} from 'material-ui/Menu';
import {FormControlLabel} from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import SearchIcon from './icons/SearchIcon';
import Select from 'material-ui/Select';
import Input, {InputLabel} from 'material-ui/Input';
import CopyIcon from "./icons/CopyIcon";

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
    operator: {
        border: '1px solid #ccc',
        borderBottom: '0px solid #ccc',
        // padding:10,
        display: 'flex'
    },
    format: {
        // display:'inline-flex',
        // padding:'0 10px',
        // border: '1px solid #ccc',
        // borderBottom:'0px solid #ccc',
        // background:'#f0f0f0'
        display: 'flex',
        flex: 1
    },
    formatOutline: {
        display: 'inline-flex',
        padding: '0 10px',
        // outline: '1px solid #ccc',
    },
    format_left: {
        height: 48,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: 400,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: '50px',
    },
    format_right: {
        marginLeft: 0,
        marginRight: 0
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
    searchCopy: {
        display: 'flex',
    }
});

class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        methodType: 1,
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
        if (typeof json !== 'string') {
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
        if (typeof json !== 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

        var body = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
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
        this.setState({methodType: event.currentTarget.value});
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
                                        onChange={(event, checked) => this.setState({checkedA: checked})}
                                    />
                                }
                                label="预览"
                            />
                        </div>

                        <div style={{marginTop:'6px',marginLeft:'6px'}}>
                            <InputLabel htmlFor="age-simple"></InputLabel>
                            <Select
                                value={this.state.methodType}
                                onChange={this.typeHandleClick}
                                input={<Input id="age-simple"/>}
                            >
                                <MenuItem value={1}>JSON</MenuItem>
                                <MenuItem value={2}>TEXT</MenuItem>
                                <MenuItem value={3}>XML</MenuItem>
                                <MenuItem value={4}>HTML</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.searchCopy}>
                        <IconButton>
                            <CopyIcon/>
                        </IconButton>
                        <IconButton>
                            <SearchIcon/>
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