/*
Online Game Map Example using Flyweight Pattern

Flyweight Design Pattern:
- Flyweight is a structural design pattern used to reduce memory usage.
- It allows sharing of common (intrinsic) state between multiple objects while passing unique (extrinsic) state at runtime.
- This is useful in games or applications with many repeated objects (e.g., trees, tiles, particles).

Key Concepts:
1. Intrinsic State (shared):
   - Stored inside the Flyweight object.
   - Example: tree type ("Oak", "Pine"), color ("Green", "Dark Green").

2. Extrinsic State (unique):
   - Supplied by the client during method calls.
   - Example: position (x, y) on the map.

3. Flyweight Factory:
   - Creates and manages shared objects.
   - Returns an existing object if one already exists; otherwise, creates a new one.
   - In this example, the factory uses a JavaScript Map() instead of a plain object {}.
     Map() is chosen because:
       • It provides cleaner and more efficient key–value management.
       • Keys can be any type (not just strings).
       • Built-in methods like has(), get(), and set() improve readability.

Benefits:
- Saves memory by reusing objects with the same intrinsic state.
- Separates shared data (intrinsic) from unique data (extrinsic).
- Client code uses objects as usual, without worrying about reuse.
*/




// ================= Flyweight Interface =================

// Interface for all tree objects (Flyweight)
interface ITree {
  display(x: number, y: number): void; // Show tree at a specific position
}


// ================= Concrete Flyweight =================

// Concrete Flyweight class storing intrinsic state
class Tree implements ITree {
  private type: string;    // Intrinsic: type of tree (Oak, Pine, etc.)
  private color: string;   // Intrinsic: color of tree

  constructor(type: string, color: string) {
    this.type = type;
    this.color = color;
    console.log(`Creating new Tree object: ${type}, ${color}`);
  }

  // Display tree at specific coordinates (extrinsic state)
  display(x: number, y: number): void {
    console.log(
      `Tree [Type: ${this.type}, Color: ${this.color}] at position (${x}, ${y})`
    );
  }
}


// ================= Flyweight Factory =================

// Factory manages tree objects and ensures sharing
class TreeFactory {
  private trees: Map<string, Tree> = new Map(); // Use Map for better key management
  private uniqueCount: number = 0; // Counter for unique trees created

  // Returns a tree object with given type and color
  getTree(type: string, color: string): ITree {
    const key = `${type}_${color}`; // Unique key based on intrinsic state

    if (!this.trees.has(key)) {
      const newTree = new Tree(type, color);
      this.trees.set(key, newTree);
      this.uniqueCount++;
    } else {
      console.log(`Reusing existing Tree object: ${type}, ${color}`);
    }

    return this.trees.get(key)!; // Non-null assertion: key exists for sure
  }

  // Helper: show how many unique trees created
  getUniqueTreeCount(): number {
    return this.uniqueCount;
  }
}


// ================= Client Code =================

// Initialize the Flyweight Factory
// The factory will manage creation and reuse of Tree objects
const treeFactory = new TreeFactory();

// Place trees on the game map

// Create or reuse an Oak tree with Green color at position (10, 20)
// Since this is the first Oak/Green, a new Tree object will be created
const tree1 = treeFactory.getTree("Oak", "Green");
tree1.display(10, 20);  // Display tree1 at the given coordinates

// Create or reuse a Pine tree with Dark Green color at position (15, 25)
// This is the first Pine/Dark Green, so a new Tree object is created
const tree2 = treeFactory.getTree("Pine", "Dark Green");
tree2.display(15, 25);  // Display tree2 at the given coordinates

// Reuse the existing Oak/Green tree for a different position (20, 30)
// No new object is created; the factory returns the already existing Tree
const tree3 = treeFactory.getTree("Oak", "Green");
tree3.display(20, 30);  // Display tree3 at the new coordinates

// Reuse the Oak/Green tree again at a different position (25, 35)
// Still using the same Tree object; only position changes
const tree4 = treeFactory.getTree("Oak", "Green");
tree4.display(25, 35);  // Display tree4 at the new coordinates

// Reuse the existing Pine/Dark Green tree at position (30, 40)
// Factory returns the same Pine tree object created earlier
const tree5 = treeFactory.getTree("Pine", "Dark Green");
tree5.display(30, 40);  // Display tree5 at the new coordinates


// ================= Summary =================

// Print the total number of unique Tree objects actually created
// This shows how Flyweight saves memory by reusing objects
console.log(
  `\nTotal unique Tree objects created: ${treeFactory.getUniqueTreeCount()}` 
);  //Total unique Tree objects created: 2
