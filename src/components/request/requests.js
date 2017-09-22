import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, {Tab} from 'material-ui/Tabs';
import Request from './request';
import uuid4 from 'uuid/v4';


const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 3,
        flexGrow: 1,
        marginLeft:340,
        // width: '100%',
        // marginTop: theme.spacing.unit * 3,
        // backgroundColor: theme.palette.background.paper,
    }
});

class Requests extends React.Component {
    state = {
        value: 0,
        selectRequestId:'',
        datas:[],
        localStorageState : null
    };

    componentWillMount = () =>{
        let da = []
        for(let i =0,len=20;i<len;i++){
            da.push({
                name:'用户注册'+i,
                value:i,
                uuid:uuid4(),
                requestId:'12341234'+i
            })
        }
        this.setState({
            datas:da,
            selectRequestId:da[0].requestId,
        })
    }

    handleChange = (event, value) => {
        this.setState({
            value:value,
            requestType:'click',
            localStorageState:localStorage[this.state.datas[value].requestId]
        });
    };

    closeSingle = (event,returnState) =>{
        let requestId = returnState.requestId
        if(this.state.datas.length>1){
            this.state.datas.removeByKey('requestId',requestId);
            this.setState({
                selectRequestId:this.state.datas[0].requestId,//取最新一个作为第一个元素
                requestType:'close'
            })
        }
    };

    /**
     *
     * @param type [close,click]
     * @param state
     */
    stateReturn = (type,state) =>{
        if(type==='click'){
            localStorage[state.requestId] = state
        }
    };

    closeAll = () =>{

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
                        scrollable
                        scrollButtons="auto"
                    >
                        {
                            this.state.datas.map(n =>{
                                return <Tab key={n.uuid} label={n.name}/>
                            })
                        }
                    </Tabs>
                </AppBar>
                <Request stateReturn={this.stateReturn} localStorageState={this.state.localStorageState} requestType={this.state.requestType} closeSingle={this.closeSingle} closeAll={this.closeAll} requestId={this.state.selectRequestId} />
            </div>
        );
    }
}

Requests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);