import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import './profile.scss';

import { getProfileData, updateProfile } from '../../../services/profile.service';
import store from '../../../store';

export function Profile({ id, info  }) {
    const [details, setDetails] = useState();
    const [color, setColor] = useState("primary");
    const user = store.getState().userDetails;
    useEffect(() => {
        getData();
    }, [id])

    const subscribeProf = async ()=> {
        const plans_enrolled = [...info.customer_info.plans_enrolled]
        plans_enrolled.push(id);
        
        // customer_info.customer_enrolled.push(user);
        
        const {data} = await updateProfile(user, {professionals_enrolled:plans_enrolled});
        setColor("success");
        console.log(data);

    }

    const getData = async () => {
        const { data } = await getProfileData(id);
        console.log(data)
        setDetails(data.response);
    }

    return (
        <div className="professional-profile" style={{padding:'1em'}}>

            {details ? <div className="profile-container">
                <div className="avatar">
                    <Avatar style={{ width: 50, height: 50, margin: '1em' }} alt={details.first_name?.toUpperCase()}></Avatar>

                    <div className='name-info' style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
                        <div className='profile-name'>{details.first_name+" "+details.last_name}</div>
                        <div className='status' style={{marginTop:'10px'}}>{details.status}</div>
                    </div>
                </div>


                
            </div> : <CircularProgress style={{ margin: 'auto' }} />}

        </div>
    )
}