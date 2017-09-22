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
        datas:[]
    };

    componentWillMount = () =>{
        let da = []
        for(let i =0,len=20;i<len;i++){
            da.push({
                name:'用户注册'+i,
                value:i,
                uuid:uuid4(),
                id:'12341234'+i
            })
        }
        this.setState({
            datas:da
        })
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="flex" color="inherit">
                    <Tabs
                        value={value}
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
                {
                    this.state.datas.map(n =>{
                        if(value===n.value){
                            return <Request key={n.uuid} requestId={n.id} />
                        }
                    })
                }
            </div>
        );
    }
}

Requests.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Requests);