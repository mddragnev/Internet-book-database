import { Grid } from '@material-ui/core';
import React from 'react'
import BookCard from './BookCard';

export default function TopBooks(props) {
    const { books } = props;
    return (
        <Grid container spacing={4} style={{marginTop: "10px"}}>
            {books.sort((a, b) => {
                let ratinA = a.rating.map(r => r.value).reduce((sum, cur) => sum += cur, 0);
                let ratinB = b.rating.map(r => r.value).reduce((sum, cur) => sum += cur, 0);
                return ratinB - ratinA;
            }).slice(0,6).map((book) => (
                <BookCard {...props} key={book._id} book={book} />
            ))}
        </Grid>
    )
}
