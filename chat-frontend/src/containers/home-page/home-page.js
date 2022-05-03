import store from "../../store";
import { getUserOrg, getUserDetails, getChatsForOrg } from "../../services/user.service"
import React from "react";
// import ListItemText from "@mui/material/ListItemText";
// import Avatar from "@mui/material/Avatar";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import List from "@mui/material/List";
import { useState, useEffect } from 'react';
import './home-page.scss';
import { Messages } from "../../components/messages/messages";
import { CircularProgress, Tab, Tabs } from "@mui/material";
// import { useNavigate } from "react-router";

export function Home() {
    const userDetails = store.getState().userDetails || getUserDetails();

    const [userOrgs, setUserOrgs] = useState()
    const [selectedOrg, setSelectedOrg] = useState(0);
    // const [orgUsers, setOrgUsers] = useState();
    // const [orgChats, setOrgChats] = useState([1, 2, 3]);
    // const [orgsData, setOrgsData] = useState();
    // const [selectedChat, setSelectedChat] = useState();
    
    useEffect(() => {
        getUserOrgDetails();
    }, [])

    const getUserOrgDetails = async () => {
        console.log(userDetails.uid);
        const { data } = await getUserOrg(userDetails.uid);
        const orgs = data.response.org_details;

        setUserOrgs(orgs);
        setSelectedOrg(0);
    }


    const changeOrg = (i) => {
        setSelectedOrg(i);
    }
    return (
        <div className="home" style={{ display: 'flex' }}>
            {userOrgs ? <div className="chat-container" style={{ display: 'flex' }}>

                {userOrgs.length && <> <div className="chat-left-pane" style={{ display: 'flex', borderRight: '1px solid lightgrey', flexDirection: 'column', margin: '2em 1em', width: '13%', alignItems: 'center' }}>


                    <div style={{ margin: '1em' }}>
                        <Tabs value="0">
                            <Tab label="Your Orgs" color="primary" value="0"></Tab>
                        </Tabs>
                    </div>
                    <div className="orgs-list" style={{ height: '100vh' }} >
                        {userOrgs.map((org, i) => <div onClick={() => changeOrg(i)} style={{ padding: '15px', margin: '10px', cursor: 'pointer' }} className={`org-name` + (i === selectedOrg ? ' --selected' : "")} >
                            {org.name}
                        </div>)}
                    </div>
                    {/* {selectedOrg!==null && <div className="users-list" style={{height:'100vh'}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {orgChats.map((e,i) => <ListElement/>)}
                    </List>
                </div>} */}
                </div>
                    <div className="chat-right-pane" style={{ width: '100%' }}>
                        { selectedOrg!==undefined && <Messages org={userOrgs[selectedOrg]}></Messages>}
                    </div> </>}
            </div> : <CircularProgress />}
        </div>
    )
}