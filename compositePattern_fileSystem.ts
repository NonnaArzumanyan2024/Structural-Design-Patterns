/*
File System Example using Composite Pattern

Composite Design Pattern:

- Composite is a structural design pattern that allows you to treat individual objects (leaves) and groups of objects (composites) uniformly.
- In this example, we have a File System:
    • Files are leaf objects
    • Folders are composite objects that can contain both files and subfolders
- Both File and Folder implement the same interface (`IFileSystemComponent`), so the client can treat them the same way.

- Client can:
    • Display the full file system structure
    • Add or remove files/folders dynamically

- Benefits demonstrated in this example:
    • Simplifies client code: no need to check if an object is a file or folder
    • Makes recursive structures easy to handle
    • Supports tree-like hierarchies naturally
    • Beginner-friendly TypeScript example, GitHub-ready

Use case:

- Suppose you want to display an **online file explorer** like your own “Root” folder.
- You can create files and folders, nest them, and print the structure using the same interface.
*/




// ================= Component Interface =================

// Base interface for all file system components
interface IFileSystemComponent {
    getName(): string;                      // Return name of component (file or folder)
    display(indentation?: string): void;    // Display component (and children recursively)
}


// ================= Leaf =================

// File class implements the leaf component
class File implements IFileSystemComponent {
    private name: string;                   // Name of the file

    constructor(name: string) {
        this.name = name;                   // Set file name
    }

    // Return file name
    getName(): string {
        return this.name;
    }

    // Display file with optional indentation
    display(indentation: string = ""): void {
        console.log(`${indentation}- File: ${this.name}`);   // Print file with dash
    }
}



// ================= Composite =================

// Folder class implements composite component
class Folder implements IFileSystemComponent {
    private name: string;                           // Name of the folder
    private children: IFileSystemComponent[] = [];  // Array of children (files or subfolders)

    constructor(name: string) {
        this.name = name;                          // Set folder name
    }

    // Return folder name
    getName(): string {
        return this.name;
    }

    // Add a file or folder to children
    add(component: IFileSystemComponent): void {
        this.children.push(component);             // Push new child
    }

    // Remove a file or folder from children
    remove(component: IFileSystemComponent): void {
        const index = this.children.indexOf(component); // Find child index
        if (index !== -1) {
            this.children.splice(index, 1);             // Remove child if exists
        }
    }

    // Display folder and its children recursively
    display(indentation: string = ""): void {
        console.log(`${indentation}+ Folder: ${this.name}`); // Print folder with plus
        this.children.forEach(child => {
            child.display(indentation + "  ");               // Recursive display with extra indentation
        });
    }
}

// ================= Client Code =================

// Create files (leaf nodes)
const file1 = new File("file1.txt");
const file2 = new File("file2.txt");
const file3 = new File("file3.txt");
const file4 = new File("file4.txt");  // New file to demonstrate removal

// Create folders (composite nodes)
const folder1 = new Folder("Documents");
const folder2 = new Folder("Images");
const rootFolder = new Folder("Root");

// Build hierarchy by adding files to folders
folder1.add(file1);
folder1.add(file2);
folder1.add(file4);  // Add file4 temporarily
folder2.add(file3);

// Build root hierarchy
rootFolder.add(folder1);
rootFolder.add(folder2);

// Display the full file system structure before removal
console.log("=== File System Before Removal ===");
rootFolder.display();

/*
Expected Output:
+ Folder: Root
  + Folder: Documents
    - File: file1.txt
    - File: file2.txt
    - File: file4.txt
  + Folder: Images
    - File: file3.txt
*/


// Remove file4 from Documents folder
folder1.remove(file4);

console.log("File System After Removal of file4.txt");
rootFolder.display();

/*
Expected Output:
+ Folder: Root
  + Folder: Documents
    - File: file1.txt
    - File: file2.txt
  + Folder: Images
    - File: file3.txt
*/

