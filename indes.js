class HashMap {
	constructor(capacity = 16, loadFactor = 0.75) {
		// Establish a hash map with the given number of buckets to start. (default 16)
		// And fill each bucket with the value null. (it's empty so...)
		this.buckets = new Array(capacity).fill(null)
		this.loadFactor = loadFactor
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
		console.log('set triggered')
		// Create a index key from the provided key
		const index = this.hash(key)
		console.log('Index key generated: ' + index)
		// See if the index key matches any bucket, if not.
		if (!this.buckets[index]) {
			console.log(index + ' not found in buckets')
			// make a new Linked list
			this.buckets[index] = new LinkedList()
			console.log(this.buckets)
		}
		// Add a new node to the linked list, containing the node with the key,value pair.
		console.log('appending ' + this.buckets[index] + ' with new node')
		this.buckets[index].append(key, value)
		console.log(this.buckets[index])
	}

	// method that returns the value assigned to the key, if key is not found return null. key -> string
	get(key) {
		console.log(`get(${key}) triggered`)
		// generate hash key.
		const index = this.hash(key)

		// if no buckets contain a list with given key
		if (!this.buckets[index]) return null

		return this.buckets[index]
	}
	// method returns true or false if key exists in hash map. Key -> string
	has(key) {
		console.log(`has(${key}) triggered`)

		// generate hash key
		const index = this.hash(key)

		if (!this.buckets[index]) return false

		return true
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
	append(key, value) {
		console.log('Linked list append() triggered')
		let newNode = new Node(key, value)
		console.log('Node generated: ' + newNode)
		if (!this.head) {
			console.log(newNode + ' is the first node, setting to head.')
			this.head = newNode
		} else {
			console.log(newNode + ' is not first node, appending to linked list...')
			let currentNode = this.head
			console.log('Checking for head in ' + currentNode)
			while (currentNode.next) {
				console.log(currentNode + '.next is true, itterating...')
				currentNode = currentNode.next
				console.log('new currentNode ' + currentNode)
			}
			console.log('Found end of linked list, appending...')
			currentNode.next = newNode
			console.log(newNode)
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
			if (currentNode.value === value) return true
			console.log(currentNode)
			currentNode = currentNode.next
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
console.log(map.get('timmy'))
console.log(map.has('timmy'))
console.log(map.has('tommy'))
