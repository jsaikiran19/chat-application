import axios from '../axios';
import moment from 'moment';


export function setUserDetails(userDetails ) {
    const obj = {
        value: userDetails,
        start: new Date().toLocaleTimeString()
    }
    localStorage.setItem('userDetails', JSON.stringify(obj));
}

export function getUserDetails()  {
    const { value, start } = JSON.parse(localStorage.getItem('userDetails') || '{"value":"","start":""}');
    const end = moment(new Date().toLocaleTimeString(),'HH:mm:ss a');
    const duration = moment.duration(end.diff(moment(start, 'HH:mm:ss a')));

    // duration in hours
    const hours = (duration.asHours());
    if(!value || (0 >hours || hours >1) ) {
        localStorage.setItem('userDetails','');
        return {};
    }
    console.log(hours);
    return value;
}

export const signUp = (user ) => {
    return axios.put('/userRegistration', user);
}

export const login = (username , password ) => {
    return axios.post('/loginUser', { user_mail:username, password });
}

export const forgot = (username ) => axios.post('/api/authnew/forgot', {
    email:username
});

export const getOrgInfo = (id) => axios.get(`/getOrg/${id}`);

export const getChatsForOrg = (id)=> axios.get('');


export const getOrgLevelUsers = (id) => axios.get(`/getOrgLevelUsers/${id}`);

export const getUserOrg = (id)=> {
    return axios.get(`getUserOrgDetails/${id}`)};


export const getChatsBetweenUsers = (req) => axios.post(`/getMessages`,req);

export const putMessages = (req) => axios.put(`/putMessages`,req);

export const getLatestMessage = (req) => axios.post(`/getMessages`,{...req,is_meta:"1"});