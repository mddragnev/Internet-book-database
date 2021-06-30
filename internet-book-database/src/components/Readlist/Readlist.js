import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ReadlistItem from './ReadlistItem';
import { useHistory } from 'react-router-dom';


export default function Readlist(props) {
    const { books, redirect } = props;
    const history = useHistory();

    useEffect(() => {
        if (books == null) {
            redirect('/readlist');
            history.push('/login');
            return;
        }
    }, [])
    return (
        <Grid item xs={12} md={6}>
            {
                books?.length === 0 || books === null ? <h1>No watchlist</h1> :
                    <List>
                        {books.map(book => <ReadlistItem {...props} item={book} key={book._id} />)}
                    </List>
            }

        </Grid>
    )
}
