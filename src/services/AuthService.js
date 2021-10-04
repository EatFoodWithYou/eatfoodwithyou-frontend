import Axios from 'axios';

const auth_key = 'auth-shop';
let auth = JSON.parse(localStorage.getItem(auth_key));
const user = auth ? auth.user : '';
const jwt = auth ? auth.jwt : '';
const api_endpoint = process.env.VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000' ;

export default {
    isAuthen() {
        return user !== '' && jwt !== '';
    },
    getApiHeader() {
        if (jwt !== '') {
            return {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
        }
        return {};
    },
    getUser() {
        return user;
    },

    getJwt() {
        return jwt;
    },
    async login({ email, password }) {
        try {
            console.log(api_endpoint);
            let url = api_endpoint +'/api/auth/login';
            console.log(url);
            let body = {
                email : email,
                password: password,
            };
            console.log(body)
            let res = await Axios.post(url, body);
            
            console.log(res)
            if (res.status === 200) {
                // console.log(res.data);
                localStorage.setItem(auth_key, JSON.stringify(res));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token,
                };
            } else {
                console.log('NOT 200', res);
            }
        } catch (e) {
            console.error(e);
            if (e.response.status === 400) {
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                };
            }
        }
    },

    async register({email, password, firstname, lastname ,gender, role ,age }) {
        try {
            let url = `${api_endpoint}/api/auth/register`;
            let body = {
                email: email,
                password: password,
                name: firstname + " " + lastname ,
                age : age ,
                gender : gender ,
                role : role
            };

            console.log(body);
            let res = await Axios.post(url, body);
            if (res.status === 201) {
                localStorage.setItem(auth_key, JSON.stringify(res.data));
                return {
                    success: true,
                    user: res.data.user,
                    jwt: res.data.access_token,
                };
            } else {
                console.log('NOT 200', res);
            }
        } catch (e) {
            if (e.response.status === 400) {
                // console.log(e.response.data.message[0].messages[0].message);
                return {
                    success: false,
                    message: e.response.data.message[0].messages[0].message,
                };
            } else {
                return;
            }
        }
    },

    async logout() {
        localStorage.removeItem(auth_key)
    },

    

    async fetchUser({ id }) {
        let url = api_endpoint + '/users/' + id;
        let header = this.getApiHeader();
        let res = await Axios.get(url, header);
        return res.data;
    },
};

// export const
