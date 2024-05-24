class HashMap {
    constructor(size = 16) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => [])
    }

    hash(key) {
        let hashCode = 0;
        let primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.size;
    }
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                bucket[i] = [key, value]
                return;
            }
        }
        bucket.push([key, value]);
    }
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return storedValue;
            }
        }
        return null;

    }
    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index]

        for (let i = 0; i < bucket.length; i++) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                return true;
            }
        }
        return false;
    }
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index]
        let i = 0;
        while (i < bucket.length) {
            const [storedKey, storedValue] = bucket[i];
            if (storedKey === key) {
                bucket.splice(i, 1)
                return true
            }
            i++;
        }
        return false;
    }
    length() {
        let count = 0;
        for (let i = 0; i < this.buckets.length; i++) {
            count += this.buckets[i].length;
        }
        return count;
    }
    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = [];
        }
    }
    keys() {
        const keysArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                const [storedKey, storedValue] = bucket[j];
                keysArray.push(storedKey);
            }
        }

        return keysArray;
    }
    values() {
        let valuesArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                const [storedKey, storedValue] = bucket[j];
                valuesArray.push(storedValue);
            }
        }
        return valuesArray;
    }
    entries() {
        let valueKeyArray = [];
        for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let j = 0; j < bucket.length; j++) {
                const [storedKey, storedValue] = bucket[j]
                valueKeyArray.push([storedKey, storedValue])
            }
        }
        return valueKeyArray
    }

}


const hashMap = new HashMap();


hashMap.set("name", "Alice");
hashMap.set("age", 30);
hashMap.set("city", "New York");

// Get values by keys
console.log(hashMap.get("name")); // Should output: Alice
console.log(hashMap.get("age")); // Should output: 30
console.log(hashMap.get("city")); // Should output: New York

// Check if keys exist
console.log(hashMap.has("name")); // Should output: true
console.log(hashMap.has("country")); // Should output: false

// Remove a key-value pair
console.log(hashMap.remove("age")); // Should output: true
console.log(hashMap.get("age")); // Should output: null

// Get the length of the hash map
console.log(hashMap.length()); // Should output: 2 (since "age" was removed)

// Clear the hash map
hashMap.clear();
console.log(hashMap.length()); // Should output: 0


hashMap.set("language", "JavaScript");
hashMap.set("framework", "React");

// Get all keys
console.log(hashMap.keys()); // Should output: ["language", "framework"]

// Get all values
console.log(hashMap.values()); // Should output: ["JavaScript", "React"]

// Get all entries
console.log(hashMap.entries()); // Should output: [["language", "JavaScript"], ["framework", "React"]]
