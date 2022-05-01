import store from "../../store";
import { getUserOrg, getUserDetails, getChatsForOrg, setUserDetails, getOrgInfo, getOrgLevelUsers } from "../../services/user.service"
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
import { CircularProgress } from "@mui/material";

export function Home() {
    const userDetails = store.getState().userDetails || getUserDetails();

    const [userOrgs, setUserOrgs] = useState()
    const [selectedOrg, setSelectedOrg] = useState(0);
    const [orgUsers, setOrgUsers] = useState();
    const [orgChats, setOrgChats] = useState([1,2,3]); 
    const [orgsData, setOrgsData] = useState();
    const [selectedChat, setSelectedChat] = useState();

    useEffect(()=>{
        getUserOrgDetails();
    },[])

    const getUserOrgDetails = async ()=> {
        console.log(userDetails.uid);
        const {data} = await getUserOrg(userDetails.uid);
        const orgs = data.response.org_details;
        
        setUserOrgs(orgs);
        setSelectedOrg(0);
    }

    // const getOrgdetails = async (orgId)=> { 
    //     const {data} = await getOrgInfo(orgId);
    // }

    

    const getOrgChats = async (id)=> {
        const {data} = await getChatsForOrg(id);
        
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
        getChatsForOrg(userOrgs[i].org_id)
    }
    return (
        <div className="home" style={{display:'flex'}}>
            {userOrgs ? <div className="chat-container" style={{display:'flex'}}>
            { userOrgs.length && <> <div className="chat-left-pane" style={{display:'flex', flexDirection:'column', margin:'2em 1em', width:'13%', alignItems:'center' }}>
                <div style={{textDecoration:'underline'}}>Your Orgs</div>
                <div className="orgs-list" style={{ borderRight: '1px solid lightgrey', height:'100vh', paddingRight:'2em'}} >
                    {userOrgs.map((org,i) => <div onClick={()=>changeOrg(i)} style={{padding:'15px', margin:'10px', cursor:'pointer'}} className={`org-name`+ (i===selectedOrg ? ' --selected' :"")} >
                        {org.name}
                    </div>)}
                </div>
                {/* {selectedOrg!==null && <div className="users-list" style={{height:'100vh'}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {orgChats.map((e,i) => <ListElement/>)}
                    </List>
                </div>} */}
            </div>
            <div className="chat-right-pane" style={{width:'100%'}}>
                <Messages org = {userOrgs[selectedOrg]}></Messages>
            </div> </>}
            </div> : <CircularProgress/>}
        </div>
    )
}