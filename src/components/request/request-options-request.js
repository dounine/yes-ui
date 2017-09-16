import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import {ResetIcon, InitIcon, ClearIcon} from '../icons/Icons';

let counterNew = 0;
let counterOld = 0;

function createData(name, value, des, isOld) {
    var m = -1
    if (isOld) {
        m = counterOld += 1;
    } else {
        m = counterNew += 1;
    }
    var _name = name
    var _value = value
    var _des = des
    var _type = 1
    var _type_value = 'text'
    return {id: m, name, value, des, _name, _type, _type_value, _value, _des};
}

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: '名称'},
    {id: 'value', numeric: false, disablePadding: false, label: '值'},
    {id: 'des', numeric: false, disablePadding: false, label: '描述'},
    {id: 'operation', numeric: false, disablePadding: false, label: ''},
];

class EnhancedTableHead extends React.Component {
    static propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onRestAll: PropTypes.func.isRequired,
        onClearAll: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
        dataSize: PropTypes.func.isRequired,
    };

    createRestAll = () => {
        this.props.onRestAll();
    };

    createClearAll = () => {
        this.props.onClearAll();
    }

    onInitAll = () => {
        this.props.onInitAll();
    }

    createSortHandler = property => event => {
        if (property !== 'operation') {
            this.props.onRequestSort(event, property);
        }
    };

    render() {
        const {classes, dataIsDirty, onRestAll, onInitAll, onClearAll, onSelectAllClick, order, orderBy, numSelected, dataSize} = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell checkbox>
                        <Checkbox
                            className={classes.checkbox}
                            indeterminate={numSelected > 0 && numSelected < dataSize()}
                            checked={numSelected === dataSize()}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={'request-tablecell-key' + column.id}
                                numeric={column.numeric}
                                style={{paddingLeft: 0}}
                                disablePadding={column.disablePadding}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.id === 'operation' ? <div>
                                        <span style={{visibility: dataIsDirty() ? 'visible' : 'hidden'}}>
                                            <IconButton onClick={onInitAll}>
                                                <InitIcon/>
                                            </IconButton>
                                        </span>
                                        <IconButton onClick={onRestAll}>
                                            <ResetIcon/>
                                        </IconButton>
                                        <IconButton onClick={onClearAll}>
                                            <ClearIcon/>
                                        </IconButton>
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

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: 0,
        overflowX: 'auto',
    },
    checkbox: {
        color: theme.headerOptions.grey.checkbox
    },
    text: {
        width: '100%',
        display: 'inline-flex'
    },
    textDirty: {
        width: '100%',
        display: 'inline-flex',
        color: 'blue'
    },
    input: {
        width: '100%',
        fontSize: 16,
    },
    inputDirty: {
        width: '100%',
        fontSize: 16,
        backgroundColor: '#bff2ff'
    }
});

class EnhancedTable extends React.Component {

