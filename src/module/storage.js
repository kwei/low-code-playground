import { env } from '../../env';

export const Storage =() => {
    const setStorage = (key, value) => {
        localStorage.setItem(key, value);
    };

    const getStorage = (key) => {
        return localStorage.getItem(key);
    };

    const removeStorage = (key) => {
        localStorage.removeItem(key);
    };

    const clearStorage = () => {
        localStorage.clear();
    };

    return {
        setStorage, getStorage, removeStorage, clearStorage
    };
};