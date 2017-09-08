import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import ModuleBage from './module-badge';
import './iconfont/iconfont.css';

const styles = {
    card: {
        width: 345,
        margin:10,
        padding:6,
    },
    media: {
        height: 200,
    },
};

function SimpleMediaCard(props) {
    const classes = props.classes;
    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="./images/live-from-space.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography type="headline" component="h2">
                        用户模块
                    </Typography>
                    <Typography component="p">
                        the description put the block
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <ModuleBage />
                    </IconButton>
                    <IconButton>
                        <ModuleBage />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