    state = {
        type: 1,
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
            createData('', '', '', true),
        ],
    };

    inputElName = 'requestInputRefs';

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

    componentWillMount = () => {
        this.handleSelectAllClick(null, true)
    }

    cellBlur = (event, id, name) => {
        var datas = this.state.data
        for (var i = 0, len = datas.length; i < len; i++) {
            var d = datas[i]
            if (d.id === id && d['_' + name] !== event.target.value) {
                d[name] = event.target.value
                if (d['_' + name] !== d[name]) {
                    d[name + 'Dirty'] = 'yes'
                } else {
                    d[name + 'Dirty'] = null
                }
                break
            }
        }
        this.setState({})
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
        let datas = this.state.data
        if (type === 'reset') {
            for (var i = 0, le = datas.length; i < le; i++) {
                let d = datas[i]
                if (d && d.id === id) {
                    d.nameDirty = null
                    d.valueDirty = null
                    d.desDirty = null
                    this.getInputEl('Name', id).value = d['_name']
                    this.getInputEl('Value', id).value = d['_value']
                    this.getInputEl('Des', id).value = d['_des']
                    d.name = d['_name']
                    d.value = d['_value']
                    d.des = d['_des']
                    break
                }
            }
            this.props.childQueryChange(datas)
        } else if (type === 'clear') {
            for (var index = 0, len = datas.length; index < len; index++) {
                let d = datas[index]
                if (d && d.id === id) {
                    datas.splice(index, 1)
                    this.state.selected.removeByValue(d.id)
                    break
                }
            }
            this.props.childQueryChange(datas)
        } else if (type === 'init') {
            for (var index1 = 0, len1 = datas.length; index1 < len1; index1++) {
                let d = datas[index1]
                if (d && d.id === id) {
                    if (d['_name'] !== d.name) {
                        d.nameDirty = null
                        d['_name'] = d.name
                    }
                    if (d['_value'] !== d.value) {
                        d.valueDirty = null
                        d['_value'] = d.value
                    }
                    if (d['_des'] !== d.des) {
                        d.desDirty = null
                        d['_des'] = d.des
                    }
                    break
                }
            }
        }
        this.setState({})
    };

    onInitAll = () => {
        var datas = this.state.data
        var oldData = this.state.oldData
        for (var index2 = 0, len2 = datas.length; index2 < len2; index2++) {
            var d = datas[index2]
            var old = oldData[index2]
            if (d['_name'] !== d.name) {
                d.nameDirty = null
                d['_name'] = d.name
                old.name = d.name
                old._name = d.name
            }
            if (d['_value'] !== d.value) {
                d.valueDirty = null
                d['_value'] = d.value
                old.value = d.value
                old._value = d.value
            }
            if (d['_des'] !== d.des) {
                d.desDirty = null
                d['_des'] = d.des
                old.des = d.des
                old._des = d.des
            }
        }
        this.props.childQueryChange(datas, true)
        this.setState({})
    };

    onClearAll = () => {
        var $self = this
        counterOld = 0//特殊原因必需清0
        let obj = createData('', '', '', true)
        $self.props.childQueryChange([])
        if($self.getInputEl('Name', obj.id).value!==''){
            this.setState({
                data: [],
                selected: []
            })
            setTimeout(function () {
                $self.setState({
                    data: [obj],
                    selected: [obj.id]
                })
                $self.getInputEl('Name', obj.id).focus()
            })
        }else{
            $self.setState({
                data: [obj],
                selected: [obj.id]
            })
            $self.getInputEl('Name', obj.id).focus()
        }

    };

    onResetAll = () => {
        var datas = this.state.oldData
        for (let i = 0, len = datas.length; i < len; i++) {
            let d = datas[i]
            if (d) {
                d.nameDirty = null
                d.valueDirty = null
                d.desDirty = null
                if (this.getInputEl('Name', d.id)) {
                    this.getInputEl('Name', d.id).value = d['_name']
                }
                if (this.getInputEl('Value', d.id)) {
                    this.getInputEl('Value', d.id).value = d['_value']
                }
                if (this.getInputEl('Des', d.id)) {
                    this.getInputEl('Des', d.id).value = d['_des']
                }
            }
        }
        counterNew = 0
        counterOld = 0
        for (let o of datas) {
            if (this.state.selected.indexOf(o.id) === -1) {
                this.state.selected.push(o.id)
            }
        }
        this.props.childQueryChange(datas)
        this.setState({
            data: datas
        })

    };

    inputOnChange = (event, type, id) => {
        var datas = this.state.data
        var lastIndex = datas.length - 1
        if (id === datas[lastIndex].id) {
            if (event.target.value.trim().length !== 0) {
                let obj = createData('', '', '', true)
                datas.push(obj)
                this.handleClick(null, obj.id)
            }
        }
        let ds = []
        for (let d of this.state.data) {
            if (id === d.id) {
                let obj = d
                if (type === 'Name') {
                    obj.name = event.target.value
                    obj.value = this.getInputEl('Value', d.id).value
                    obj.des = this.getInputEl('Des', d.id).value
                } else if (type === 'Value') {
                    obj.name = this.getInputEl('Name', d.id).value
                    obj.value = event.target.value
                    obj.des = this.getInputEl('Des', d.id).value
                } else if (type === 'Des') {
                    obj.name = this.getInputEl('Name', d.id).value
                    obj.value = this.getInputEl('Value', d.id).value
                    obj.des = this.getInputEl('Des', d.id).value
                }
                ds.push(obj)
            } else {
                ds.push(d)
            }
        }
        this.props.childQueryChange(ds)
        this.setState({
            data: ds
        })
    };

    dataSize = () => {
        return this.state.data.length
    }

    getInputEl = (name, id) => {
        return this[this.inputElName + name + id]
    }

    componentWillMount = () => {
        if (this.props.params.length > 0) {
            var ds = []
            var selected = []
            counterOld = 0
            for (let o of this.props.params) {
                var obj = createData(o.name, o.value, '', true)
                ds.push(
                    obj
                )
                selected.push(obj.id)
            }
            this.setState({
                data: ds,
                oldData: ds,
                selected: selected
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        let ds = []
        let selected = []
        let oldData = this.state.oldData
        if (nextProps.params) {
            counterNew = 0
            for (let o of nextProps.params) {
                let obj = createData(o.name, o.value, '', false)
                ds.push(
                    obj
                )
                selected.push(obj.id)
            }
            if (ds.length === 0) {
                let obj = createData('', '', '', false)
                ds.push(obj)
                selected.push(obj.id)
                var $self = this
                $self.setState({
                    data: [],
                    selected: []
                })
                setTimeout(function () {
                    $self.setState({
                        data: ds,
                        selected: selected
                    })
                    $self.getInputEl('Name',obj.id).focus()
                })
            } else {
                for (let o of oldData) {
                    for (let d of ds) {
                        if (d.id === o.id) {
                            if (d.name !== o['_name']) {
                                if (this.getInputEl('Name', d.id)) {
                                    this.getInputEl('Name', d.id).value = d.name
                                }
                                d.nameDirty = 'yes'
                                d._name = o.name
                            } else {
                                d.nameDirty = null
                            }
                            if (d.value !== o['_value']) {
                                if (this.getInputEl('Value', d.id)) {
                                    this.getInputEl('Value', d.id).value = d.value
                                }
                                d.valueDirty = 'yes'
                                d._value = o.value

                            } else {
                                d.valueDirty = null
                            }
                            if (d.des !== o['_des']) {
                                if (this.getInputEl('Des', d.id)) {
                                    this.getInputEl('Des', d.id).value = d.des
                                }
                                d.desDirty = 'yes'
                                d._des = o.des
                            } else {
                                d.desDirty = null
                            }
                        }
                    }
                }
                this.setState({
                    data: ds,
                    selected: selected
                })
            }

        }
    }

    dataIsDirty = () => {
        var oldData = this.state.data
        for (let o of oldData) {
            if (o.name !== o._name || o.value !== o._value || o.des !== o._des) {
                return true
            }
        }
        return false
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const {classes, hidden} = this.props;
        const {data, order, orderBy, selected} = this.state;

        return (
            <div style={{display: hidden === 'hidden' ? 'none' : 'block'}}>
                <Paper className={classes.paper}>
                    <Table>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onClearAll={this.onClearAll}
                            onInitAll={this.onInitAll}
                            onRestAll={this.onResetAll}
                            dataIsDirty={this.dataIsDirty}
                            dataSize={this.dataSize}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            classes={classes}
                        />
                        <TableBody>
                            {data.map(n => {
                                const isSelected = this.isSelected(n.id);
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={!isSelected}
                                        tabIndex="-1"
                                        key={'request-tablerow-key' + n.id}
                                        selected={!isSelected}
                                    >
                                        <TableCell checkbox>
                                            <Checkbox
                                                className={classes.checkbox}
                                                onKeyDown={event => this.handleKeyDown(event, n.id)}
                                                onClick={event => this.handleClick(event, n.id)}
                                                checked={isSelected}/>
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <Input
                                                onChange={event => this.inputOnChange(event, 'Name', n.id)}
                                                onBlur={event => this.cellBlur(event, n.id, 'name')}
                                                inputRef={input => this[this.inputElName + 'Name' + n.id] = input}
                                                defaultValue={n.name}
                                                className={n.nameDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <Input
                                                type={n._type_value}
                                                onChange={event => this.inputOnChange(event, 'Value', n.id)}
                                                onBlur={event => this.cellBlur(event, n.id, 'value')}
                                                inputRef={input => this[this.inputElName + 'Value' + n.id] = input}
                                                defaultValue={n.value}
                                                className={n.valueDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <Input
                                                disabled
                                                onChange={event => this.inputOnChange(event, 'Des', n.id)}
                                                onBlur={event => this.cellBlur(event, n.id, 'des')}
                                                inputRef={input => this[this.inputElName + 'Des' + n.id] = input}
                                                defaultValue={n.des}
                                                className={n.desDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <div>
                                                <IconButton
                                                    style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                    onClick={event => this.dataOperator(event, n.id, 'init')}>
                                                    <InitIcon/>
                                                </IconButton>
                                                <IconButton
                                                    style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                    onClick={event => this.dataOperator(event, n.id, 'reset')}>
                                                    <ResetIcon/>
                                                </IconButton>
                                                <IconButton onClick={event => this.dataOperator(event, n.id, 'clear')}>
                                                    <ClearIcon/>
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);