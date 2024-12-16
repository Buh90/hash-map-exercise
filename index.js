class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class HashMap {
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.capacity = this.buckets.length;
    this.keysAmount = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  set(key, value) {
    this.resize();
    const bucket = this.hash(key);
    if (this.buckets[bucket] == null) {
      const newNode = new Node(key, value);
      this.buckets[bucket] = newNode;
      this.keysAmount++;
    } else {
      let current = this.buckets[bucket];
      while (current != null) {
        if (current.key == key) {
          current.value = value;
          return;
        } else {
          if (current.next == null) {
            current.next = new Node(key, value);
            this.keysAmount++;
            return;
          } else {
            current = current.next;
          }
        }
      }
    }
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    } else {
      const bucket = this.hash(key);
      let current = this.buckets[bucket];
      while (current.key != key) {
        current = current.next;
      }
      return current.value;
    }
  }

  has(key) {
    const bucket = this.hash(key);
    if (this.buckets[bucket] != null) {
      let current = this.buckets[bucket];
      while (current != null) {
        if (current.key == key) {
          return true;
        }
        current = current.next;
      }
      return false;
    }
    return false;
  }

  remove(key) {
    const bucket = this.hash(key);
    let current = this.buckets[bucket];
    let previous = null;

    if (!this.has(key)) {
      return false;
    } else {
      while (current.key != key) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
      current = null;
      this.keysAmount--;
      return true;
    }
  }

  length() {
    return this.keysAmount;
  }

  clear() {
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i] = null;
    }
    this.keysAmount = 0;
  }

  keys() {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let current = this.buckets[i];
        while (current != null) {
          console.log(current.key);
          current = current.next;
        }
      }
    }
  }

  values() {
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let current = this.buckets[i];
        while (current != null) {
          console.log(current.value);
          current = current.next;
        }
      }
    }
  }

  entries() {
    let entriesArray = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i]) {
        let current = this.buckets[i];
        while (current != null) {
          let currentEntrie = [current.key, current.value];
          entriesArray.push(currentEntrie);
          current = current.next;
        }
      }
    }
    return entriesArray;
  }

  resize() {
    if (this.length() >= this.capacity * this.loadFactor) {
      this.capacity *= 2;
      let currentEntries = this.entries();
      this.clear();
      for (let entrie of currentEntries) {
        this.set(entrie[0], entrie[1]);
      }
    }
  }

  checkIndexValidity(index) {
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }
}

// const test = new HashMap();

// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// test.set("moon", "silver");
