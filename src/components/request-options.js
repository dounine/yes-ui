import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import OptionRequest from './request-options-request';
import OptionBody from './request-options-body';
import OptionHeader from './request-options-header';
const styles = theme => ({
    operator: {
        display:'flex',
        flex:95,
        lineHeight:'48px',
    },
    full:{
        display:'flex',
        flex:1
    },
    right:{
        display:'flex',
        marginRight:10
    },
    span:{
        marginRight:10
    }
})

class IconTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const {classes} = this.props
        return (
            <Paper style={{ width: '100%' }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                >
                    <Tab icon={<i className={"iconfont icon-my-request"} />} />
                    <Tab icon={<i className={"iconfont icon-header"} />} />
                    <Tab icon={<i className={"iconfont icon-data"} />} />
                    <Tab icon={<i className={"iconfont icon-ready"} />} />
                    <Tab icon={<i className={"iconfont icon-run"} />} />
                    <div className={classes.operator}>
                        <div className={classes.full}></div>
                        <div className={classes.right}>
                            <div className={classes.span}>
                                <span className={classes.spanNameColor}>操作</span>
                                {/*<span className={classes.spanValueColor}>200</span>*/}
                            </div>
                            <div className={classes.span}>
                                {/*<span className={classes.spanNameColor}>Time: </span>*/}
                                {/*<span className={classes.spanValueColor}>152 ms</span>*/}
                            </div>
                        </div>
                    </div>
                </Tabs>
                {this.state.value === 0 && <div>
                    <OptionBody />
                </div>}
                {this.state.value === 1 && <div>
                    <OptionHeader />
                </div>}
            </Paper>
        );
    }
}


export default withStyles(styles)(IconTabs);