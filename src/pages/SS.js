import React from 'react';
import withRoot from '../components/withRoot';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import EventEmitter from 'events';
import axios from 'axios';

class SS extends React.Component {

    state = {
        message: ''
    };

    componentWillMount() {
        let $self = this;

        axios.get('https://www.skout.com/socket.io/1/?t=' + new Date().getTime())
            .then(function (response) {
                $self.openWebSocket(response)
            }).catch(function (error) {
            console.log(error);
        });
        this.em = new EventEmitter();
        this.em.addListener('login', function (result) {
            console.log('登录中');
        });
        this.em.addListener('login-ok', function (result) {
            console.log('登录成功');
            $self.setState({
                login:result
            })
        });
        this.em.addListener('login-failed', function (result) {
            console.log(result)
        });
        this.em.addListener('re-login', function (result) {
            console.log(result)
        });
        this.em.addListener('chat', function (result) {
            console.log(result)
        });
        this.em.addListener('usertyping', function (result) {
            console.log(result)
        });
        this.em.addListener('notification', function (result) {
            console.log(result)
        });
        this.em.addListener('connect', function (result) {
            console.log(result)
        })
    }

    openWebSocket(response) {
        let sessionId = response.data.split(":")[0]
        let $self = this;
        let socket = new WebSocket('wss://www.skout.com:443/socket.io/1/websocket/' + sessionId);
        socket.onopen = function (e) {
            $self.em.emit('login');
            socket.send('5:::{"name":"login","args":[{"sessionId":"f0bb9f2c-95db-4b36-8c30-ba68e3247ce0"}]}')
        };
        socket.onmessage = function (e) {
            let jsonData = e.data.substring(4);
            if(jsonData.trim()!==""){
                let jsonObj = JSON.parse(jsonData);
                $self.em.emit(jsonObj.name,jsonData)
            }
            socket.send('2::');
        };
        socket.onerror = function (e) {
            console.log('error:' + e.message)
        }
        socket.onclose = function (e) {
            console.log('close:' + e.code, e.reason)
        }
    }

    render() {
        return (
            <div>
                <div>{this.state.login}</div>
            </div>
        )
    }
}

const styles = theme => ({})


const ShowTheLocationWithRouter = withStyles(styles)(SS)
export default withRoot(ShowTheLocationWithRouter);