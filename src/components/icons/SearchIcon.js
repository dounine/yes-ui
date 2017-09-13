import React from 'react';

class SearchIcon extends React.Component {
    render() {
        const fontSize = this.props.fontSize || '16px'
        return (
            <i style={{fontSize:fontSize}} className="iconfont icon-search"></i>
        );
    }
}

export default SearchIcon;