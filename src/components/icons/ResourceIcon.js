import React from 'react';

class ResourceIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-resource"></i>
        );
    }
}

export default ResourceIcon;