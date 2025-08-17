/*
Online Image Viewer Example using Proxy Pattern

Proxy Design Pattern:
- Proxy is a structural design pattern that provides a surrogate or placeholder for another object to control access to it.
- Common use cases:
    • Lazy loading: Load large resources only when needed
    • Access control: Restrict access to sensitive objects
    • Logging or caching: Monitor or store requests before passing to the real object

How it works in this code:
1. `IImage` is the common interface for all images (real or proxy).
2. `RealImage` simulates loading a large image (expensive operation).
3. `ImageProxy` stores the image filename and creates `RealImage` only when display() is called.
4. Client code uses the `IImage` interface without caring whether it’s a proxy or real image.
5. Multiple calls to `display()` reuse the same `RealImage`, avoiding repeated loading.

Benefits demonstrated here:
- Delays expensive operations until necessary (lazy loading)
- Reduces memory usage by reusing already loaded images
- Clear separation of concerns: proxy handles access, real object handles the main work
*/




// ================= Proxy Interface =================
// Interface for both RealImage and Proxy
interface IImage {
    display(): void;  // Method to display the image
}


// ================= Real Subject =================
// Real image class that performs the expensive operation (loading image)
class RealImage implements IImage {
    private filename: string;   // Store the image filename
    static loadedImagesCount: number = 0; // Track how many real images have been loaded

    constructor(filename: string) {
        this.filename = filename;          // Set filename
        this.loadFromDisk();               // Simulate loading from disk/server
        RealImage.loadedImagesCount++;     // Increment the loaded image counter
    }

    // Private method to simulate image loading
    private loadFromDisk(): void {
        console.log(`Loading image: ${this.filename}`);
    }

    // Display the image
    display(): void {
        console.log(`Displaying image: ${this.filename}`);
    }
}


// ================= Proxy =================
// Proxy class controls access to RealImage
class ImageProxy implements IImage {
    private filename: string;                      // Store the image filename
    private realImage: RealImage | null = null;    // Initially no real image loaded

    constructor(filename: string) {
        this.filename = filename;                  // Set the filename
    }

    // Display the image
    // Lazy-loads RealImage only when needed
    display(): void {
        if (this.realImage === null) {                        // Check if real image exists
            this.realImage = new RealImage(this.filename);    // Load real image on first request
        }
        this.realImage.display();                             // Delegate display to real image
    }
}


// ================= Client Code =================

// Create proxies for images; real images are not loaded yet
const image1: IImage = new ImageProxy("photo1.jpg"); // Proxy for first image
const image2: IImage = new ImageProxy("photo2.jpg"); // Proxy for second image

console.log("Images created. No loading yet.\n"); // At this point, no real image is loaded

// Display first image
// Triggers lazy loading: RealImage is created and loaded now
image1.display();

// Display first image again
// RealImage already exists; no loading occurs this time
image1.display();

// Display second image
// Lazy loading occurs for the second image now
image2.display();

// ================= Summary =================
// Print how many real images were actually loaded
console.log(
  `\nTotal real images loaded: ${RealImage.loadedImagesCount}`
);

/*
Expected Output:

Images created. No loading yet.

Loading image: photo1.jpg
Displaying image: photo1.jpg
Displaying image: photo1.jpg
Loading image: photo2.jpg
Displaying image: photo2.jpg

Total real images loaded: 2
*/
