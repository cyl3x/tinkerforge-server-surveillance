/**
 * Register all listeners for processing events.
 */
import './events/index.js';
console.log('Init: Tinkerforge event listeners initialized!');

/**
 * Create and configure all sensors and actors of the system.
 */
import './tinkerforge/index.js';

/**
 * Register all event emitters for processing Tinkerforge's sensor data.
 */
import './tinkerforge/events.js';
console.log('Init: Event processors initialized!');
