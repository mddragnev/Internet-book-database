import {
    Avatar, Button, Container, FormControlLabel, Grid,
    makeStyles, Radio, RadioGroup, TextField, Typography
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons';
import React, { useState } from 'react'
import { User } from '../../models/user-model';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function Register({ onRegister }) {
    const styles = useStyles();

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [gender, setGender] = useState('');
    const [description, setDescription] = useState('');



    const submitForm = (event) => {
        event.preventDefault();
        const loadedUser = new User();
        loadedUser.registeredOn = new Date();
        loadedUser.name = fullName;
        loadedUser.username = username;
        loadedUser.password = password;
        loadedUser.gender = gender || '';
        loadedUser.role = "user";
        loadedUser.imageURL = imageURL ? imageURL : gender === "male" ? "/images/male.jpg" : "/images/female.jpg";
        loadedUser.description = description;
        loadedUser.lastModification = new Date();
        onRegister(loadedUser);
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={styles.form} onSubmit={submitForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField value={fullName} onChange={(event) => { setFullName(event.target.value) }}
                                autoComplete="fname" name="name" variant="outlined" required fullWidth id="FullName" label="Full name" autoFocus />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField value={username} onChange={(event) => { setUsername(event.target.value) }}
                                autoComplete="username" name="username" label="Username" id="username" required variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField value={password} type="password" onChange={(event) => { setPassword(event.target.value) }}
                                autoComplete="password" name="password" label="Password" id="password" required variant="outlined" fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={imageURL} onChange={(event) => { setImageURL(event.target.value) }}
                                name="imageURL" variant="outlined" fullWidth id="imageURL" label="Image URL" />
                        </Grid>
                        <Grid item xs={12}>
                            <RadioGroup value={gender} onChange={(event) => { setGender(event.target.value) }}>
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField value={description} onChange={(event) => { setDescription(event.target.value) }}
                                id="description" variant="outlined" fullWidth multiline label="Description" rows={5}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" className="styles.submit" fullWidth>Register</Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}
