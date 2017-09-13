import React from 'react';

class ClearIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-clear"></i>
        );
    }
}

export default ClearIcon;