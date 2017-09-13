import React from 'react';

class ResetIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-dantizhongzhi"></i>
        );
    }
}

export default ResetIcon;