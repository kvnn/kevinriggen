---
title: Fluent Python notes
layout: post
---
These are my notes on "Fluent Python" by Luciano Ramalho.

#Chapter 1. The Python Data Model
- the data model formalizes the interfaces of the building blocks of the language (sequences, iterators, functions, classes, context managers, etc)

> "...len(collection) instead of collection.len(). This apparent oddity is the tip of an iceberg that, when properly understood, is the key to everything we call *Pythonic*. The iceberg is called the Python data model, and it describes the API that you can use to make your own objects play well with the most idiomatic language features.

> "For example, the syntax obj[ key] is supported by the __getitem__ special method. In order to evaluate my_collection[ key], the interpreter calls my_collection.__getitem__( key).

- "experienced Pythonistas" use the term "dunder method" to refer to methods like __getitem__, and would pronounce it "dunder-getitem"

![Fluent Python example 1-1]({{ site.url }}/img/fluent-python/ex1-1.png)

- namedtuple can be used to build classes of objects that are just bundles of attributes with no custom methods, like a database record
- defining __len__ for FrenchDeck means that after you create an instance you can use utilize the data model's standard len(deck_instance)
- defining __getitem__ means that you can utilize deck_instance[-1] or deck_instance[0], etc
- since FrenchDeck has __len__ and __getitem__ methods, it can utilize Python's built-in methods for sequences, like random.choice: `random.choice(deck)` will return a random item from deck._cards
- just by implementing __getitem__, our deck now supports slicing, iteration sorting, `Card('Q', 'hearts') in deck`, etc.
- "The only special method that is frequently called by user code directly is __init__, to invoke the initializer of the superclass in your own __init__ implementation"
- Example 1-2 is a *Vector Class* that utilizes __repr__, __abs__, __bool__, __add__ and __mul__ to support Python's built-in number methods

