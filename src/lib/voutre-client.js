import config from '../config';

import axios from 'axios';

export const authorize = (provider, code) => {
  return axios.post(`${config.apiUrl}/auth/${provider}/callback`, {
    code
  });
};

export const fetchSets = (token, {query, id}) => {
  const url = id || "";
  return axios({
    url: `${config.apiUrl}/sets/${url}`,
    method: 'get',
    params: {
      q: query
    },
    headers: {'Authorization': `Bearer ${token}`}
  });
};

export const saveSet = (token, {id, name}) => {
  const method = id ? 'put' : 'post';
  const url = id || "";
  return axios({
    url: `${config.apiUrl}/sets/${url}`,
    method,
    data: {
      set: { name }
    },
    headers: {'Authorization': `Bearer ${token}`}
  });
};

export const saveCard = (token, {id, setId, front, back}) => {
  const method = id ? 'put' : 'post';
  const url = id || "";
  return axios({
    url: `${config.apiUrl}/sets/${setId}/cards/${url}`,
    method,
    data: {
      card: { front, back }
    },
    headers: {'Authorization': `Bearer ${token}`}
  });
};

export const fetchCard = (token, {setId, id}) => {
  return axios({
    url: `${config.apiUrl}/sets/${setId}/${id}`,
    method: 'get',
    headers: {'Authorization': `Bearer ${token}`}
  });
};


