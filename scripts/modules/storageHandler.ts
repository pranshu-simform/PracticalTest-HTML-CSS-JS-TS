interface StorageHandler{
  getStorage: <T>(key: string)=>T,
  setStorage: <T>(key: string,val: T)=>void,
}

const storageHandler: StorageHandler = {
    getStorage(key:string) {
      return localStorage.getItem(key)? JSON.parse(localStorage.getItem(key)!) : [];
    },
  
    setStorage(key:string, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },
};

export default storageHandler;