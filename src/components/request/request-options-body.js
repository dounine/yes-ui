import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import keycode from 'keycode';//用于event转换事件[enter,backspace,space]
import Table, {TableBody, TableCell, TableHead, TableRow, TableSortLabel,} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import {MenuItem} from 'material-ui/Menu';
import Badge from 'material-ui/Badge';
import Input, {InputLabel} from 'material-ui/Input';
import Upload from './request-options-body-file-upload';
import Resource from './request-options-body-resources';
import Select from 'material-ui/Select';
import {ClearIcon, InitIcon, ResetIcon} from '../icons/Icons';

let counter = 0;
function createData(name, value, des, _type, _type_value) {
    counter += 1;
    var _name = name
    var _value = value
    var _des = des
    _type = _type || 1
    _type_value = _type_value || 'text'
    var resources = []
    var uploadDisabled = true
    return {id: counter, name, value, des, _name, _type, _type_value, _value, _des,resources,uploadDisabled};
}

const columnData = [
    {id: 'name', numeric: false, disablePadding: true, label: '名称'},
    {id: 'type', numeric: false, disablePadding: true, label: ''},
    {id: 'value', numeric: false, disablePadding: false, label: '值'},
    {id: 'upload', numeric: false, disablePadding: true, label: ''},
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

    createSortHandler = property => event => {
        if (property !== 'operation') {
            this.props.onRequestSort(event, property);
        }
    };

    render() {
        const {classes, onRestAll, onInitAll, onClearAll, onSelectAllClick, order, orderBy, numSelected, dataSize} = this.props;

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
                                style={{paddingLeft: 0}}
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
    },
    badge: {
        margin: `0 ${theme.spacing.unit * 2}px`,
        cursor:'pointer',
    },
    iconSize:{
        fontSize:24
    }
});

class EnhancedTable extends React.Component {

    state = {
        type: 1,
        order: 'asc',
        orderBy: 'name',
        selected: [],
        resourceButton: false,//
        data: [
            createData('FrozenYoghurt', 'value', 'des', 3),
            createData('Username', 'value', 'des'),
            createData('Eclair', 'value', 'des'),
            createData('Cupcake', 'value', 'des'),
            createData('Gingerbread', 'value', 'des'),
            createData('', '', ''),
        ],
    };

    inputElName = 'bodyInputRefs';

    /**
     * 列排序
     * @param event 事件对象
     * @param property 列字段名称
     */
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

    /**
     * 选中所有行
     */
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    /**
     * 组件初始化完毕，默认选择全部
     */
    componentDidMount = () => {
        this.handleSelectAllClick(null, true)
    }

