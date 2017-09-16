import React from 'react';

class FoldIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-fold"></i>
        );
    }
}

export default FoldIcon;