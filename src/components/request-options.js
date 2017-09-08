import React from 'react';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import RequestHeader from './request-options-hreader';

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
                    <Tab icon={<i className={"iconfont icon-header"} />} />
                    <Tab icon={<i className={"iconfont icon-data"} />} />
                </Tabs>
                {this.state.value === 0 && <div>
                    <RequestHeader />
                </div>}
            </Paper>
        );
    }
}