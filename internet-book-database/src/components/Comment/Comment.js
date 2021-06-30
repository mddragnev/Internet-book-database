import React from 'react'
import { Avatar, Grid, Paper } from "@material-ui/core";
export default function Comment(props) {
    const { user, comment, createdOn } = props;
    return (
        <div style={{ padding: 14 }}>
            <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Avatar src={user.imageURL} />
                    </Grid>
                    <Grid justifycontent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{user.name}</h4>
                        <p style={{ textAlign: "left" }}>
                            {comment}
                        </p>
                        <p style={{ textAlign: "left", color: "gray" }}>
                            {createdOn}
                        </p>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
