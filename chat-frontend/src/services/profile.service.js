import axios from '../axios';
export const getProfileData = (id) => {
    return axios.get(`/getUserProfile/${id}`);
}

export const updateProfile = (id, req) => {
    return axios.post(`/updateUserProfile`, req);
}