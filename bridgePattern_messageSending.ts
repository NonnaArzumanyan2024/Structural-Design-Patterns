/*
Message Sending Example using Bridge Pattern

Bridge Design Pattern:

- Bridge is a structural design pattern that separates abstraction from implementation

- In this example:
    • Abstraction = Message types (Urgent, Lazy, Simple)
    • Implementation = Sending methods (SMS, Email, Push)

- Benefits:
    • Avoids creating many subclasses for every combination of message type and sender
    • Allows changing message types or senders independently
    • Promotes flexibility, maintainability, and code reuse
    • Shows clear separation of concerns: message behavior vs sending mechanism


How it works in this code:

1. IMessageSender is the Implementor interface for all senders.
2. SMS, Email, Push are Concrete Implementors that know how to send messages.
3. Message is the Abstraction, holding a reference to an IMessageSender.
4. UrgentMessage, LazyMessage, SimpleMessage are Refined Abstractions, adding behavior for different message types.
5. Client code can easily mix and match message types and senders.
6. Adding a new sender or message type does not require changing existing classes.
*/




// ================= Implementor Interface =================

// IMessageSender defines the interface that all concrete senders must implement
interface IMessageSender {
    sendMessage(content: string): void;   // Method to send a message
}



// ================= Concrete Implementors =================

// SMS sender - knows how to send SMS messages
class SMS implements IMessageSender {
    sendMessage(content: string): void {
        console.log(`SMS sent: ${content}`); // Prints SMS message to console
    }
}

// Email sender - knows how to send Email messages
class Email implements IMessageSender {
    sendMessage(content: string): void {
        console.log(`Email sent: ${content}`); // Prints Email message to console
    }
}

// Push notification sender - knows how to send Push messages
class Push implements IMessageSender {
    sendMessage(content: string): void {
        console.log(`Push notification sent: ${content}`); // Prints Push message to console
    }
}



// ================= Abstraction =================

// Abstract Message class - holds reference to a sender
abstract class Message {
    protected sender: IMessageSender;      // Link to sender implementation

    constructor(sender: IMessageSender) {
        this.sender = sender;              // Assign sender to the message
    }

    abstract send(content: string): void;  // Abstract method for sending message
}



// ================= Refined Abstractions =================

// Urgent message - adds special behavior for urgent messages
class UrgentMessage extends Message {
    send(content: string): void {
        // Prefix message with [URGENT] and make text uppercase
        this.sender.sendMessage(`[URGENT] ${content.toUpperCase()}`);
    }
}

// Lazy message - adds special behavior for lazy messages
class LazyMessage extends Message {
    send(content: string): void {
        // Prefix message with [LAZY] and make text lowercase
        this.sender.sendMessage(`[LAZY] ${content.toLowerCase()}`);
    }
}

// Simple message - default behavior, no special formatting
class SimpleMessage extends Message {
    send(content: string): void {
        // Prefix message with [SIMPLE] and keep text as is
        this.sender.sendMessage(`[SIMPLE] ${content}`);
    }
}



// ================= Client Code =================

// Create combinations of message types and sending methods
const urgentSMS = new UrgentMessage(new SMS());      // Urgent + SMS
const lazyEmail = new LazyMessage(new Email());      // Lazy + Email
const simplePush = new SimpleMessage(new Push());    // Simple + Push

// Send messages using different combinations
urgentSMS.send("Server is down!");   // SMS sent: [URGENT] SERVER IS DOWN!
lazyEmail.send("Meeting at 3PM");    // Email sent: [LAZY] meeting at 3pm
simplePush.send("Hello, user!");     // Push notification sent: [SIMPLE] Hello, user!
