import { Button, Container, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Book } from '../../models/book-model';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function BookForm({ onBookSubmit, loggedUser, setRedirect }) {
    const history = useHistory();
    const styles = useStyles();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        if (!loggedUser) {
            history.push('/login');
            setRedirect('/addbook');
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        onBookSubmit(new Book(name, description, imageURL));
    }
    return (
        <Container component="main" maxWidth={"sm"} >
            <div className={styles.paper}>
                <Typography variant="h4" gutterBottom>
                    Add Book
                </Typography>
                <form className="styles.form" onSubmit={handleSubmit} onKeyPress={e => { e.key === 'Enter' && e.preventDefault(); }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <TextField
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                                required
                                id="name"
                                name="name"
                                label="Book name"
                                fullWidth
                                autoComplete="book-name"
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField value={imageURL}
                                onChange={(event) => { setImageURL(event.target.value) }}
                                id="imageURL" name="imageURL" label="Image URL" required fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={description}
                                onChange={(event) => { setDescription(event.target.value) }}
                                required
                                id="description"
                                name="description"
                                label="Book description"
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                    >
                        Add
                    </Button>
                </form>
            </div>

        </Container>
    )
}
