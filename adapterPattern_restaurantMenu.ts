/*
Restaurant Menu Example using Adapter Pattern

Adapter Design Pattern:

- Adapter is a structural design pattern that allows incompatible interfaces to work together.
- Instead of changing existing classes, we create an adapter that translates one interface into another the client code can use.
- Benefits:
    • Enables code reuse
    • Promotes flexibility
    • Keeps client code independent of vendor-specific APIs


How it works in this code:

1. `IMenu` is the target interface our online app understands.
2. Each restaurant API (Italian, Japanese, Armenian) has a different incompatible format.
3. Adapters (`ItalianMenuAdapter`, `JapaneseMenuAdapter`, `ArmenianMenuAdapter`) convert these APIs into `IMenu`.
4. The `OnlineMenuApp` works only with `IMenu`, so it can display any restaurant's menu without knowing the details.
5. Adding a new restaurant only requires a new adapter - no changes to client code.


Benefits demonstrated here:

- Different restaurant menus are unified into a single format (`IMenuItem`), making it easy for the app to display them.
- Client code (`OnlineMenuApp`) does not depend on vendor-specific APIs, so it stays simple and clean.
- Easy to add new restaurants in the future by just writing a new adapter; no changes needed in the app code.
- Shows clear separation of concerns: adapters handle API translation, client handles display logic.
- Promotes code reuse by using the same interface for all restaurants.
- Demonstrates how one interface can adapt multiple incompatible sources.
*/




// ================= Target Interface =================

// Unified format for a menu item that our app understands
interface IMenuItem {
    name: string;     // Dish name
    price: number;    // Price in AMD
}

// Unified menu interface that all restaurants must adapt to
interface IMenu {
    getItems(): IMenuItem[];  // Return array of menu items
}



// ================= Incompatible Restaurant APIs =================

// Italian restaurant API returns menu as a single string
class ItalianRestaurantAPI {
    getItalianMenu(): string {
        // Format: "Name:Price, Name:Price,..."
        return "Pizza:3500, Pasta:3000, Risotto:3800";
    }
}

// Japanese restaurant API returns menu as an array of objects
class JapaneseRestaurantAPI {
    getJapaneseMenu(): { title: string; yenPrice: number }[] {
        // Each object has title and price in yen
        return [
            { title: "Sushi", yenPrice: 1200 },
            { title: "Ramen", yenPrice: 900 },
            { title: "Tempura", yenPrice: 1500 },
        ];
    }
}

// Armenian restaurant API returns menu as an object with dish names as keys
class ArmenianRestaurantAPI {
    getArmenianMenu(): { [dish: string]: number } {
        // Prices already in AMD
        return {
            "Khorovats": 4500,
            "Dolma": 3800,
            "Lavash": 1000
        };
    }
}



// ================= Adapters =================

// Adapter for Italian Restaurant
class ItalianMenuAdapter implements IMenu {
    private api: ItalianRestaurantAPI;  // Reference to the real API

    constructor(api: ItalianRestaurantAPI) {
        this.api = api;                // Store API reference
    }

    getItems(): IMenuItem[] {
        const rawMenu = this.api.getItalianMenu(); // Get raw menu string

        // Convert string into array of IMenuItem objects
        return rawMenu.split(",").map(item => {
            const [name, price] = item.split(":");   // Split name and price
            return { name, price: Number(price) };   // Convert price to number
        });
    }
}


// Adapter for Japanese Restaurant
class JapaneseMenuAdapter implements IMenu {
    private api: JapaneseRestaurantAPI;  // Reference to the real API

    constructor(api: JapaneseRestaurantAPI) {
        this.api = api;                // Store API reference
    }

    getItems(): IMenuItem[] {
        // Map each Japanese dish to unified IMenuItem format
        return this.api.getJapaneseMenu().map(dish => ({
            name: dish.title,                        // Rename title -> name
            price: Math.round(dish.yenPrice * 3.2),  // Convert yen to AMD
        }));
    }
}

// Adapter for Armenian Restaurant
class ArmenianMenuAdapter implements IMenu {
    private api: ArmenianRestaurantAPI;  // Reference to the real API

    constructor(api: ArmenianRestaurantAPI) {
        this.api = api;                // Store API reference
    }

    getItems(): IMenuItem[] {
        // Convert object into array of IMenuItem
        const menu = this.api.getArmenianMenu();
        return Object.keys(menu).map(dish => ({
            name: dish,              // Dish name
            price: menu[dish],       // Price in AMD
        }));
    }
}



// ================= Client Code =================

// Online app that works only with unified IMenu interface
class OnlineMenuApp {
    private menus: IMenu[] = [];   // Store all restaurant menus

    // Add a menu to the app
    addMenu(menu: IMenu): void {
        this.menus.push(menu);
    }

    // Show all menus in a unified format
    showAllMenus(): void {
        console.log("- Online Restaurant Menu -");

        // Loop through all menus
        this.menus.forEach(menu => {
            menu.getItems().forEach(item => {
                console.log(`${item.name} - ${item.price} AMD`);
            });
        });
    }
}



// ================= Usage Example =================

const app = new OnlineMenuApp();

// Add Italian restaurant menu using adapter
app.addMenu(new ItalianMenuAdapter(new ItalianRestaurantAPI()));

// Add Japanese restaurant menu using adapter
app.addMenu(new JapaneseMenuAdapter(new JapaneseRestaurantAPI()));

// Add Armenian restaurant menu using adapter
app.addMenu(new ArmenianMenuAdapter(new ArmenianRestaurantAPI()));

// Show all menus in unified format
app.showAllMenus();

/*
Expected Output:
- Online Restaurant Menu -
Pizza - 3500 AMD
Pasta - 3000 AMD
Risotto - 3800 AMD
Sushi - 3840 AMD
Ramen - 2880 AMD
Tempura - 4800 AMD
Khorovats - 4500 AMD
Dolma - 3800 AMD
Lavash - 1000 AMD
*/
