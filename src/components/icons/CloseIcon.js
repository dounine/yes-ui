import React from 'react';

class CloseIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-close"></i>
        );
    }
}

export default CloseIcon;