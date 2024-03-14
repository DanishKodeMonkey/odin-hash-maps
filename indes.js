class HashMap {
	constructor(capacity = 16) {
		// Establish a hash map with the given number of buckets to start. (default 16)
		// And fill each bucket with the value null. (it's empty so...)
		this.buckets = new Array(capacity).fill(null)
	}

	checkIndex(index) {
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access an index out of bounds...' + index)
		}
	}
	// method for generating a hash from a given key
	hash(key) {
		let hashCode = 0

		// leverage the use of a prime number in generation of hash to minimize
		// identical hashes due to similar inputs, (E.g Sara vs. araS)
		const primeNumber = 31
		// For each character of the given key, generate part of the hash code
		for (let i = 0; i < key.length; i++) {
			hashCode =
				// Multiply by prime number for account for similar inputs
				// apply the key to the hashcode
				// modulus the key by the buckets length, to compress the final key.
				(primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length
		}
		// return finished hashCode.
		return hashCode
	}

	// method to assign a value to a key, if key exist, overwrite.
	set(key, value) {
		// Create a index key from the provided key
		const index = this.hash(key)
		// See if the index key matches any bucket, if not.
		if (!this.buckets[index]) {
			// make a new Linked list
			this.buckets[index] = new LinkedList()
		}
		// Add a new node to the linked list, containing the node with the key,value pair.
		this.buckets[index].append(new Node(key, value))
	}
}

// To acommidate possible collisions somewhat, we leverage what we learned from linked arrays
// to turn the hash map into a 2 dimensional data structure! (big words!)
// this time using a somewhat simpler take of the linked list.
class LinkedList {
	constructor(head = null) {
		this.head = head
	}

	// Method for appending a new value into the linked list.
	append(data) {
		let newNode = new Node(data)
		if (!this.head) {
			this.head = newNode
		}
		let currentNode = this.head
		while (currentNode.next) {
			currentNode = currentNode.next
		}
		if (currentNode.next === null) {
			currentNode.next = newNode
		}
	}

	// Method for returning the size of the linked list.
	size() {
		let count = 0
		let currentNode = this.head
		while (currentNode) {
			count++
			currentNode = currentNode.next
		}
		return count
	}

	// Determine if a value can be found in a linked list.
	contains(value) {
		let currentNode = this.head

		while (currentNode) {
			if (currentNode.data === value) return true
		}
		return false
	}
}

class Node {
	constructor(key, value) {
		this.key = key
		this.value = value
		this.next = null
	}
}

let map = new HashMap()
console.log(map)

map.set('timmy', 'turner')
map.set('timmy', 'Taylor')
console.log(map)

console.log(hash1)
