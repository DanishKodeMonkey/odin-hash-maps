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

		// check if key is valid
		this.checkIndex(index)

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

		// check index key
		this.checkIndex(index)

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

	// method removes linked list from hash map from given key(string), returns true if found and removed
	// false if not found and passed.
	remove(key) {
		console.log(`remove(${key}) triggered...`)
		// generate has key from string
		let index = this.hash(key)

		// check index key
		this.checkIndex(index)

		console.log('Hash key generated, searching...')
		// If key is not found.
		if (!this.buckets[index]) {
			console.log(key + ' not found in buckets')
			// make a new Linked list
			return false
		}
		console.log('Key found in: ' + this.buckets[index])
		console.log('Removing...')
		this.buckets[index].head = null
		console.log(`Operation done, result: `)
		console.log(this.buckets[index])
	}
	// method returns the number of stored keys in the hash map
	length() {
		console.log('Length() triggered')
		let count = 0

		for (let i = 0; i < this.buckets.length; i++) {
			console.log(`Bucket ${i}: ${this.buckets[i]}`)
			if (!this.buckets[i]) {
				console.log(`Bucket ${i} is empty, skipping...`)
				continue
			}
			let currentNode = this.buckets[i].head
			console.log(`Head of linked list in bucket ${i}: ${currentNode}`)

			while (currentNode) {
				console.log(`Counting in Bucket ${i}`)
				count += 1
				currentNode = currentNode.next
				console.log(count)
			}
		}
		return count
	}

	// method for nuking the lists in the buckets.
	clear() {
		console.log('clear() triggered, nuking some buckets!')

		for (let i = 0; i < this.buckets.length; i++) {
			if (!this.buckets[i]) {
				console.log(`Bucket ${i} is empty, and will be spared...`)
				continue
			}
			let currentNode = this.buckets[i].head
			console.log(
				`Head of linked list found in bucket ${i}: ${currentNode} ... NUKING!`
			)
			this.buckets[i] = null
			console.log(`Kaboom... Bucket ${i}: ${this.buckets[i]}`)
		}
		console.log(`Operation complete, scanning for survivors...`)
		this.length()
	}
	// method returning all keys of the hashmap
	keys() {
		console.log('keys() triggered, fetching keys...')
		let keys = []

		for (let i = 0; i < this.buckets.length; i++) {
			if (!this.buckets[i]) {
				console.log(`Bucket ${i} is empty...`)
				continue
			}
			let currentNode = this.buckets[i].head
			console.log(`Head of linked list in bucket ${i}: ${currentNode}`)

			while (currentNode) {
				console.log(`Key found in Bucket ${i}`)
				keys.push(currentNode.key)
				currentNode = currentNode.next
				console.log(`now have ${keys} keys!`)
			}
		}
		return keys
	}

	// method returning an array of all values in hashmap
	values() {
		console.log('values() triggered, fetching values...')
		let values = []

		for (let i = 0; i < this.buckets.length; i++) {
			if (!this.buckets[i]) {
				console.log(`Bucket ${i} is empty...`)
				continue
			}
			let currentNode = this.buckets[i].head
			console.log(`Head of linked list in bucket ${i}: ${currentNode}`)

			while (currentNode) {
				console.log(`Key found in Bucket ${i}`)
				values.push(currentNode.value)
				currentNode = currentNode.next
				console.log(`now have ${values} keys!`)
			}
		}
		return values
	}

	// method returning an array containing each key,value pair in hashmap
	entries() {
		// final array holding all key, value pairs
		let arr = []

		for (let i = 0; i < this.buckets.length; i++) {
			if (!this.buckets[i]) {
				console.log(`Bucket ${i} is empty...`)
				continue
			}
			let currentNode = this.buckets[i].head

			console.log(`Head of linked list in bucket ${i}: ${currentNode}`)

			while (currentNode) {
				console.log(`Key found in Bucket ${i}`)
				arr.push([currentNode.key, currentNode.value])
				console.log(`Array progress: ${arr}`)
				currentNode = currentNode.next
			}
		}
		console.log('sending array')
		console.log(arr)
		return arr
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
				console.log(currentNode + '.next is true, iterating...')
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

console.log(map.entries())
