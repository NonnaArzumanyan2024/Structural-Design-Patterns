/*
File System Example using Facade Pattern

Facade Design Pattern:

- Facade is a structural design pattern that provides a simplified interface to a complex system of classes.
- Instead of interacting with multiple subsystems directly, the client interacts with one unified interface.

- Promotes:
  • Simplicity and ease of use
  • Reduced coupling between client and subsystems
  • Clear separation of concerns

- Use case in this example:
  • File system has multiple subsystems: File, Folder, Permissions, Backup.
  • Normally, creating a file would require calling each subsystem manually.
  • Facade class (`FileSystemFacade`) provides easy methods to create, read, and delete files.
  • The client doesn’t need to know the internal workings of subsystems.


How it works in this code:

1. `IFileSystem` defines a simple interface for file operations (create, read, delete).
2. Subsystem classes (`File`, `Folder`, `Permissions`, `Backup`) handle the complex operations.
3. `FileSystemFacade` implements `IFileSystem` and internally calls the subsystems in the correct order.
4. Client code only interacts with `FileSystemFacade` to perform file operations easily.


Benefits demonstrated here:

- Avoids client dealing with multiple classes and their dependencies.
- Centralizes operations in a single, easy-to-use interface.
- Adding new subsystems (e.g., Logging, Version Control) is easy without changing client code.


Note: Avoid adding too much logic in the Facade
The Facade should only coordinate subsystems, not implement business rules

Warning: A Facade can become a "God Object" if it knows too much or does too much
Keep it simple and delegate real work to subsystem classes

Best practice: Only provide a unified, easy-to-use interface for the client
All complex operations should remain inside the subsystem classes
*/




// ================= Component Interfaces =================

// Base interface for file operations
interface IFileSystem {
    createFile(name: string, content: string): void;  // Method to create a file
    readFile(name: string): void;                     // Method to read a file
    deleteFile(name: string): void;                   // Method to delete a file
}



// ================= Subsystems =================

// Handles actual file operations
class File {
    create(name: string, content: string): void {
        console.log(`File "${name}" created with content: "${content}"`); // Log creation
    }

    read(name: string): void {
        console.log(`Reading file "${name}"...`); // Log reading
    }

    delete(name: string): void {
        console.log(`File "${name}" deleted`);    // Log deletion
    }
}

// Handles folder operations
class Folder {
    createFolder(name: string): void {
        console.log(`Folder "${name}" created`); // Log folder creation
    }
}

// Handles file permissions
class Permissions {
    setReadWrite(name: string): void {
        console.log(`Permissions set: "${name}" is read-write`); // Log permission change
    }
}

// Handles file backup
class Backup {
    backupFile(name: string): void {
        console.log(`Backup created for file "${name}"`); // Log backup
    }
}



// ================= Facade =================

// Facade class implementing the simple interface
class FileSystemFacade implements IFileSystem {
    private file: File;
    private folder: Folder;
    private permissions: Permissions;
    private backup: Backup;

    constructor() {
        this.file = new File();                // Initialize File subsystem
        this.folder = new Folder();            // Initialize Folder subsystem
        this.permissions = new Permissions();  // Initialize Permissions subsystem
        this.backup = new Backup();            // Initialize Backup subsystem
    }

    // Create a file with folder, permissions, and backup
    createFile(name: string, content: string): void {
        console.log("- Creating file via Facade -");
        this.folder.createFolder("DefaultFolder");   // Create default folder
        this.file.create(name, content);             // Create the file
        this.permissions.setReadWrite(name);         // Set read-write permission
        this.backup.backupFile(name);                // Backup the file
        console.log(`File "${name}" created successfully!\n`);
    }

    // Read a file
    readFile(name: string): void {
        console.log("- Reading file via Facade -");
        this.file.read(name);                         // Read the file
        console.log(`File "${name}" read successfully!\n`);
    }

    // Delete a file
    deleteFile(name: string): void {
        console.log("- Deleting file via Facade -");
        this.file.delete(name);                       // Delete the file
        this.backup.backupFile(name);                 // Backup before deletion
        console.log(`File "${name}" deleted successfully!\n`);
    }
}



// ================= Client Code =================

// Initialize Facade
const fsApp = new FileSystemFacade();

// Create a file
fsApp.createFile("example.txt", "Hello Facade Pattern!");

/*
Expected Output:
- Creating file via Facade -
Folder "DefaultFolder" created
File "example.txt" created with content: "Hello Facade Pattern!"
Permissions set: "example.txt" is read-write
Backup created for file "example.txt"
File "example.txt" created successfully!
*/

// Read the file
fsApp.readFile("example.txt");

/*
Expected Output:
- Reading file via Facade -
Reading file "example.txt"...
File "example.txt" read successfully!
*/

// Delete the file
fsApp.deleteFile("example.txt");

/*
Expected Output:
- Deleting file via Facade -
File "example.txt" deleted
Backup created for file "example.txt"
File "example.txt" deleted successfully!
*/
