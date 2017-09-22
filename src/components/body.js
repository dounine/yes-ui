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
    operator: {
        border: '1px solid #ccc',
        borderBottom: '0px solid #ccc',
        // padding:10,
        display: 'flex'
    },
    format: {
        display: 'flex',
        flex: 1
    },
    formatOutline: {
        display: 'inline-flex',
        padding: '0 10px',
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
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    searchCopy: {
        display: 'flex',
    }
});
const methodTypes = [
    "json","text","xml","html"
]
class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        methodType: 0,
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

    componentDidMount = () =>{
        var editor_json = window.CodeMirror(document.getElementById('responseBodyDiv'), {
            lineNumbers: true,
            value:JSON.stringify(this.state.value, undefined, 2),
            mode: "application/json",
            readOnly:true,
            gutters: ["CodeMirror-lint-markers"],
            lint: true
        });
    }

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

    typeHandleClick = event => {
        document.getElementById('responseBodyDiv').innerHTML= ''
        window.CodeMirror(document.getElementById('responseBodyDiv'), {
            lineNumbers: true,
            value:JSON.stringify(this.state.value, undefined, 2),
            mode: "application/"+methodTypes[event.currentTarget.value|0],
            readOnly:true,
            gutters: ["CodeMirror-lint-markers"],
            lint: true
        });
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
                                <MenuItem value={0}>&nbsp;json</MenuItem>
                                <MenuItem value={1}>&nbsp;text</MenuItem>
                                <MenuItem value={2}>&nbsp;xml</MenuItem>
                                <MenuItem value={3}>&nbsp;html</MenuItem>
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
                    <div id="responseBodyDiv"></div>
                </div>
            </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);