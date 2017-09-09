import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import TextField from 'material-ui/TextField';

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
    body: {
        display: 'flex',
        outline: '1px solid #ccc',
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
    }
});

class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        multiline: 'Controlled',
        value: 'nihao'
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

    render() {
        const classes = this.props.classes;

        return (
            <div>
                <div>
                    
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