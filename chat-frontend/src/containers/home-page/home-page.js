import store from "../../store";
import { getAllOrgs, getUserDetails, getChatsForOrg, setUserDetails } from "../../services/user.service"
import Typography from "@mui/material/Typography";
import React from "react";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { useState, useEffect } from 'react';
import './home-page.scss';
import { Messages } from "../../components/messages/messages";

export function Home() {
    const userDetails = store.getState().userDetails;

    const [orgs, setOrgs] = useState(['Organization1', 'Organization2', 'Organization2'])
    const [selectedOrg, setSelectedOrg] = useState(0);
    
    const [orgChats, setOrgChats] = useState([1,2,3]); 

    const [selectedChat, setSelectedChat] = useState();

    useEffect(()=>{
        getOrgs();
        getOrgUsers()
    },[])

    const getOrgs = async ()=> {
        const {data} = await getAllOrgs();
        // setOrgs(data);
    }

    const getOrgUsers = async ()=> {
        const {data} = await getChatsForOrg();
        // setOrgChats(data);
    }

    const ListElement = () => {
        return (
            <div className="list-element">
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
            </div>
        );
    }

    const changeOrg = (i)=> {
        setSelectedOrg(i);
        getChatsForOrg(orgs[i])
    }
    return (
        <div className="home" style={{display:'flex'}}>
            <div className="chat-left-pane" style={{display:'flex', margin:'2em', alignItems:'center' }}>
                <div className="orgs-list" style={{ borderRight: '1px solid lightgrey', height:'100vh', marginTop:'2em', paddingRight:'2em'}} >
                    {orgs && orgs.map((e,i) => <div onClick={()=>changeOrg(i)} style={{padding:'15px', margin:'10px', cursor:'pointer'}} className={`org-name`+ (i===selectedOrg ? ' --selected' :"")} >
                        {e}
                    </div>)}
                </div>
                {/* {selectedOrg!==null && <div className="users-list" style={{height:'100vh'}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {orgChats.map((e,i) => <ListElement/>)}
                    </List>
                </div>} */}
            </div>
            <div className="chat-right-pane" style={{width:'100%'}}>
                <Messages></Messages>
            </div>
        </div>
    )
}