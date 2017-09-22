import React from 'react';

class CloseAll extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className={"iconfont icon-iconcloseall"}></i>
        );
    }
}

export default CloseAll;