// Large JavaScript file to test Copilot's limits
// This file contains intentional errors and complex code patterns
// Created for testing purposes - approximately 3000-4000 lines

/**
 * Complex E-commerce Platform Simulation
 * Contains intentional syntax errors, logical errors, and complex patterns
 */

// Error 1: Missing semicolon and undefined variable
const globalConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retryAttempts: 3
}

// Error 2: Incorrect function declaration
function calculateTax(price, taxRate {
    if (!price || !taxRate) {
        throw new Error('Invalid parameters');
    }
    return price * taxRate;
}

// Error 3: Missing closing bracket
class UserManager {
    constructor() {
        this.users = [];
        this.currentUser = null;
        this.permissions = new Map();
    
    // Error 4: Method without proper closure
    addUser(userData) {
        if (!userData.email || !userData.password) {
            return { success: false, error: 'Missing required fields' };
        }
        
        const hashedPassword = this.hashPassword(userData.password);
        const newUser = {
            id: this.generateUserId(),
            email: userData.email,
            password: hashedPassword,
            createdAt: new Date(),
            isActive: true,
            profile: {
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                phone: userData.phone || '',
                address: userData.address || {}
            },
            preferences: {
                notifications: true,
                theme: 'light',
                language: 'en'
            }
        };
        
        this.users.push(newUser);
        return { success: true, user: newUser };
    }
    
    // Error 5: Wrong parameter name in function
    hashPassword(plainPassword) {
        // Simulated hashing - not secure
        return btoa(password + 'salt123'); // Error: 'password' should be 'plainPassword'
    }
    
    generateUserId() {
        return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }
    
    // Error 6: Missing return statement
    findUserByEmail(email) {
        const user = this.users.find(u => u.email === email);
        if (user) {
            // Missing return
            user;
        }
        return null;
    }
    
    // Error 7: Infinite loop potential
    validateUserPermissions(userId, action) {
        let attempts = 0;
        while (true) { // Infinite loop
            attempts++;
            const user = this.users.find(u => u.id === userId);
            if (user && this.permissions.has(userId)) {
                break;
            }
            // Missing increment or break condition
        }
        return this.permissions.get(userId)?.includes(action) || false;
    }
}

// Error 8: Incorrect async/await usage
class ProductCatalog {
    constructor() {
        this.products = [];
        this.categories = [];
        this.inventory = new Map();
        this.pricing = new Map();
    }
    
    // Error 9: Async function without proper error handling
    async loadProducts() {
        try {
            const response = fetch('/api/products'); // Missing await
            const data = await response.json();
            this.products = data.products;
            this.updateInventory(data.inventory);
        } catch (error) {
            console.error('Failed to load products:', error);
            // Error 10: No proper error recovery
            this.products = []; // This might cause issues elsewhere
        }
    }
    
    // Error 11: Method with wrong logic
    updateInventory(inventoryData) {
        inventoryData.forEach(item => {
            if (item.quantity > 0) {
                this.inventory.set(item.productId, item.quantity);
            } else {
                // Error: Should remove from inventory, but doesn't
                this.inventory.set(item.productId, 0);
            }
        });
    }
    
    // Error 12: Division by zero possibility
    calculateDiscount(originalPrice, discountPercentage) {
        const discount = originalPrice * (discountPercentage / 100);
        return originalPrice - discount;
    }
    
    // Error 13: Array method misuse
    searchProducts(query) {
        return this.products.filter(product => {
            return product.name.includes(query) ||
                   product.description.includes(query) ||
                   product.tags.includes(query); // Error: tags might not be an array
        }).sort((a, b) => {
            return a.relevance - b.relevance; // Error: relevance property doesn't exist
        });
    }
    
    // Error 14: Memory leak potential
    addProductListener(productId, callback) {
        const listeners = this.productListeners || [];
        listeners.push({ productId, callback });
        // Error: Never cleans up listeners
        setInterval(() => {
            callback(this.getProduct(productId));
        }, 1000);
    }
}

// Error 15: Incorrect class extension
class PremiumProductCatalog extends ProductCatalog {
    constructor() {
        // Error: Missing super() call
        this.premiumFeatures = true;
        this.exclusiveProducts = [];
    }
    
    // Error 16: Method override with different signature
    searchProducts(query, filters, sortOptions, pagination) {
        const results = super.searchProducts(query);
        return this.applyPremiumFilters(results, filters);
    }
    
    applyPremiumFilters(products, filters) {
        if (!filters) return products;
        
        // Error 17: Undefined method call
        return products.filter(product => {
            return this.matchesAdvancedCriteria(product, filters); // Method doesn't exist
        });
    }
}

// Error 18: Incorrect Promise usage
class PaymentProcessor {
    constructor() {
        this.transactions = [];
        this.pendingPayments = new Set();
    }
    
    // Error 19: Promise constructor antipattern
    processPayment(paymentData) {
        return new Promise((resolve, reject) => {
            this.validatePayment(paymentData)
                .then(isValid => {
                    if (isValid) {
                        this.chargeCard(paymentData)
                            .then(result => {
                                resolve(result); // Could be simplified with async/await
                            })
                            .catch(error => {
                                reject(error);
                            });
                    } else {
                        reject(new Error('Invalid payment data'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
    
    // Error 20: Race condition
    async chargeCard(paymentData) {
        const transactionId = this.generateTransactionId();
        this.pendingPayments.add(transactionId);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Error: Race condition - might be removed by another process
        this.pendingPayments.delete(transactionId);
        
        return {
            transactionId,
            amount: paymentData.amount,
            status: 'completed'
        };
    }
    
    generateTransactionId() {
        return 'txn_' + Math.random().toString(36).substr(2, 15);
    }
}

// Error 21: Incorrect event handling
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.eventListeners = {};
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.updateTotal();
        this.emitEvent('itemAdded', { product, quantity });
    }
    
    // Error 22: Event emission without proper listener management
    emitEvent(eventName, data) {
        const listeners = this.eventListeners[eventName];
        if (listeners) {
            listeners.forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    // Error: Silently ignoring errors
                    console.log('Listener error:', error);
                }
            });
        }
    }
    
    // Error 23: Incorrect calculation logic
    updateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        // Error: Applying tax twice
        this.total = this.total * 1.08; // 8% tax
        this.total = this.total + (this.total * 0.08); // Adding tax again
    }
    
    // Error 24: Memory leak in event listeners
    addEventListener(eventName, listener) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(listener);
        // Error: No way to remove listeners
    }
}

// Error 25: Incorrect module pattern
const OrderManager = (function() {
    let orders = [];
    let orderCounter = 0;
    
    // Error 26: Closure variable confusion
    function createOrder(cartItems, userInfo) {
        const orderId = generateOrderId();
        const newOrder = {
            id: orderId,
            items: cartItems,
            customer: userInfo,
            status: 'pending',
            createdAt: new Date(),
            total: calculateOrderTotal(cartItems)
        };
        
        orders.push(newOrder);
        return newOrder;
    }
    
    // Error 27: Using global variable instead of closure
    function generateOrderId() {
        return 'ORDER_' + (++globalOrderCounter); // globalOrderCounter is not defined
    }
    
    function calculateOrderTotal(items) {
        return items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    // Error 28: Returning undefined
    function getOrder(orderId) {
        const order = orders.find(o => o.id === orderId);
        // Missing return statement
    }
    
    return {
        createOrder,
        getOrder,
        getAllOrders: () => orders
    };
})();

// Error 29: Incorrect prototype manipulation
Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

// Error 30: Modifying built-in prototypes (bad practice)
String.prototype.toTitleCase = function() {
    return this.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

// Error 31: Incorrect regular expressions
class ValidationUtils {
    static validateEmail(email) {
        // Error: Overly complex and incorrect regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    static validatePhone(phone) {
        // Error: Too restrictive regex
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
    
    // Error 32: Incorrect password validation
    static validatePassword(password) {
        if (password.length < 8) return false;
        if (!/[A-Z]/.test(password)) return false;
        if (!/[a-z]/.test(password)) return false;
        if (!/\d/.test(password)) return false;
        // Error: Missing special character check that was mentioned in requirements
        return true;
    }
    
    static sanitizeInput(input) {
        // Error: Incomplete sanitization
        return input.replace(/<script>/g, '').replace(/javascript:/g, '');
        // Missing many other XSS vectors
    }
}

// Error 33: Incorrect date handling
class DateUtils {
    static formatDate(date) {
        // Error: Assumes date is always valid
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
    }
    
    static addDays(date, days) {
        // Error: Modifies original date object
        date.setDate(date.getDate() + days);
        return date;
    }
    
    static calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        
        // Error: Doesn't account for months/days
        return today.getFullYear() - birth.getFullYear();
    }
    
    // Error 34: Timezone issues
    static getCurrentTimestamp() {
        return new Date().toISOString(); // Might not be in user's timezone
    }
}

// Error 35: Memory leaks with DOM manipulation
class UIManager {
    constructor() {
        this.components = [];
        this.eventHandlers = [];
    }
    
    createComponent(type, props) {
        const element = document.createElement(type);
        
        // Error 36: Not checking if props exist
        Object.keys(props).forEach(key => {
            if (key === 'className') {
                element.className = props[key];
            } else if (key.startsWith('on')) {
                const eventType = key.slice(2).toLowerCase();
                const handler = props[key];
                element.addEventListener(eventType, handler);
                // Error: Not storing handler reference for cleanup
            } else {
                element.setAttribute(key, props[key]);
            }
        });
        
        this.components.push(element);
        return element;
    }
    
    // Error 37: Not removing event listeners
    destroyComponent(element) {
        const index = this.components.indexOf(element);
        if (index > -1) {
            this.components.splice(index, 1);
        }
        // Error: Element still has event listeners attached
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    
    // Error 38: Performance issue with frequent DOM queries
    updateComponentText(componentId, text) {
        const element = document.getElementById(componentId); // Query every time
        if (element) {
            element.textContent = text;
        }
    }
}

// Error 39: Incorrect error handling patterns
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    
    async request(endpoint, options = {}) {
        const url = this.baseURL + endpoint;
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };
        
        try {
            const response = await fetch(url, config);
            
            // Error 40: Not checking response status
            const data = await response.json();
            return data;
        } catch (error) {
            // Error 41: Generic error handling
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    // Error 42: Not handling different error types
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    // Error 43: Missing error recovery
    async uploadFile(endpoint, file) {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            const response = await fetch(this.baseURL + endpoint, {
                method: 'POST',
                body: formData
            });
            
            return await response.json();
        } catch (error) {
            // Error: No retry logic or user feedback
            throw new Error('Upload failed');
        }
    }
}

// Error 44: Incorrect state management
class StateManager {
    constructor() {
        this.state = {};
        this.subscribers = [];
    }
    
    // Error 45: Direct state mutation allowed
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notifySubscribers();
    }
    
    getState() {
        // Error 46: Returning reference to internal state
        return this.state;
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
        // Error 47: No unsubscribe mechanism
    }
    
    notifySubscribers() {
        this.subscribers.forEach(callback => {
            try {
                callback(this.state);
            } catch (error) {
                // Error 48: Continuing despite callback errors
                console.error('Subscriber error:', error);
            }
        });
    }
}

// Error 49: Incorrect caching implementation
class CacheManager {
    constructor() {
        this.cache = new Map();
        this.expiry = new Map();
    }
    
    set(key, value, ttl = 3600000) { // 1 hour default
        this.cache.set(key, value);
        this.expiry.set(key, Date.now() + ttl);
    }
    
    get(key) {
        if (this.cache.has(key)) {
            const expireTime = this.expiry.get(key);
            if (Date.now() > expireTime) {
                // Error 50: Not cleaning up expired entries
                return null;
            }
            return this.cache.get(key);
        }
        return null;
    }
    
    // Error 51: No automatic cleanup
    clear() {
        this.cache.clear();
        this.expiry.clear();
    }
}

// Error 52: Inefficient algorithms
class SearchEngine {
    constructor() {
        this.documents = [];
        this.index = {};
    }
    
    addDocument(doc) {
        this.documents.push(doc);
        this.buildIndex(); // Error: Rebuilding entire index for each document
    }
    
    buildIndex() {
        this.index = {};
        
        // Error 53: O(n²) complexity
        this.documents.forEach((doc, docIndex) => {
            const words = doc.content.toLowerCase().split(/\s+/);
            words.forEach(word => {
                if (!this.index[word]) {
                    this.index[word] = [];
                }
                
                // Error 54: Duplicate entries possible
                this.index[word].push(docIndex);
            });
        });
    }
    
    search(query) {
        const words = query.toLowerCase().split(/\s+/);
        let results = [];
        
        // Error 55: Inefficient intersection algorithm
        words.forEach(word => {
            if (this.index[word]) {
                if (results.length === 0) {
                    results = [...this.index[word]];
                } else {
                    results = results.filter(docIndex => 
                        this.index[word].includes(docIndex)
                    );
                }
            }
        });
        
        return results.map(index => this.documents[index]);
    }
}

// Error 56: Incorrect observer pattern
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    
    off(event, listener) {
        if (this.events[event]) {
            // Error 57: Incorrect listener removal
            const index = this.events[event].findIndex(l => l === listener);
            if (index > -1) {
                this.events[event].splice(index, 1);
            }
        }
    }
    
    emit(event, ...args) {
        if (this.events[event]) {
            // Error 58: Not handling async listeners properly
            this.events[event].forEach(listener => {
                listener.apply(this, args);
            });
        }
    }
    
    // Error 59: Memory leak potential
    once(event, listener) {
        const onceWrapper = (...args) => {
            listener.apply(this, args);
            // Error: Not removing the listener after execution
        };
        this.on(event, onceWrapper);
    }
}

// Error 60: Incorrect factory pattern
class ComponentFactory {
    static createComponent(type, props) {
        // Error 61: No validation of type parameter
        switch (type) {
            case 'button':
                return new ButtonComponent(props);
            case 'input':
                return new InputComponent(props);
            case 'modal':
                return new ModalComponent(props);
            default:
                // Error 62: Returning undefined instead of error
                console.warn(`Unknown component type: ${type}`);
        }
    }
}

// Error 63: Incomplete component implementations
class ButtonComponent {
    constructor(props) {
        this.props = props;
        this.element = null;
        this.clickHandler = null;
    }
    
    render() {
        this.element = document.createElement('button');
        this.element.textContent = this.props.text || 'Button';
        
        if (this.props.onClick) {
            this.clickHandler = this.props.onClick;
            this.element.addEventListener('click', this.clickHandler);
        }
        
        return this.element;
    }
    
    // Error 64: No cleanup method
    destroy() {
        // Missing event listener cleanup
        this.element = null;
    }
}

// Error 65: Async/await misuse
class DataProcessor {
    constructor() {
        this.queue = [];
        this.processing = false;
    }
    
    async addToQueue(data) {
        this.queue.push(data);
        
        if (!this.processing) {
            await this.processQueue(); // Error: Blocking other additions
        }
    }
    
    async processQueue() {
        this.processing = true;
        
        // Error 66: Processing items sequentially instead of in parallel
        while (this.queue.length > 0) {
            const item = this.queue.shift();
            await this.processItem(item);
        }
        
        this.processing = false;
    }
    
    async processItem(item) {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Error 67: No error handling for individual items
        return this.transform(item);
    }
    
    transform(item) {
        // Error 68: Assumes item structure without validation
        return {
            id: item.id,
            processedAt: new Date(),
            data: item.data.toUpperCase() // Error if data is not a string
        };
    }
}

// Error 69: Incorrect inheritance hierarchy
class Animal {
    constructor(name) {
        this.name = name;
        this.energy = 100;
    }
    
    eat(food) {
        this.energy += food.calories || 10;
    }
    
    sleep(hours) {
        this.energy += hours * 5;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
        this.barkCount = 0;
    }
    
    bark() {
        this.barkCount++;
        this.energy -= 5;
        return 'Woof!';
    }
    
    // Error 70: Method name collision with different signature
    eat(food, amount) {
        // Error: Different signature than parent
        super.eat(food);
        console.log(`${this.name} ate ${amount} of ${food.name}`);
    }
}

// Error 71: Circular dependency potential
class ServiceA {
    constructor(serviceB) {
        this.serviceB = serviceB;
    }
    
    doSomething() {
        return this.serviceB.process(this.getData());
    }
    
    getData() {
        return { value: 42 };
    }
}

class ServiceB {
    constructor(serviceA) {
        this.serviceA = serviceA; // Circular dependency
    }
    
    process(data) {
        // Error 72: Potential infinite recursion
        return this.serviceA.doSomething() + data.value;
    }
}

// Error 73: Incorrect singleton implementation
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        
        this.connection = null;
        this.isConnected = false;
        Database.instance = this;
    }
    
    connect() {
        // Error 74: No actual connection logic
        this.isConnected = true;
        console.log('Connected to database');
    }
    
    query(sql, params) {
        if (!this.isConnected) {
            // Error 75: Should throw error or auto-connect
            console.warn('Not connected to database');
            return [];
        }
        
        // Simulate query
        return [{ id: 1, data: 'sample' }];
    }
    
    // Error 76: No connection cleanup
    disconnect() {
        this.isConnected = false;
    }
}

// Error 77: Incorrect decorator pattern
function logExecution(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        console.log(`Executing ${propertyKey} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
    
    // Error 78: Not returning descriptor
}

// Error 79: Complex nested callbacks (callback hell)
class FileProcessor {
    processFile(filePath, callback) {
        this.readFile(filePath, (err, data) => {
            if (err) {
                callback(err);
                return;
            }
            
            this.validateFile(data, (err, isValid) => {
                if (err) {
                    callback(err);
                    return;
                }
                
                if (!isValid) {
                    callback(new Error('Invalid file'));
                    return;
                }
                
                this.transformFile(data, (err, transformed) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    
                    this.saveFile(transformed, (err, result) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        
                        callback(null, result);
                    });
                });
            });
        });
    }
    
    readFile(path, callback) {
        // Simulate async file reading
        setTimeout(() => {
            callback(null, 'file content');
        }, 100);
    }
    
    validateFile(data, callback) {
        setTimeout(() => {
            callback(null, data.length > 0);
        }, 50);
    }
    
    transformFile(data, callback) {
        setTimeout(() => {
            callback(null, data.toUpperCase());
        }, 75);
    }
    
    saveFile(data, callback) {
        setTimeout(() => {
            callback(null, { success: true, id: Math.random() });
        }, 100);
    }
}

// Error 80: Incorrect module exports
export default {
    UserManager,
    ProductCatalog,
    PaymentProcessor,
    ShoppingCart,
    OrderManager,
    ValidationUtils,
    DateUtils,
    UIManager,
    APIClient,
    StateManager,
    CacheManager,
    SearchEngine,
    EventEmitter,
    ComponentFactory,
    DataProcessor,
    Animal,
    Dog,
    Database,
    FileProcessor
};

// Error 81: Polluting global namespace
window.MyApp = {
    version: '1.0.0',
    modules: {
        user: UserManager,
        products: ProductCatalog,
        payments: PaymentProcessor
    }
};

// Error 82: Memory leak with intervals
setInterval(() => {
    // Error: Interval never cleared
    console.log('Memory leak interval running...');
}, 5000);

// Error 83: Uncaught promise rejection
Promise.resolve()
    .then(() => {
        throw new Error('Uncaught error');
    });
    // No .catch() handler

// Error 84: Incorrect use of this
const obj = {
    name: 'TestObject',
    getValue: function() {
        return this.name;
    },
    
    getValueArrow: () => {
        // Error: Arrow function doesn't bind 'this'
        return this.name;
    }
};

// Error 85: Variable hoisting confusion
function hoistingExample() {
    console.log(x); // Error: Will log undefined due to hoisting
    var x = 5;
    
    // Error 86: Let/const hoisting
    console.log(y); // ReferenceError
    let y = 10;
}

// Error 87: Closure memory leaks
function createLeak() {
    const largeArray = new Array(1000000).fill('data');
    
    return function() {
        // Error: Keeps reference to largeArray even if not used
        return 'Hello';
    };
}

// Error 88: Incorrect comparison operators
function compareValues(a, b) {
    // Error 89: Using == instead of ===
    if (a == b) {
        return 'equal';
    }
    
    // Error 90: NaN comparison
    if (a === NaN) {
        return 'not a number';
    }
    
    return 'not equal';
}

// Error 91: Mutation of input parameters
function processArray(arr) {
    // Error: Mutating input array
    arr.sort();
    arr.reverse();
    return arr;
}

// Error 92: Incorrect error throwing
function riskyOperation() {
    const random = Math.random();
    if (random < 0.5) {
        // Error: Throwing string instead of Error object
        throw 'Something went wrong';
    }
    return 'Success';
}

// Error 93: Resource leaks
class ResourceManager {
    constructor() {
        this.resources = [];
    }
    
    allocateResource() {
        const resource = {
            id: Math.random(),
            data: new ArrayBuffer(1024 * 1024) // 1MB
        };
        
        this.resources.push(resource);
        return resource;
    }
    
    // Error 94: No resource cleanup
    freeResource(resourceId) {
        const index = this.resources.findIndex(r => r.id === resourceId);
        if (index > -1) {
            // Error: Not actually freeing the memory
            this.resources.splice(index, 1);
        }
    }
}

// Error 95: Timing-dependent bugs
let counter = 0;

function incrementAsync() {
    setTimeout(() => {
        counter++;
        console.log('Counter:', counter);
    }, Math.random() * 100);
}

// Error 96: Race conditions
for (let i = 0; i < 10; i++) {
    incrementAsync(); // Results in unpredictable order
}

// Error 97: Incorrect array usage
const mixedArray = [1, '2', 3, '4', 5];

function sumArray(arr) {
    return arr.reduce((sum, item) => {
        // Error: Not checking item type
        return sum + item; // Will concatenate strings
    }, 0);
}

// Error 98: DOM manipulation without checking existence
function updateElement(id, content) {
    // Error: Not checking if element exists
    document.getElementById(id).innerHTML = content;
}

// Error 99: Infinite recursion
function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    // Error: Missing return statement
    factorial(n - 1) * n;
}

// Error 100: Final syntax error - missing closing brace for the entire file