    /**
     * Input 输入框焦点失去事件
     * @param event 事件对象
     * @param id 行id
     * @param name [name,value,des]
     */
    inputOnBlur = (event, id, name) => {
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

    /**
     * 行多选框键盘事件
     * @param event 事件对象
     * @param id 行id
     */
    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.checkboxHandleClick(event, id);
        }
    };

    /**
     * 行多选框选中事件
     * @param event 事件对象
     * @param id 行id
     */
    checkboxHandleClick = (event, id) => {
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

    /**
     * 行数据操作
     * @param event 事件对象
     * @param n 对象数据
     * @param type 操作类型[reset,clear,init]
     */
    rowOperatorHandler = (event, n, type) => {
        let datas = this.state.data
        let id = n.id
        if (type === 'reset') {
            for (let i = 0, le = datas.length; i < le; i++) {
                let d = datas[i]
                if (d && d.id === id) {
                    d.nameDirty = null
                    d.valueDirty = null
                    d.desDirty = null
                    this.getInputEl('Name', id).value = d['_name']
                    let valueEl = this.getInputEl('Value', id)
                    if(valueEl.type==='file'){
                        valueEl.outerHTML = valueEl.outerHTML
                    }else{
                        valueEl.value = d['_value']
                    }
                    d.uploadDisabled = true
                    this.getInputEl('Des', id).value = d['_des']
                    d.name = d['_name']
                    d.value = d['_value']
                    d.des = d['_des']
                    break
                }
            }
        } else if (type === 'clear') {
            for (let i = 0, len = datas.length; i < len; i++) {
                let d = datas[i]
                if (d && d.id === id) {
                    datas.splice(i, 1)
                    this.state.selected.removeByValue(d.id)
                    break
                }
            }
        } else if (type === 'init') {
            for (let i = 0, len1 = datas.length; i < len1; i++) {
                let d = datas[i]
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

    /**
     * 初始化全部数据
     */
    onInitAll = () => {
        let datas = this.state.data
        for (let i = 0, len = datas.length; i < len; i++) {
            var d = datas[i]
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
        }
        this.setState({})
    };

    /**
     * 清除全部数据
     */
    onClearAll = () => {
        let obj = createData('', '', '')
        this.setState({
            data: [
                obj
            ],
            selected: [obj.id]
        })
        let $self = this
        setTimeout(function () {
            $self.getInputEl('Name', obj.id).focus()
        })
    };

    /**
     * 重置全部数据
     */
    onResetAll = () => {
        let datas = this.state.data
        for (let i = 0, len = datas.length; i < len; i++) {
            let d = datas[i]
            if (d) {
                d.nameDirty = null
                d.valueDirty = null
                d.desDirty = null
                this.getInputEl('Name', d.id).value = d['_name']
                this.getInputEl('Value', d.id).value = d['_value']
                this.getInputEl('Des', d.id).value = d['_des']
                d.name = d['_name']
                d.value = d['_value']
                d.des = d['_des']
            }
        }
        this.setState({})
    };

    /**
     * inputOnchagne 过滤出来的Input类型为file修改事件
     * @param event 修改事件
     * @param n 数据对象
     */
    fileInputOnchange = (event, n) =>{
        if(event.target.files.length>0){
            n.uploadDisabled = false

            this.setState({})
        }
    }

    /**
     * Input 侦听值的修改
     * @param event 事件对象
     * @param n 数据对象
     */
    inputOnchagne = (event, n) => {
        if(event.target.type==='file'){
            this.fileInputOnchange(event,n)
        }
        let datas = this.state.data
        let lastIndex = datas.length - 1
        if (n.id === datas[lastIndex].id) {
            if (event.target.value.trim().length !== 0) {
                let obj = createData('', '', '')
                datas.push(obj)
                this.checkboxHandleClick(null, obj.id)
            }
        }
        this.setState({})
    };

    dataSize = () => {
        return this.state.data.length
    }


    /**
     * 获取material-ui对象Input原生对象
     * @param name [Name,Value,Des]
     * @param id 行id
     * @returns {js原生dom对象}
     */
    getInputEl = (name, id) => {
        return this[this.inputElName + name + id]
    }

    /**
     * 修改下拉框数据类型[内容，文件，资源]
     * @param name 区分name与value与des
     * @param n 遍历对象数据
     */
    typeHandleChange = (name, n) => event => {
        n._type = event.target.value
        var input = this.getInputEl('Value', n.id)
        input.value = ''
        n.value = n._value
        n.valueDirty = null
        if (n._type === 2) {
            n._type_value = 'file'
            input.style.height = 'auto'
        } else if (n._type === 1 || n._type === 3) {
            n._type_value = 'string'
            input.style.height = '1em'
        }
        this.setState({});
    };

    /**
     * 资源按钮点击，弹出资源列表选择
     * @param n 遍历数据对象
     */
    resourceButtonClick = (n) => {
        this.setState({
            resourceButton: true,
            resourceId:n.id,
            resourceData:n.resources
        })
    };

    /**
     * 资源列表选择容器关闭回调
     * @param selected 已选择的数据
     * @param confirm 两种返回状态[关闭|确认]
     */
    resourceCallbackClose = (selected,confirm) => {
        this.setState({
            resourceButton: false
        })
        if(confirm){//确定/!取消
            let value = []
            selected.forEach(function (s) {
                value.push(s.fileName)
            })
            // this.state.data.updateForKeyValue('id',this.state.resourceId,'value',value.join(','))
            this.state.data.updateForKeyValue('id',this.state.resourceId,'resources',selected)
            // this.getInputEl('Value',this.state.resourceId).value = value.join(',')
            // let event = {target:{value:value.join(',')}}
            // this.inputOnBlur(event,this.state.resourceId,'value')
        }
    }

    /**
     * 判断行数据是否选择中,用于表单可选提交
     * @param id 行ID
     */
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const classes = this.props.classes;
        const {data, order, orderBy, selected} = this.state;

        return (
            <div>
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
                                                onClick={event => this.checkboxHandleClick(event, n.id)}
                                                checked={isSelected}/>
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <Input
                                                onChange={event => this.inputOnchagne(event, n)}
                                                onBlur={event => this.inputOnBlur(event, n.id, 'name')}
                                                inputRef={input => this[this.inputElName + 'Name' + n.id] = input}
                                                defaultValue={n.name}
                                                className={n.nameDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{padding: '4px 0 0 0'}}>
                                            <InputLabel htmlFor={"age-simple" + n.id}></InputLabel>
                                            <Select
                                                value={n._type}
                                                onChange={this.typeHandleChange('type', n)}
                                                input={<Input id={"age-simple" + n.id}/>}
                                            >
                                                <MenuItem value={1}>内容</MenuItem>
                                                <MenuItem value={2}>文件</MenuItem>
                                                <MenuItem value={3}>资源</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0, paddingRight: 0}}>
                                            <Input
                                                type={n._type_value}
                                                onChange={event => this.inputOnchagne(event, n)}
                                                onBlur={event => this.inputOnBlur(event, n.id, 'value')}
                                                inputRef={input => this[this.inputElName + 'Value' + n.id] = input}
                                                defaultValue={n.value}
                                                className={n.valueDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{padding: '0px'}}>
                                            {n._type === 2 ? <Upload uploadDisabled={n.uploadDisabled} fileEl={this[this.inputElName + 'Value' + n.id]}/> : (n._type === 1 ? '' :
                                                <Badge onClick={() => this.resourceButtonClick(n)} className={classes.badge} badgeContent={n.resources.length || ''}><i
                                                    className={classes.iconSize+" iconfont icon-resource"}></i></Badge>)}
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <Input
                                                disabled
                                                onChange={event => this.inputOnchagne(event, n)}
                                                onBlur={event => this.inputOnBlur(event, n.id, 'des')}
                                                inputRef={input => this[this.inputElName + 'Des' + n.id] = input}
                                                defaultValue={n.des}
                                                className={n.desDirty === 'yes' ? classes.inputDirty : classes.input}
                                            />
                                        </TableCell>
                                        <TableCell style={{paddingLeft: 0}}>
                                            <div>
                                                <IconButton
                                                    style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                    onClick={event => this.rowOperatorHandler(event, n, 'init')}>
                                                    <InitIcon/>
                                                </IconButton>
                                                <IconButton
                                                    style={{visibility: ((n.nameDirty === 'yes' || n.valueDirty === 'yes' || n.desDirty === 'yes') ? 'visible' : 'hidden')}}
                                                    onClick={event => this.rowOperatorHandler(event, n, 'reset')}>
                                                    <ResetIcon/>
                                                </IconButton>
                                                <IconButton onClick={event => this.rowOperatorHandler(event, n, 'clear')}>
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
                {this.state.resourceButton && <Resource resourceData={this.state.resourceData} resourceButton={this.state.resourceButton} resourceClose={this.resourceCallbackClose}/>}
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);