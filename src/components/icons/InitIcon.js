import React from 'react';

class InitIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-initial"></i>
        );
    }
}

export default InitIcon;