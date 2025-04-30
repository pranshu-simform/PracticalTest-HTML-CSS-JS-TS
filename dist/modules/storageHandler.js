const storageHandler = {
    getStorage(key) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    },
    setStorage(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },
};
export default storageHandler;
