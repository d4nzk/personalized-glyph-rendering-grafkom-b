// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// ============================================================================
// Angle Conversion Functions
// ============================================================================

/**
 * Convert radians to degrees
 * @param {number} r - Angle in radians
 * @returns {number} Angle in degrees
 */
function radToDeg(r) {
    return r * 180 / Math.PI;
}

/**
 * Convert degrees to radians
 * @param {number} d - Angle in degrees
 * @returns {number} Angle in radians
 */
function degToRad(d) {
    return d * Math.PI / 180;
}

// ============================================================================
// Scene Configuration
// ============================================================================

/**
 * Camera configuration
 */
var cameraConfig = {
    position: [80, -500, 550],   // Adjusted to center view on D, F, and 0
    target: [0, 35, 0],        // Looking at center point between all letters
    up: [0, 1, 0],              // Up direction
    fieldOfView: 60             // Field of view in degrees
};

/**
 * Light configuration
 */
var lightConfig = {
    direction: [0.5, 0.7, 1],   // Light direction (will be normalized)
    color: [0.2, 1, 0.2, 1]     // Green color (RGBA)
};

/**
 * Animation configuration
 */
var animationConfig = {
    rotationSpeed: 0.01,        // Rotation speed in radians per frame
    autoRotate: true            // Enable/disable auto-rotation
};
