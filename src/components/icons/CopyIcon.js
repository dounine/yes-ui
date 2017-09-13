import React from 'react';

class CopyIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-copy"></i>
        );
    }
}

export default CopyIcon;