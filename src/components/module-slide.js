import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import {withStyles} from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Tabs, {Tab} from 'material-ui/Tabs';
import ModuleRequest from './module-request';

function TabContainer(props) {
    return <div style={{padding: 0}}>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    filterIcon: {
        fontSize: 20
    },
    filterIconGroup: {
        marginTop: 0
    }
});

class FullWidthTabs extends React.Component {
    state = {
        value: 1,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="测试历史"/>
                        <Tab label="请求列表"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
                    <TabContainer>
                        {'Item One'}
                    </TabContainer>
                    <TabContainer>
                        <div className={classes.filterIconGroup}>
                            <IconButton onClick={() => this.groupClick('all')}>
                                <a title="全部" ><i className={classes.filterIcon + " iconfont icon-all"}/></a>
                            </IconButton>

                            <IconButton onClick={() => this.groupClick('team')}>
                                <a title="项目组" ><i className={classes.filterIcon + " iconfont icon-team"}/></a>
                            </IconButton>
                            <IconButton onClick={() => this.groupClick('mine')}>
                                <a title="个人" ><i className={classes.filterIcon + " iconfont icon-mine"}/></a>
                            </IconButton>
                        </div>
                        <ModuleRequest/>
                        <Divider/>
                    </TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthTabs);