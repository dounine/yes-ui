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
import {MenuItem} from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Upload from './request-options-body-file-upload';
import Resource from './request-options-body-resources';
import Select from 'material-ui/Select';
import {ResetIcon,InitIcon,ClearIcon} from './icons/Icons';

let counter = 1;
let counter1 = 0;

function createData(name, value, des,isOld) {
    var m = -1
    if(isOld){
        m = counter1 += 1;
    }else{
        m = counter += 1;
    }
    var _name = name
    var _value = value
    var _des = des
    var _type = 1
    var _type_value = 'text'
    return {id: m, name, value, des, _name,_type,_type_value, _value, _des};
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

    onInitAll = () =>{
        this.props.onInitAll();
    }

    createSortHandler = property => event => {
        if (property !== 'operation') {
            this.props.onRequestSort(event, property);
        }
    };

    render() {
        const {classes,onRestAll,onInitAll, onClearAll, onSelectAllClick, order, orderBy, numSelected, dataSize} = this.props;

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
                                key={column.id}
                                numeric={column.numeric}
                                style={{paddingLeft:0}}
                                disablePadding={column.disablePadding}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={order}
                                    onClick={this.createSortHandler(column.id)}
                                >
                                    {column.id === 'operation' ? <div>
                                        <IconButton onClick={onInitAll}>
                                            <InitIcon/>
                                        </IconButton>
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
    checkbox:{
        color:theme.headerOptions.grey.checkbox
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
            createData('', '', '',true),
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
            if (d.id === id && d[name] !== event.target.value) {
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
                    this.getInputEl('Name',id).value = d['_name']
                    this.getInputEl('Value',id).value = d['_value']
                    this.getInputEl('Des',id).value = d['_des']
                    d.name = d['_name']
                    d.value = d['_value']
                    d.des = d['_des']
                    break
                }
            }
        } else if (type === 'clear') {
            for (var index = 0, len = datas.length; index < len; index++) {
                let d = datas[index]
                if (d && d.id === id) {
                    datas.splice(index, 1)
                    this.state.selected.removeByValue(d.id)
                    break
                }
            }
        } else if (type === 'init') {
            for (var index1 = 0, len1 = datas.length; index1 < len1; index1++) {
                let d = datas[index1]
                if (d && d.id === id) {
                    if(d['_name']!==d.name){
                        d.nameDirty = null
                        d['_name'] = d.name
                    }
                    if(d['_value']!==d.value){
                        d.valueDirty = null
                        d['_value']=d.value
                    }
                    if(d['_des'] !== d.des){
                        d.desDirty = null
                        d['_des'] = d.des
                    }
                    break
                }
            }
        }
        this.setState({})
    };

    onInitAll = () =>{
        var datas = this.state.data
        for (var index2 = 0, len2 = datas.length; index2 < len2; index2++) {
            var d = datas[index2]
            if(d['_name']!==d.name){
                d.nameDirty = null
                d['_name'] = d.name
            }
            if(d['_value']!==d.value){
                d.valueDirty = null
                d['_value']=d.value
            }
            if(d['_des'] !== d.des){
                d.desDirty = null
                d['_des'] = d.des
            }
        }
        this.setState({})
    };

    onClearAll = () => {
        var obj = createData('', '', '')
        this.setState({
            data: [
                obj
            ],
            selected: [obj.id]
        })
        var $self = this
        setTimeout(function () {
            if( $self[this.inputElName+obj.id]){
                $self[this.inputElName+obj.id].focus()
            }
        })
    };

    onResetAll = () => {
        var datas = this.state.data
        for (var i = 0, len = datas.length; i < len; i++) {
            var d = datas[i]
            if (d) {
                d.nameDirty = null
                d.valueDirty = null
                d.desDirty = null
                this.getInputEl('Name',d.id).value = d['_name']
                this.getInputEl('Value',d.id).value = d['_value']
                this.getInputEl('Des',d.id).value = d['_des']
                d.name = d['_name']
                d.value = d['_value']
                d.des = d['_des']
            }
        }
        this.setState({})
    };

    inputOnChange = (event,type, id) => {
        var datas = this.state.data
        var lastIndex = datas.length - 1
        if (id === datas[lastIndex].id) {
            if (event.target.value.trim().length !== 0) {
                var obj = createData('', '', '')
                datas.push(obj)
                this.handleClick(null, obj.id)
            }
        }
        var ds = []
        for(let d of this.state.data){
            if(id===d.id){
                var obj = {}
                if(type==='Name'){
                    obj.name = event.target.value
                    obj.value = this.getInputEl('Value',d.id).value
                    obj.des = this.getInputEl('Des',d.id).value
                }else if(type==='Value'){
                    obj.name = this.getInputEl('Name',d.id).value
                    obj.value = event.target.value
                    obj.des = this.getInputEl('Des',d.id).value
                }else if(type==='Des'){
                    obj.name = this.getInputEl('Name',d.id).value
                    obj.value = this.getInputEl('Value',d.id).value
                    obj.des = this.getInputEl('Des',d.id).value
                }
                ds.push(obj)
            }else{
                ds.push({
                    name:this.getInputEl('Name',d.id).value,
                    value:this.getInputEl('Value',d.id).value,
                    des:this.getInputEl('Des',d.id).value
                })
            }
        }
        this.props.childQueryChange(ds)
        this.setState({})
    };

    dataSize = () => {
        return this.state.data.length
    }

    getInputEl = (name,id) =>{
        return this[this.inputElName + name+id]
    }

    componentWillMount = () =>{
        if(this.props.params.length>0){
            var ds = []
            var selected = []
            for(let o of this.props.params){
                var obj = createData(o.name,o.value,'',true)
                ds.push(
                    obj
                )
                selected.push(obj.id)
            }
            this.setState({
                data:ds,
                oldData:ds,
                selected:selected
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        var ds = []
        var selected = []
        var oldData = this.state.oldData
        if(nextProps.params){
            counter = 1
            for(let o of nextProps.params){
                var obj = createData(o.name,o.value,'',false)
                ds.push(
                    obj
                )
                selected.push(obj.id)
            }
            for(let o of oldData){
                let find = null
                for(let d of ds){
                    if(d.id===o.id){
                        if(d.name!==o['_name']){
                            d.nameDirty = 'yes'
                            d._name = o.name
                        }else{
                            d.nameDirty = null
                        }
                        if(d.value!==o['_value']){
                            d.valueDirty = 'yes'
                            d._value = o.value

                        }else{
                            d.valueDirty = null
                        }
                        if(d.des!==o['_des']){
                            d.desDirty = 'yes'
                            d._des = o.des
                        }else{
                            d.desDirty = null
                        }
                        this.getInputEl('Name',d.id).value = d.name
                        this.getInputEl('Value',d.id).value = d.value
                        this.getInputEl('Des',d.id).value = d.des
                        break
                    }
                }
            }
            this.setState({
                data:ds,
                selected:selected
            })
        }
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const classes = this.props.classes;
        const {data, order, orderBy, selected} = this.state;

        let urlValue = this.props.value

        return (
            <Paper className={classes.paper}>
                <Table>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onClearAll={this.onClearAll}
                        onInitAll={this.onInitAll}
                        onRestAll={this.onResetAll}
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
                                    key={n.id}
                                    selected={!isSelected}
                                >
                                    <TableCell checkbox>
                                        <Checkbox
                                            className={classes.checkbox}
                                            onKeyDown={event => this.handleKeyDown(event, n.id)}
                                            onClick={event => this.handleClick(event, n.id)}
                                            checked={isSelected}/>
                                    </TableCell>
                                    <TableCell style={{paddingLeft:0}}>
                                        <Input
                                            onChange={event => this.inputOnChange(event,'Name', n.id)}
                                            onBlur={event => this.cellBlur(event, n.id, 'Name')}
                                            inputRef={input => this[this.inputElName+'Name'+n.id] = input}
                                            defaultValue={n.name}
                                            className={n.nameDirty === 'yes' ? classes.inputDirty : classes.input}
                                        />
                                    </TableCell>
                                    <TableCell style={{paddingLeft:0,paddingRight:0}}>
                                        <Input
                                            type={n._type_value}
                                            onChange={event => this.inputOnChange(event,'Value', n.id)}
                                            onBlur={event => this.cellBlur(event, n.id, 'Value')}
                                            inputRef={input => this[this.inputElName+'Value'+n.id] = input}
                                            defaultValue={n.value}
                                            className={n.valueDirty === 'yes' ? classes.inputDirty : classes.input}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            disabled
                                            onChange={event => this.inputOnChange(event,'Des' ,n.id)}
                                            onBlur={event => this.cellBlur(event, n.id, 'Des')}
                                            inputRef={input => this[this.inputElName+'Des'+n.id] = input}
                                            defaultValue={n.des}
                                            className={n.desDirty === 'yes' ? classes.inputDirty : classes.input}
                                        />
                                    </TableCell>
                                    <TableCell style={{paddingLeft:0}}>
                                        <div>
                                            <IconButton
                                                style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                onClick={event => this.dataOperator(event, n.id, 'init')}>
                                                <InitIcon />
                                            </IconButton>
                                            <IconButton
                                                style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                onClick={event => this.dataOperator(event, n.id, 'reset')}>
                                                <ResetIcon />
                                            </IconButton>
                                            <IconButton onClick={event => this.dataOperator(event, n.id, 'clear')}>
                                                <ClearIcon />
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