import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
import Icon from 'material-ui/Icon';


let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
    { id: 'name', numeric: false, disablePadding: true, label: '模块名称' },
    { id: 'calories', numeric: true, disablePadding: false, label: '所属' },
    { id: 'fat', numeric: true, disablePadding: false, label: '请求数' },
    { id: 'carbs', numeric: true, disablePadding: false, label: '最后更新' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

class EnhancedTableHead extends Component {
    static propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.string.isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        Icon
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

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    img:{
        width:23,
        height:20
    }
});

class EnhancedTable extends Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: [
            createData('Frozen yoghurt', 159, 6.0, '2017-08-22 17:12:11', 4.0),
            createData('Ice cream sandwich', 237, 9.0, '2017-08-22 17:12:11', 4.3),
            createData('Eclair', 262, 16.0, '2017-08-22 17:12:11', 6.0),
            createData('Cupcake', 305, 3.7, '2017-08-22 17:12:11', 4.3),
            createData('Gingerbread', 356, 16.0, '2017-08-22 17:12:11', 3.9),
            createData('Gingerbread', 356, 16.0, '2017-08-22 17:12:11', 3.9),
            createData('Gingerbread', 356, 16.0, '2017-08-22 17:12:11', 3.9),
            createData('Gingerbread', 356, 16.0, '2017-08-22 17:12:11', 3.9),
            createData('Gingerbread', 356, 16.0, '2017-08-22 17:12:11', 3.9),
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

        this.setState({ data, order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({ selected: this.state.data.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
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

        this.setState({ selected: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const classes = this.props.classes;
        const { data, order, orderBy, selected } = this.state;

        return (
            <Paper className={classes.paper}>
                <Table>
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                    />
                    <TableBody>
                        {data.map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                                <TableRow
                                    hover
                                    onClick={event => this.handleClick(event, n.id)}
                                    onKeyDown={event => this.handleKeyDown(event, n.id)}
                                    role="checkbox"
                                    tabIndex="-1"
                                    key={n.id}
                                >
                                    <TableCell>
                                        <img className={classes.img} src="./images/live-from-space.jpg" />
                                    </TableCell>
                                    <TableCell disablePadding>
                                        {n.name}
                                    </TableCell>
                                    <TableCell numeric>
                                        {n.calories}
                                    </TableCell>
                                    <TableCell numeric>
                                        {n.fat}
                                    </TableCell>
                                    <TableCell numeric>
                                        {n.carbs}
                                    </TableCell>
                                    <TableCell numeric>
                                        {n.protein}
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