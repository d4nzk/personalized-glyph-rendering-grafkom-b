// ============================================================================
// MAIN APPLICATION - WebGL 3D Directional Lighting
// ============================================================================

"use strict";

// ============================================================================
// MAIN FUNCTION
// ============================================================================
function main() {
    // ------------------------------------------------------------------------
    // WebGL Context Setup
    // ------------------------------------------------------------------------
    var canvas = document.querySelector("#canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("WebGL not supported");
        return;
    }

    // ------------------------------------------------------------------------
    // Program Setup
    // ------------------------------------------------------------------------
    var program = webglUtils.createProgramFromScripts(gl, [
        "vertex-shader-3d", 
        "fragment-shader-3d"
    ]);

    // ------------------------------------------------------------------------
    // Get Attribute Locations
    // ------------------------------------------------------------------------
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var normalLocation = gl.getAttribLocation(program, "a_normal");

    // ------------------------------------------------------------------------
    // Get Uniform Locations
    // ------------------------------------------------------------------------
    var worldViewProjectionLocation = gl.getUniformLocation(program, "u_worldViewProjection");
    var worldLocation = gl.getUniformLocation(program, "u_world");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    var reverseLightDirectionLocation = gl.getUniformLocation(program, "u_reverseLightDirection");

    // ------------------------------------------------------------------------
    // Create and Fill Position Buffer
    // ------------------------------------------------------------------------
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    // ------------------------------------------------------------------------
    // Create and Fill Normal Buffer
    // ------------------------------------------------------------------------
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    setNormals(gl);

    // ------------------------------------------------------------------------
    // Scene Variables
    // ------------------------------------------------------------------------
    var fieldOfViewRadians = degToRad(cameraConfig.fieldOfView);
    var fRotationRadians = 0;

    // ------------------------------------------------------------------------
    // UI Setup
    // ------------------------------------------------------------------------
    setupUI(fRotationRadians, function(newRotation) {
        fRotationRadians = newRotation;
    });

    // Setup keyboard controls (optional)
    setupKeyboardControls();

    // ------------------------------------------------------------------------
    // Animation Loop
    // ------------------------------------------------------------------------
    function render() {
        // Auto-increment rotation angle if not frozen
        if (!freeze && animationConfig.autoRotate) {
            fRotationRadians += animationConfig.rotationSpeed;
        }
        
        // Draw the scene
        drawScene();
        
        // Request next animation frame
        requestAnimationFrame(render);
    }

    // Start the animation loop
    render();

    // ------------------------------------------------------------------------
    // Draw Scene Function
    // ------------------------------------------------------------------------
    function drawScene() {
        // Resize canvas to match display size
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        // Set viewport
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear canvas and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Enable face culling and depth testing
        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // Use the shader program
        gl.useProgram(program);

        // ====================================================================
        // Setup Position Attribute
        // ====================================================================
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        
        var size = 3;
        var type = gl.FLOAT;
        var normalize = false;
        var stride = 0;
        var offset = 0;
        gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

        // ====================================================================
        // Setup Normal Attribute
        // ====================================================================
        gl.enableVertexAttribArray(normalLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        
        size = 3;
        type = gl.FLOAT;
        normalize = false;
        stride = 0;
        offset = 0;
        gl.vertexAttribPointer(normalLocation, size, type, normalize, stride, offset);

        // ====================================================================
        // Matrix Calculations
        // ====================================================================
        
        // Projection Matrix
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var zNear = 1;
        var zFar = 2000;
        var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);

        // Camera Matrix
        var cameraMatrix = m4.lookAt(
            cameraConfig.position, 
            cameraConfig.target, 
            cameraConfig.up
        );

        // View Matrix (inverse of camera)
        var viewMatrix = m4.inverse(cameraMatrix);

        // View-Projection Matrix
        var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

        // World Matrix (rotation around Y axis)
        var worldMatrix = m4.yRotation(fRotationRadians);

        // World-View-Projection Matrix
        var worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);

        // ====================================================================
        // Set Uniforms
        // ====================================================================
        
        // Set transformation matrices
        gl.uniformMatrix4fv(worldViewProjectionLocation, false, worldViewProjectionMatrix);
        gl.uniformMatrix4fv(worldLocation, false, worldMatrix);

        // Set color
        gl.uniform4fv(colorLocation, lightConfig.color);

        // Set light direction
        gl.uniform3fv(reverseLightDirectionLocation, m4.normalize(lightConfig.direction));

        // ====================================================================
        // Draw - Drawing each letter with different colors
        // ====================================================================
        var primitiveType = gl.TRIANGLES;
        
        // Draw 'D' in RED
        gl.uniform4fv(colorLocation, [1, 0.2, 0.2, 1]); // Red
        gl.drawArrays(primitiveType, 0, 26 * 6); // 26 faces for 'D'
        
        // Draw 'A' in GREEN  
        gl.uniform4fv(colorLocation, [0.2, 1, 0.2, 1]); // Green
        gl.drawArrays(primitiveType, 26 * 6, 21 * 6); // 21 faces for 'A'
        
        // Draw '0' in BLUE
        gl.uniform4fv(colorLocation, [0.2, 0.2, 1, 1]); // Blue
        gl.drawArrays(primitiveType, 47 * 6, 16 * 6); // 16 faces for '0'
    }
}

// ============================================================================
// Initialize Application
// ============================================================================
main();
