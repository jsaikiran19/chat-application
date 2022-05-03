import { Alert, Avatar, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import './profile.scss';
import store from "../../store";
import { getProfileData, updateProfile } from "../../services/profile.service";

export function Profile() {

    const user = store.getState().userDetails;
    const [userDetails, setUserDetails] = useState({
        first_name:'',
        last_name:'',
        user_mail:'',
        phone_number:'',
        address:'',
        age:'',
    });
    const [alert, setAlert] = useState({ type: 'success', msg: '' })
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const {data} = await getProfileData(user.uid)
        console.log(data);
        }
        catch(e) {
            setAlert({ type: 'error', msg: e.message });
        }
        
    }

    const submit = async ()=> {
        const req = {first_name, last_name,phone, age, address};
        try {
            const {data} = await updateProfile(user, req);
            setAlert({type:'success',msg:'Details updated successfully'})
        }
        catch(e) {
            setAlert({type:'error',msg:e.message})
        }
        // setTimeout(()=>setAlert({msg:''}),3000);
        
    }

    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [user_mail, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [age, setAge] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [country, setCountry] = useState();
    const [weight, setWeight] = useState();
    const [height, setHeight] = useState();


    return (
        <div className="user-profile-container">
            {/* <Navbar></Navbar> */}
            
            { <div className="user-profile-form">
            {alert.msg && <Alert onClose={()=>setAlert({msg:''})} severity={alert.type}>{alert.msg}</Alert>}
                <Avatar sx={{ width: 75, height: 75 }}></Avatar>
                <p>Update Photo</p>
                <div className="text-inputs">
                    <div className="row">
                        <TextField  className="input-field" label="First Name" size="medium" variant='outlined' placeholder='First Name' onChange={(e)=>setFirstName(e.target.value)} value={user.first_name}></TextField>
                        <TextField  className="input-field" label="Last Name" size="medium" variant='outlined' placeholder='Last Name' onChange={(e)=>setLastName(e.target.value)} value={user.last_name}></TextField>
                    </div>
                    <div className="row">
                        <TextField  className="input-field" label="Email" size="medium" variant="outlined" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={user.user_mail}></TextField>
                        <TextField className="input-field" label="Phone" size="medium" variant="outlined" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} value={user.phone}></TextField>
                    </div>
                    {/* <div className="row">
                        <TextField className="input-field" label="Age" size="medium" variant="outlined" placeholder="Age" onChange={(e) => setAge(e.target.value)} value={user.age}></TextField>
                        <TextField className="input-field" label="Address" size="medium" variant="outlined" placeholder="Address" onChange={(e) => setAddress(e.target.value)} value={user.address}></TextField>
                    </div> */}
                    <Button variant="contained" size="large" onClick={()=>submit()}>
                        Save
                    </Button>
                </div>
            </div>}

        </div>
    )
}