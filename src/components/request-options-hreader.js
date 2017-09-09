import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input/Input';
import {withStyles} from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';

let counter = 0;

function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return {id: counter, name, calories, fat, carbs, protein};
}

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: '名称'},
    {id: 'calories', numeric: true, disablePadding: false, label: '值'},
    {id: 'fat', numeric: true, disablePadding: false, label: '描述'},
    {id: 'operation', numeric: true, disablePadding: false, label: ''},
];

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {onSelectAllClick, order, orderBy, numSelected} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < 5}
                            checked={numSelected === 5}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                numeric={column.numeric}
                                disablePadding={column.disablePadding}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.label}
                                </TableSortLabel>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

const toolbarStyles = theme => ({
    root: {
        paddingRight: 2,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.A700,
                backgroundColor: theme.palette.secondary.A100,
            }
            : {
                color: theme.palette.secondary.A100,
                backgroundColor: theme.palette.secondary.A700,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});

let EnhancedTableToolbar = props => {
    const {numSelected, classes} = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography type="subheading">{numSelected} selected</Typography>
                ) : (
                    <Typography type="title">请求头</Typography>
                )}
            </div>
            <div className={classes.spacer}/>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <IconButton aria-label="Delete">
                        {/*<DeleteIcon />*/}
                    </IconButton>
                ) : (
                    <IconButton aria-label="Filter list">
                        {/*<FilterListIcon />*/}
                    </IconButton>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
    },
    text: {},
    input: {
        // display:'none'
    }
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
            createData('Frozen yoghurt', 159, 4.0),
            createData('Ice cream sandwich', 237, 4.3),
            createData('Eclair', 262, 6.0),
            createData('Cupcake', 305, 4.3),
            createData('Gingerbread', 356, 3.9),
        ],
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data = this.state.data.sort(
            (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
        );

        this.setState({data, order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    cellClick = (event, id) => {

        var obj = {}
        obj['display' + id] = 'show'
        this.setState(obj)
        // const input = this.inputRef.refs.input;
        var input = document.getElementById('id' + id)
        console.log(input.value)
        // input = input.child(0)
        // console.log(this.state.textInput);
        setTimeout(function () {
            var _value = input.value
            input.value = ""
            input.focus();
            input.value = _value
        });
    };

    cellBlur = (event, id) => {
        var obj = {}
        obj['display' + id] = 'hide'
        this.setState(obj)
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    testt = () => {
        console.log(this.refs.lake)
    }

    render() {
        const classes = this.props.classes;
        const {data, order, orderBy, selected} = this.state;

        return (
            <Paper className={classes.paper}>
                {/*<EnhancedTableToolbar numSelected={selected.length} />*/}
                <Table>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {data.map(n => {
                            const isSelected = this.isSelected(n.id);
                            const $self = this;
                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex="-1"
                                    key={n.id}
                                    selected={isSelected}
                                >
                                    <TableCell checkbox>
                                        <Checkbox onKeyDown={event => this.handleKeyDown(event, n.id)}
                                                  onClick={event => this.handleClick(event, n.id)}
                                                  checked={isSelected}/>
                                    </TableCell>
                                    <TableCell disablePadding>
                                        <span
                                            style={{display: (($self.state['display' + n.id] != 'show') ? 'block' : 'none')}}

                                            className={classes.text}
                                            onClick={event => this.cellClick(event, n.id)}
                                        >{n.name}</span>
                                        <Input
                                            autoFocus="true"
                                            id={'id' + n.id}
                                            style={{display: (($self.state['display' + n.id] != 'show') ? 'none' : 'block')}}
                                            onBlur={event => this.cellBlur(event, n.id)}
                                            // ref={(input) => { this.state['textInput'+n.id] = input; }}
                                            defaultValue={n.name}
                                            className={classes.input}
                                            inputProps={{
                                                'aria-label': n.id,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell numeric>{n.calories}</TableCell>
                                    <TableCell numeric>{n.fat}</TableCell>
                                    <TableCell numeric>
                                        <IconButton>
                                            <i className={"iconfont icon-close"}></i>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);