![Fluent Python table 1-1]({{ site.url }}/img/fluent-python/table1-1.png)
![Fluent Python table 1-2]({{ site.url }}/img/fluent-python/table1-2.png)
![Fluent Python table 1-2 cont'd]({{ site.url }}/img/fluent-python/table1-2-contd.png)

**Conclusion:** "By implementing special methods, your objects can behave like the built-in types, enabling the expressive coding style the community considers Pythonic."
    
    
#Chapter 2. An Array of Sequences
- "Strings, lists, byte sequences, arrays, XML elements, and database results share a rich set of common operations including iteration, slicing, sorting, and concatenation"
- "Understanding the variety of sequences available in Python saves us from reinventing the wheel, and their common interface inspires us to create APIs that properly support and leverage existing and future sequence types."

- **container sequences**
    - hold items of different types
    - e.g. list, tuple, collections.deque
    - hold references to the containing objects

- **flat sequences**
    - hold items of one type
    - e.g. str, bytes, bytearray, memoryview, array.array
    - physically store the value of each item in their own memory space

- *mutable sequences*: list, bytearray, array.array, collections.deque, memoryview
- *immutable sequences:* tuple, str, bytes
- list comprehensions are *more explicit* than for-loop constructs, because list comprehensions are meant to do only one thing
- "Listcomps do everything the map and filter functions do, without the contortions of the functionally challenged Python lambda"

**Generator Expressions**
    
- similar to list expressions for building tuples, arrays and other types of sequences
- e.g. `tuple(ord(symbol) for symbol in symbols)`
- use the same syntax as listcomps, but are enclosed in parentheses rather than brackets

**Tuples**

- Not just "immutable lists"
- can be used also as records with no field names
- "each item in the tuple holds the data for one field and the position of the item gives its meaning"
- "when using a tuple as a collection of fields, the number of items is often fixed and their order is always vital"
- *"Tuples work well as records because of the tuple unpacking mechanism"*
- collections.namedtuple is a factory that produces subclasses of *tuple* enhanced with field names, a class name and some extra attributes / methods
    
**Tuple unpacking allows you to:**

- elegantly swap values w/o a temporary variable: `b, a = a, b`
- prefixing an argument with a star when calling a function: `t = (2, 4)` ; `add(*t)`
- grabbing excess items in Python 3: a, *body, c, d = range( 5)
- perform nested tuple unpacking: `for name, cc, pop, (latitude, longitude) in metro_areas:` will give access to *latitude* and *longitude* as individual values of a tuple inside of metro_areas

** Slicing **
    
- slicing operations "are more powerful than most people realize"
- slice and range exclude the last item
    - "It’s easy to see the length of a slice or range when only the stop position is given: range( 3) and my_list[: 3] both produce three items"
    - "It’s easy to compute the length of a slice or range when start and stop are given: just subtract stop - start"
    - "It’s easy to split a sequence in two parts at any index x, without overlapping: simply get my_list[: x] and my_list[ x:]"
- case: s[ a:b:c] can be used to specify a stride or step c, causing the resulting slice to skip items
    - 'bicycle'[::3] => 'bye'
    - 'bicycle'[::-1] => 'elcycib'
    - 'bicycle'[::-2] => 'eccb'
- "Mutable sequences can be grafted, excised, and otherwise modified in place using slice notation on the left side of an assignment statement or as the target of a del statement" : 
    - l = range(10)
    - l[2:5] = [20, 30] 
    - l is now [0, 1, 20, 30, 5, 6, 7, 8, 9]
    - del l[5:7]
    - l is now [0, 1, 20, 30, 5, 8, 9]

** Sorting **

- "functions or methods that change an object in place should return None to make it clear that the object itself was changed, and no new object was created"
- *list.sort* sorts a list in-place and returns None
- *sorted* accepts any iterable object, creates a new *list* and returns it
- *bisect( haystack, needle)* does a binary search for needle in haystack — which must be a sorted sequence - to locate the position where needle can be inserted while maintaining haystack in ascending order.
    - "An interesting application of bisect is to perform *table lookups by numeric values* - for example, to convert test scores to letter grades"
![example 2-18]({{site-url}}/img/fluent-python/ex2-18.png)
- Sorting is expensive, so once you have a sorted sequence, it’s good to keep it that way. That is why *bisect.insort* was created.
- insort(seq, item) inserts item into seq so as to keep seq in ascending order
    

*List Replacements*
    
- If the list will only contain numbers, an array.array is more efficient
- The built-in memoryview class is a shared-memory sequence type that lets you handle slices of arrays without copying bytes
    -"A memoryview is essentially a generalized NumPy array structure in Python itself (without the math). It allows you to share memory between data-structures (things like PIL images, SQLlite databases, NumPy arrays, etc.) without first copying. This is very important for large data sets."
- collections.deque is a thread-safe double-ended queue designed for fast inserting and removing from both ends (its expensive to move left-sided items from a list)
- It is also the way to go if you need to keep a list of “last seen items” or something like that, because a deque can be bounded — i.e., created with a maximum length — and then, when it is full, it discards items from the opposite end when you append new ones.


# Chapter 3. Dictionaries and Sets
- the *dict* type is a fundamental part of Python: module namespaces, class and instance attributes and function keyword arguments use them
- *hash tables* are the engines behind dicts and sets

*Methods of the mapping types* dict, collections.defaultdict and collections.OrderedDict; optional arguments are enclosed in [...]
![table 3-1]({{site-url}}/img/fluent-python/table3-1.png)
![table 3-1]({{site-url}}/img/fluent-python/table3-1-contd.png)

> "The way update handles its first argument m is a prime example of duck typing: it first checks whether m has a keys method and, if it does, assumes it is a mapping. Otherwise, update falls back to iterating over m, assuming its items are (key, value) pairs."

- *setdefault* is convenient if you want to update the value of a key that may not exists yet: `books.setdefault('sci-fi', []).append('anathem')`
- the *defaultdict* class or a mapping-type class with `__missing __` overridden are other ways to handle missing keys in a mapping object

# To be continued...