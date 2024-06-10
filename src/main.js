/**
 * Register all listeners for processing events.
 */
import './events/index.js';

/**
 * Create and configure all sensors and actors of the system.
 */
import './tinkerforge/index.js';

/**
 * Register all event emitters for Tinkerforge's sensor data.
 */
import './tinkerforge/events.js';
