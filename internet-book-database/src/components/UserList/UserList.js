import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import UserItem from './UserItem';
import userService from '../../services/userService';


export default function UserList(props) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.getUsers()
            .then(response => {
                setUsers(response);
            })
            .catch(err => {
                console.error(err);
            });
    }, [users]);

    const removeUser = (user) => {
        userService.deleteUser(user._id)
            .then(response => {
                setUsers(old => old.filter(u => u._id !== response._id));
            })
            .catch(err => {
                console.error(err);
            });
    }

    return (
        <Grid item xs={12} md={6}>
            {
                <List>
                    {users.map(user => <UserItem removeItem={removeUser} item={user} key={user._id} />)}
                </List>
            }

        </Grid>
    )
}
