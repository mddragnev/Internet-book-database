import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

export default function BookCard({ book, handleContinue }) {
    const classes = useStyles();
    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" onClick={() => handleContinue(book)}>
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {book.name}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {book.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                    </div>
                    <Hidden xsDown>
                        <CardMedia className={classes.cardMedia} image={book.imageURL} />
                    </Hidden>
                </Card>
            </CardActionArea>
        </Grid>
    )
}
