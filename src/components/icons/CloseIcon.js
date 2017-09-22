import React from 'react';

class CloseIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        const number = this.props.number || ''
        return (
            <i style={{fontSize:fontSize}} className={"iconfont icon-close"+number}></i>
        );
    }
}

export default CloseIcon;