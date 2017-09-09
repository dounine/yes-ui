import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Tabs, { Tab } from 'material-ui/Tabs';
import HistoryRequest from './module-history';

function TabContainer(props) {
    return <div style={{ padding: 0 }}>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    filterIcon:{
        fontSize: 24
    },
    filterIconGroup:{
        marginTop:12
    }
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root} style={{ width: 340 }}>
                <AppBar position="static" color="white">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="测试历史" />
                        <Tab label="请求列表" />
                    </Tabs>
                </AppBar>
                <SwipeableViews index={this.state.value} onChangeIndex={this.handleChangeIndex}>
                    <TabContainer>
                        <div className={classes.filterIconGroup}>
                            <IconButton onClick={() => this.groupClick('all')}>
                                <i className={classes.filterIcon+" iconfont icon-all"}/>
                            </IconButton>
                            <IconButton onClick={() => this.groupClick('team')}>
                                <i className={classes.filterIcon+" iconfont icon-team"}/>
                            </IconButton>
                            <IconButton onClick={() => this.groupClick('mine')}>
                                <i className={classes.filterIcon+" iconfont icon-mine"}/>
                            </IconButton>
                        </div>
                        <HistoryRequest />
                        <Divider />
                    </TabContainer>
                    <TabContainer>{'Item Two'}</TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthTabs);