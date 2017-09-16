import React from 'react';

class FileIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-file"></i>
        );
    }
}

export default FileIcon;