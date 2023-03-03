//#region 
/*
The code defines a TypeScript class called "StorageUtil" with two static methods. 
The first method called "storageSave" saves a value to the browser's sessionStorage using a key. 
The second method called "storageRead" retrieves a value from sessionStorage using a key. 
It returns the value if it exists, or undefined if it does not. 
The methods use JSON.stringify() and JSON.parse() to convert the value to and from a string. 
If there's an error parsing the stored value, it removes the value from sessionStorage and returns undefined.
*/
//#endregion

export class StorageUtil {

    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
    
            if (storedValue) {
                return JSON.parse(storedValue) as T;
            }
            
            return undefined;
        }
        catch(e) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    }
}


