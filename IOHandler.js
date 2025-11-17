// ============================================================================
// INPUT/OUTPUT HANDLER
// ============================================================================

// ============================================================================
// Global Variables
// ============================================================================
var freeze = false;  // Control animation pause/play

// ============================================================================
// UI Setup Function
// ============================================================================

/**
 * Setup UI controls (slider for rotation)
 * @param {number} initialRotation - Initial rotation value in radians
 * @param {function} updateCallback - Callback function when rotation changes
 */
function setupUI(initialRotation, updateCallback) {
    webglLessonsUI.setupSlider("#fRotation", {
        value: radToDeg(initialRotation),
        slide: function(event, ui) {
            updateCallback(degToRad(ui.value));
        },
        min: -360,
        max: 360
    });
}

// ============================================================================
// Keyboard Controls (Optional)
// ============================================================================

/**
 * Setup keyboard controls
 */
function setupKeyboardControls() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case ' ':  // Spacebar to pause/resume
                freeze = !freeze;
                console.log(freeze ? 'Animation paused' : 'Animation resumed');
                break;
            case 'r':  // R to reset rotation
                // Can be implemented if needed
                break;
            case '+':  // Increase rotation speed
                animationConfig.rotationSpeed += 0.005;
                console.log('Rotation speed:', animationConfig.rotationSpeed);
                break;
            case '-':  // Decrease rotation speed
                animationConfig.rotationSpeed = Math.max(0.001, animationConfig.rotationSpeed - 0.005);
                console.log('Rotation speed:', animationConfig.rotationSpeed);
                break;
        }
    });
}
