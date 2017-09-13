import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withStyles} from 'material-ui/styles';

const suggestions = [
    {label: '你好呀'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
];


function renderInput(inputProps) {
    const {classes, home, value, ref, ...other} = inputProps;

    return (
        <TextField
            autoFocus={home}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight
                        ? <span key={index} style={{fontWeight: 300}}>
                {part.text}
              </span>
                        : <strong key={index} style={{fontWeight: 500}}>
                            {part.text}
                        </strong>;
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const {containerProps, children} = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

function getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        width: 200,
        position: 'relative',
        display: 'flex',
        zIndex:2
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        width: 200,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
        width: 200,
    },
    suggestionsList: {
        width: 200,
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: 200,
    }
});

class IntegrationAutosuggest extends Component {
    state = {
        value: '',
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({value}) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, {newValue}) => {
        this.setState({
            value: newValue,
        });
    };

    componentWillMount = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        if(arr[5]){
            this.setState({
                value:arr[5]
            })
        }
    };

    componentDidMount = () => {
        let pathname = this.props.history.location.pathname;
        let $self = this
        document.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                var arr = pathname.split('/');
                if(arr[5]){
                    arr[5] = $self.state.value
                }else{
                    arr.push($self.state.value)
                }
                if(pathname!==arr.join('/')){
                    $self.props.history.push(arr.join('/'))
                }
            }
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    autoFocus: false,
                    classes,
                    placeholder: 'Search key',
                    value: this.state.value,
                    onChange: this.handleChange,
                }}
            />
        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};
const ShowTheLocationWithRouter = withRouter(IntegrationAutosuggest)
export default withStyles(styles)(ShowTheLocationWithRouter);
