import React from 'react';
import ReactDOM from 'react-dom';
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

function createData(name, value, des) {
    counter += 1;
    var _name = name
    var _value = value
    var _des = des
    return {id: counter, name, value, des, _name, _value, _des};
}

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: '名称'},
    {id: 'calories', numeric: false, disablePadding: false, label: '值'},
    {id: 'fat', numeric: false, disablePadding: false, label: '描述'},
    {id: 'operation', numeric: false, disablePadding: false, label: ''},
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
        if (property !== 'operation') {
            this.props.onRequestSort(event, property);
        }
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
                                    {column.label == '' ? <div>
                                        <IconButton><i className={"iconfont icon-dantizhongzhi"}/> </IconButton>
                                        <IconButton><i className={"iconfont icon-clear"}/> </IconButton>
                                    </div> : column.label}
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

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
    },
    text: {
        // padding: '0 24px'
    },
    textDirty: {
        // padding: '0 24px',
        color: 'blue'
    },
    input: {
        // display:'none'
    }
});

class EnhancedTable extends React.Component {

    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        inputRefsname: {},
        inputRefsvalue: {},
        inputRefsdes: {},
        data: [
            createData('FrozenYoghurt', 'value', 'des'),
            createData('Username', 'value', 'des'),
            createData('Eclair', 'value', 'des'),
            createData('Cupcake', 'value', 'des'),
            createData('Gingerbread', 'value', 'des'),
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

    cellClick = (event, id, name) => {
        var obj = {}
        obj[name + '-display' + id] = 'show'
        this.setState(obj)
        var input = this.state['inputRefs' + name][id]
        setTimeout(function () {
            var _value = input.value
            input.value = ""
            input.focus();
            input.value = _value
        });
    };

    cellBlur = (event, id, name) => {
        var obj = {}
        obj[name + '-display' + id] = 'hide'
        var datas = this.state.data
        for (var i = 0, len = datas.length; i < len; i++) {
            var d = datas[i]
            if (d.id === id && d[name] !== event.target.value) {
                d[name] = event.target.value
                if (d['_' + name] != d[name]) {
                    d[name + 'Dirty'] = 'yes'
                } else {
                    d[name + 'Dirty'] = null
                }
                break
            }
        }
        // obj.data = datas
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

    dataOperator = (event, id, type) => {
        var datas = this.state.data
        if (type === 'reset') {
            for (var i = 0, len = datas.length; i < len; i++) {
                var d = datas[i]
                if (d.id === id) {
                    d.nameDirty = null
                    d.valueDirty = null
                    d.desDirty = null
                    d.name = d['_name']
                    d.value = d['_value']
                    d.des = d['_des']
                    break
                }
            }
        } else if (type === 'clear') {
            for (var i = 0, len = datas.length; i < len; i++) {
                var d = datas[i]
                if (d && d.id === id) {
                    datas.splice(i, 1)
                    break
                }
            }
        }
        this.setState({})
    };

    cellHover = () => {
        console.log('aa')
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

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
                                    <TableCell onClick={event => this.cellClick(event, n.id, 'name')} disablePadding>
                                        <span
                                            style={{display: (($self.state['name-display' + n.id] != 'show') ? 'block' : 'none')}}
                                            className={n.nameDirty === 'yes' ? classes.textDirty : classes.text}
                                        >{n.name}</span>
                                        <Input
                                            style={{display: (($self.state['name-display' + n.id] != 'show') ? 'none' : 'block')}}
                                            onBlur={event => this.cellBlur(event, n.id, 'name')}
                                            inputRef={input => this.state['inputRefs' + 'name'][n.id] = input}
                                            defaultValue={n.name}
                                            className={classes.input}
                                        />
                                    </TableCell>
                                    <TableCell onClick={event => this.cellClick(event, n.id, 'value')} disablePadding>
                                        <span
                                            style={{display: (($self.state['value-display' + n.id] != 'show') ? 'block' : 'none')}}
                                            className={n.valueDirty === 'yes' ? classes.textDirty : classes.text}
                                        >{n.value}</span>
                                        <Input
                                            style={{display: (($self.state['value-display' + n.id] != 'show') ? 'none' : 'block')}}
                                            onBlur={event => this.cellBlur(event, n.id, 'value')}
                                            inputRef={input => this.state['inputRefs' + 'value'][n.id] = input}
                                            defaultValue={n.value}
                                            className={classes.input}
                                        />
                                    </TableCell>
                                    <TableCell onClick={event => this.cellClick(event, n.id, 'des')} disablePadding>
                                        <span
                                            style={{display: (($self.state['des-display' + n.id] != 'show') ? 'block' : 'none')}}
                                            className={n.desDirty === 'yes' ? classes.textDirty : classes.text}
                                        >{n.des}</span>
                                        <Input
                                            style={{display: (($self.state['des-display' + n.id] != 'show') ? 'none' : 'block')}}
                                            onBlur={event => this.cellBlur(event, n.id, 'des')}
                                            inputRef={input => this.state['inputRefs' + 'des'][n.id] = input}
                                            defaultValue={n.des}
                                            className={classes.input}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <IconButton
                                                style={{visibility: ((n.nameDirty == 'yes' || n.valueDirty == 'yes' || n.desDirty == 'yes') ? 'visible' : 'hidden')}}
                                                onClick={event => this.dataOperator(event, n.id, 'reset')}>
                                                <i className={"iconfont icon-dantizhongzhi"}></i>
                                            </IconButton>
                                            <IconButton onClick={event => this.dataOperator(event, n.id, 'clear')}>
                                                <i className={"iconfont icon-clear"}></i>
                                            </IconButton>
                                        </div>
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