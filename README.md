# Structural Design Patterns in TypeScript  

This repository contains small and clear code examples of Structural Design Patterns written in TypeScript with comments.  

Structural patterns explain how objects and classes can work together to build flexible and easy-to-maintain programs.  
They do not focus on how objects are created (that’s Creational patterns) or how they communicate (that’s Behavioral patterns).  
Instead, they show how to organize parts of the system into a structure.  


# Introduction to Structural Design Patterns

Structural Design Patterns are design patterns that focus on how classes and objects are connected together.

They help us build software that is:
  1) easy to understand
  2) flexible to change
  3) organized in structure


Unlike:
  Creational patterns → which deal with how objects are created.
  Behavioral patterns → which deal with how objects communicate.
 
 
 Structural patterns mainly answer the question:
“How can I connect different parts of my system so they work well together?”

They often use composition (putting objects inside other objects) and interfaces to create larger structures without making the code too complex.


Examples in real life:
A remote control works with different TV brands (Bridge).
A power adapter connects devices with different plugs (Adapter).
A gift wrapper adds decoration to a gift without changing the gift itself (Decorator).
Structural patterns are very important in large applications because they make code clean, reusable, and easier to maintain.


---

## 📖 List of Structural Design Patterns


### 1. Adapter  
#### Idea  
Works like a "translator". It makes one class fit with another class, even if their interfaces are different.  

#### Problem it solves  
Sometimes old code and new code don’t match. Instead of changing them, we use an adapter to connect them.  

#### Example in real life  
A power adapter lets you plug a European device into an American socket.  

#### When to use  
- You want two incompatible systems to work together.  
- You don’t want to rewrite old code.  

---

### 2. Bridge  
#### Idea  
Separates the main idea (abstraction) from how it is done (implementation).  

#### Problem it solves  
If you mix abstraction and implementation in one place, it becomes hard to change or extend.  

#### Example in real life  
A TV remote (abstraction) controls different TVs (implementations). The remote doesn’t care which TV brand it is.  

#### When to use  
- You want to switch implementations easily.  
- You need different combinations of abstractions and implementations.  

---

### 3. Composite  
#### Idea  
Lets you work with a group of objects as if it was a single object.  

#### Problem it solves  
Sometimes you have tree structures (like files and folders) and you want to treat leaf objects and whole groups in the same way.  

#### Example in real life  
A folder can contain files or more folders. Both are treated the same way (open, delete, etc.).  

#### When to use  
- You have tree-like structures.  
- You want to use the same methods for both single objects and groups.  

---

### 4. Decorator  
#### Idea  
Adds new behavior to an object without changing its original code.  

#### Problem it solves  
If you keep adding new features into a class, it becomes too large and hard to maintain.  

#### Example in real life  
Wrapping a gift. The gift stays the same, but the wrapper (decorator) adds extra style.  

#### When to use  
- You want to add features dynamically.  
- You want to avoid creating too many subclasses.  

---

### 5. Facade  
#### Idea  
Gives a simple interface to a very complex system.  

#### Problem it solves  
Large systems often have many classes and methods. Using them directly can be confusing.  

#### Example in real life  
A TV remote control is a facade. Instead of pressing many buttons on the TV itself, you use a simple remote interface.  

#### When to use  
- You want to make a complex system easier to use.  
- You want to hide complexity from the user.  

---

### 6. Flyweight  
#### Idea  
Reuses shared objects instead of creating new ones all the time. Saves memory and improves speed.  

#### Problem it solves  
Creating thousands of similar objects takes a lot of memory.  

#### Example in real life  
A text editor doesn’t create a new object for every letter “a”. Instead, it reuses the same “a” object many times.  

#### When to use  
- You have many similar objects.  
- Memory use is very high.  

---

### 7. Proxy  
#### Idea  
Acts like a middleman between a client and a real object. It controls access to the object.  

#### Problem it solves  
Sometimes you don’t want to access an object directly (maybe it’s slow, or private, or far away).  

#### Example in real life  
A credit card is a proxy for your bank account. You don’t give your bank account directly to the store.  

#### When to use  
- You want to control access to an object.  
- You want extra actions (logging, caching, security checks) before reaching the real object.  




