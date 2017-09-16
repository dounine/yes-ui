import React from 'react';

class FileIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-all1"></i>
        );
    }
}

export default FileIcon;