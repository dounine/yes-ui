import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withStyles } from 'material-ui/styles';
import Body from './body';

const styles = theme => ({
    statusTime:{
        display:'flex',
        textAlign:'right',
        lineHeight:'48px',
        flex:99
    },
    full:{
        flex:1
    },
    right:{
        display:'flex',
        marginRight:10
    },
    span:{
        marginRight:10
    },
    spanNameColor:{
        color:'#7f7f7f',
        fontWeight:400
    },
    spanValueColor:{
        color:'#7096ff',
        fontWeight:400
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
        const {classes} = this.props;
        return (
            <Paper style={{ width: '100%' }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab icon={<i className={"iconfont icon-content"} />} />
                    <Tab icon={<i className={"iconfont icon-header"} />} />
                    <Tab icon={<i className={"iconfont icon-cookie"} />} />
                    <Tab icon={<i className={"iconfont icon-run"} />} />
                    <div className={classes.statusTime}>
                        <div className={classes.full}></div>
                        <div className={classes.right}>
                            <div className={classes.span}>
                                <span className={classes.spanNameColor}>Status: </span>
                                <span className={classes.spanValueColor}>200</span>
                            </div>
                            <div className={classes.span}>
                                <span className={classes.spanNameColor}>Time: </span>
                                <span className={classes.spanValueColor}>152 ms</span>
                            </div>
                        </div>
                    </div>
                </Tabs>
                {this.state.value === 0 && <div>
                    <Body />
                </div>}
            </Paper>
        );
    }
}


export default withStyles(styles)(IconTabs);