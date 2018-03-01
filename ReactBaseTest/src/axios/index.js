
import axios from 'axios';
import { get } from './tools';
import * as config from './config';
import { message } from 'antd'

const httpPostBase = (url, param) =>
    axios.post(url, param, { headers: { Accept: 'application/json' }, responseType: 'json' });

const httppost = (url, param) => {
    let hide = message.loading('正在执行中...', 0);
    return httpPostBase(url, param)
        .then(res => { hide(); return res.data; })
        .catch(err => { hide(); console.log(err); });
}

const httpget = (url) => {
    let hide = message.loading('正在执行中...', 0);
    return axios.get(url)
        .then(res => { hide(); return res.data; })
        .catch(err => { hide(); console.log(err); });
}

const redirect = (url) => {
    const w = window.open(url);
    //w.location.href = url;
}

//postdata start
//getdata
export const fetch = {
   
};

export const goPage = {
};

//utils
export const httpUtil = {
    getResult: response => {
        var result = { data: null, success: false, msg: '请求失败' };
        if (!!response) {
            if (!!response.success) {
                result = response;
            } else {
                if (!!response.msg) {
                    result.msg = response.msg;
                }
            }
        }
        return result;
    }
}

/*
export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

export const npmDependencies = httpget('./npm.json')
export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {
    ...{
        client_id: '792cdcd244e98dcd2dee',
        client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'
    }, code: code
}, { headers: { Accept: 'application/json' } })
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({ url: config.MOCK_AUTH_ADMIN });

// 访问权限获取
export const guest = () => get({ url: config.MOCK_AUTH_VISITOR });
*/
