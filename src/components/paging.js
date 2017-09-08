import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {withStyles} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton'
import Menu, {MenuItem} from 'material-ui/Menu';
import axios from 'axios';

const options = [
    '全部',
    '20',
    '50',
    '100',
];
const styles = {
    pages: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    pageButton: {
        margin: 4,
        fontSize: 30,
    },
    pageBlock: {
        width: 377,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    pageIcon: {
        fontSize: 30
    },
    iconSize: {
        fontSize: 30,
    }
};
const ITEM_HEIGHT = 48;
class Paging extends Component {

    state = {
        anchorEl: undefined,
        open: false,
        size: 0,
        count: 0,
        indexButton: true,
        nextButton: true,
        prevButton: true,
        lastButton: true,
    };

    componentWillMount = () => {
        let self = this;
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        let size = parseInt(arr[3]);
        let page = parseInt(arr[4]);

        this.setState({
            prevButton: !(page > 1),
            indexButton: !(page > 1),
            count: 0
        })

        axios.get('http://localhost:8080/yes/count')
            .then((response) => {
                self.setState({
                    count: parseInt(response.data)
                })
                this.handlerPagesButton()
            });

    }

    clickFirst = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        if (arr[4] !== '1') {
            arr[4] = '1';
            this.props.history.push(arr.join('/'))
        }

        this.handlerPagesButton()
    };

    clickPrev = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        let page = parseInt(arr[4]);
        if (page > 1) {
            arr[4] = page - 1;
            this.props.history.push(arr.join('/'))
        }
        this.handlerPagesButton()
    };


    handlerPagesButton = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        let size = parseInt(arr[3]);
        let page = parseInt(arr[4]);
        if(size=='0'){
            this.setState({
                nextButton: true,
                lastButton: true,
                prevButton:true,
                indexButton:true
            })
        }else{
            if (arr[4] == 1) {//第一页
                this.setState({
                    prevButton: true,
                    indexButton: true
                })
                if (this.state.count <= (size * page)) {
                    this.setState({
                        nextButton: true,
                        lastButton: true
                    })
                } else {
                    this.setState({
                        nextButton: false,
                        lastButton: false
                    })
                }
            } else if (this.state.count <= (size * page)) {
                this.setState({
                    nextButton: true,
                    indexButton: false,
                    prevButton: false,
                    lastButton: true
                })
            }
        }

    };


    clickNext = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        if (arr[4]) {
            arr[4] = parseInt(arr[4]) + 1;
            this.props.history.push(arr.join('/'))
        }

        this.handlerPagesButton()
    };

    clickFoot = () => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');

        if (arr[4]) {
            arr[4] = Math.ceil(this.state.count / parseInt(arr[3]))
            this.props.history.push(arr.join('/'))
        }

        this.handlerPagesButton()
    };

    componentDidMount() {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        this.setState({size: arr[3]=='0'?'全部':arr[3]});
    };

    handleClick = event => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = (select) => {
        let pathname = this.props.history.location.pathname;
        var arr = pathname.split('/');
        if (arr[3] != select.toString() && typeof select == 'string') {
            arr[3] = select=='全部'?'0':select;
            this.props.history.push(arr.join('/'))
            this.setState({open: false, size: select});
        }else{
            this.setState({open: false});
        }
        this.handlerPagesButton()
    };

    render() {
        return (
            <div style={styles.pages}>
                <div style={styles.pageButton}>
                    <div>
                        <IconButton
                            aria-label="More"
                            aria-owns={this.state.open ? 'long-menu' : null}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                        >
                            <i style={styles.iconSize} className="iconfont icon-resize-vertical"></i>
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={this.state.anchorEl}
                            open={this.state.open}
                            onRequestClose={this.handleRequestClose}
                            style={{maxHeight: ITEM_HEIGHT * 4.5}}
                            MenuListProps={{
                                style: {
                                    width: 70
                                },
                            }}
                        >
                            {options.map(option =>
                                <MenuItem key={option} selected={option === this.state.size}
                                          onClick={() => this.handleRequestClose(option)}>
                                    {option}
                                </MenuItem>,
                            )}
                        </Menu>
                    </div>
                </div>
                <IconButton disabled={this.state.indexButton} onClick={this.clickFirst} style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-rentou"/>
                </IconButton>
                <IconButton disabled={this.state.prevButton} onClick={this.clickPrev} style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-prev"/>
                </IconButton>
                <IconButton disabled={this.state.nextButton} onClick={this.clickNext} style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-next"/>
                </IconButton>
                <IconButton disabled={this.state.lastButton} onClick={this.clickFoot} style={styles.pageButton}>
                    <i style={styles.pageIcon} className="iconfont icon-foot"/>
                </IconButton>
            </div>
        )
    }
}

Paging.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ShowTheLocationWithRouter = withRouter(Paging);
export default withStyles(styles)(ShowTheLocationWithRouter);