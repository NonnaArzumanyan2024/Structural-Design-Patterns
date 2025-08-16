/*
Coffee Example using Decorator Pattern

Decorator Design Pattern:
- A structural pattern that allows adding new behavior to objects dynamically.
- Here, base coffee can be decorated with milk, sugar, or other toppings.
- Promotes flexibility: we can combine any decorators without creating many subclasses.

How it works in this code:

1. `ICoffee` is the interface for all coffee objects.
2. `Coffee` is the basic coffee implementation.
3. `CoffeeDecorator` is the abstract decorator that wraps a coffee object.
4. `MilkDecorator` and `SugarDecorator` add extra behavior (milk, sugar).
5. Client code can mix and match decorators easily.

Benefits:

- Avoids creating a new subclass for every combination of toppings.
- Easy to add new toppings in the future.
- Clear separation of concerns: base coffee is independent, decorators handle additions.
*/




// ================= Component Interface =================

// Base interface for coffee
interface ICoffee {
    getDescription(): string;  // Return description of coffee
    getCost(): number;         // Return cost of coffee
}



// ================= Concrete Component =================

// Simple coffee implementation
class Coffee implements ICoffee {
    getDescription(): string {
        return "Coffee";        // Base description
    }

    getCost(): number {
        return 200;             // Base price in AMD
    }
}


// ================= Abstract Decorator =================

// Abstract decorator class implements ICoffee and wraps a coffee object
abstract class CoffeeDecorator implements ICoffee {
    protected coffee: ICoffee;

    constructor(coffee: ICoffee) {
        this.coffee = coffee;   // Wrap existing coffee
    }

    abstract getDescription(): string;
    abstract getCost(): number;
}


// ================= Concrete Decorators =================

// Milk decorator
class MilkDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + " + Milk";  // Add milk to description
    }

    getCost(): number {
        return this.coffee.getCost() + 50;                // Add milk price
    }
}

// Sugar decorator
class SugarDecorator extends CoffeeDecorator {
    getDescription(): string {
        return this.coffee.getDescription() + " + Sugar"; // Add sugar to description
    }

    getCost(): number {
        return this.coffee.getCost() + 30;               // Add sugar price
    }
}


// ================= Client Code =================

// Simple coffee
const simpleCoffee = new Coffee();
console.log(simpleCoffee.getDescription(), simpleCoffee.getCost(), "AMD"); 
// Output: Coffee 200 AMD

// Coffee with milk
const coffeeWithMilk = new MilkDecorator(new Coffee());
console.log(coffeeWithMilk.getDescription(), coffeeWithMilk.getCost(), "AMD");
// Output: Coffee + Milk 250 AMD

// Coffee with sugar
const coffeeWithSugar = new SugarDecorator(new Coffee());
console.log(coffeeWithSugar.getDescription(), coffeeWithSugar.getCost(), "AMD");
// Output: Coffee + Sugar 230 AMD

// Coffee with milk and sugar
const coffeeWithMilkAndSugar = new SugarDecorator(new MilkDecorator(new Coffee()));
console.log(coffeeWithMilkAndSugar.getDescription(), coffeeWithMilkAndSugar.getCost(), "AMD");
// Output: Coffee + Milk + Sugar 280 AMD
