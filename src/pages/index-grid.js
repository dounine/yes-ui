import React, {Component} from 'react';
import withRoot from '../components/withRoot';
import IconButton from 'material-ui/IconButton'
import Module from '../components/module';
import Search from '../components/search';
import Paging from '../components/paging';
import { withRouter } from 'react-router';


const styles = {
    list: {
        display: 'flex',
        paddingLeft:20,
        paddingRight:10,
        flexWrap:'wrap'
    },
    filterIcon: {
        fontSize: 24
    },
    filterIconHeight: {
        height: 60,
        display: 'flex',
        alignItems: 'center'
    },
    flexStart:{
        display:'flex',
        flex:1,
    },
    flexEnd:{
        display: 'flex',

    }
};

class Index extends Component {

    switchGridList = () => {
        this.props.history.push('/list')
    };

    render() {
        return (
            <div style={styles.container}>
                <div style={styles.filterIconHeight}>
                    <div style={styles.flexStart}>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-all"/>
                        </IconButton>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-team"/>
                        </IconButton>
                        <IconButton>
                            <i style={styles.filterIcon} className="iconfont icon-mine"/>
                        </IconButton>
                        <div style={styles.search}>
                            <Search/>
                        </div>
                    </div>

                    <div style={styles.flexEnd}>
                        <IconButton onClick={this.switchGridList}>
                            <i style={styles.filterIcon} className="iconfont icon-list"/>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <div style={styles.list}>
                        <Module/>
                        <Module/>
                        <Module/>

                        <Module/>
                        <Module/>
                        <Module/>
                    </div>
                </div>
                <Paging />
            </div>
        );
    }
}

const ShowTheLocationWithRouter = withRouter(Index)
export default withRoot(ShowTheLocationWithRouter);
