# Odin Hash Maps

## An Exercise in the Creation of Hash Maps

In an effort to solidify the concept of hash maps introduced during [The Odin Project](https://www.theodinproject.com/lessons/javascript-hashmap-data-structure), I am going to make my own following the material provided.

## What Is a Hash Map?

A hash map is a collection of buckets, optimally holding either 0 or 1 hash codes associated with a key/value pair of data.

- **Buckets**: Storage elements used to store our elements. They function like arrays. For a specific key, we decide which bucket to use for storage through our hash function.

This is possible due to the nature of the hashing process, where different parts of a string are converted to a set of numbers. This is done through a pure function that always outputs the same hash code for the same value. However, this is a one-way process.

For instance, taking an example from The Odin Project course, converting the name "Carlos Smith" to a hash could be done by returning the string index at the first letter of both the first and last names, outputting "CS".

Because of this, hashing is advantageous for security, as storing a password can be done in a hashed state rather than in plain text, enhancing security if the password is compromised.

We put these hash codes in their corresponding buckets with their key-value pairs as node items. This allows for efficient storage and retrieval operations.

The hash code effectively serves as the location index of the storage holding the data we want to store/retrieve, with the hash map being the collection of buckets assigned their hash codes as identifiers and holding some data each.

## Pros and Cons

Hash maps are great because they can safely and quickly store and retrieve sets and key/value pairs using comparison operations between hash codes. However, they have drawbacks:

### Insertion Order

- Hash maps usually don't guarantee insertion order when iterating over them.
- The translation of hash codes to indexes does not follow a linear progression from the first to last index.
- Some libraries implement hash tables with insertion order in mind, such as JavaScript's own map.

### Collisions

Collisions, or the generation of two identical hash codes, are another drawback, particularly as the scale of a hash map rises. While there will always be a finite number of buckets, collisions can be minimized.

#### Linked Lists

Leveraging the ease of breadth scaling of linked lists, we can transform the hash map into a two-dimensional data structure. Items are inserted into buckets, and if an item already exists, it is added to the end of the linked list. However, this may not be memory efficient.

## The Scalability Problem

Memory is finite, so it's important to scale the number of buckets as needed to avoid having too many unused buckets or too few buckets resulting in large linked lists.

Starting with an array size of 16 is appropriate, as it's a power of two, which can be leveraged for performance gains. As hash codes get bigger, sorting them into appropriate buckets can become burdensome. The modulo operator % can be used on a given number with 16 (or the number of active buckets) to maintain bucket numbering.

### Capacity and Load Factor

To deal with the growing number of hash codes, eventually scaling up the number of buckets available at any one time is necessary. The hash map class will need to keep track of the capacity and load factor of the hash map.

- **Capacity**: The total number of buckets.
- **Load Factor**: A number that determines when to grow the buckets.

[from The Odin Curriculum](https://www.theodinproject.com/lessons/javascript-hashmap-data-structure)

# Check It Out

To test this myself, I created my own implementation of the hash map data structure.
