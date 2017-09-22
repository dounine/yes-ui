import React from 'react';

class CloseAllBtn extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-all_btn_close"></i>
        );
    }
}

export default CloseAllBtn;