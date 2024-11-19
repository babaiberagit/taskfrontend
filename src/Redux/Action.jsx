export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
});

export const setUserId = (userId) => ({
    type: 'SET_USERID',
    payload: userId,
});

export const logout = () => ({
    type: 'LOGOUT',
});
