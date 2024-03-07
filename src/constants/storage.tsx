import AsyncStorage from '@react-native-async-storage/async-storage';
const storage = {
    set: async (key: string, value: any) => {
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error: any) {
            console.error('AsyncStorage#setItem error: ' + error.message);
        }
    },
    get: async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            } else {
                console.log('Key not found');
            }
        } catch (e) {
            console.log('error reading value');
        }
    },
    remove: async (key: string) => {
        return await AsyncStorage.removeItem(key);
    },
};
export default storage;