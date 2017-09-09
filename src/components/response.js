import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Body from './body';

export default class IconTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <Paper style={{ width: '100%' }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    fullWidth
                >
                    <Tab icon={<i className={"iconfont icon-content"} />} />
                    <Tab icon={<i className={"iconfont icon-header"} />} />
                    <Tab icon={<i className={"iconfont icon-cookie"} />} />
                    <Tab icon={<i className={"iconfont icon-run"} />} />
                </Tabs>
                {this.state.value === 0 && <div>
                    <Body />
                </div>}
            </Paper>
        );
    }
}