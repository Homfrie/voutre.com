import store from 'store';

export default {
  set: (key, val, exp) => {
    store.set(key, { val:val, exp:exp, time: new Date().getTime() });
  },
  get: key => {
    const info = store.get(key);
    if(!info) 
      return null;

    if (new Date().getTime() - info.time > info.exp)
      return store.set(key, null);

    return info.val;
  }
};
