import store from "../../store";
import { getUserDetails, setUserDetails } from "../../services/user.service"
import Typography from "@mui/material/Typography";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

export function Home() {
    const userDetails = store.getState().userDetails;



    const ListElement = () => {
        return (
            <>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
            </>
        );
    }
    return (
        <div className="home">
            <div className="chat-left-pane" style={{ width: '30%', display:'flex', alignItems:'center' }}>
                <div className="orgs-list" style={{width:'50px'}}>
                    {['A', 'B', 'C'].map(e => <div className="org-name">
                        {e}
                    </div>)}
                </div>
                <div className="users-list">
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {[1, 2, 3].map(e => <ListElement />)}
                    </List>
                </div>
            </div>
        </div>
    )
}