///<reference path="SoftEngine.ts"/>

var canvas: HTMLCanvasElement; 
var device: SoftEngine.Device; 
var mesh: SoftEngine.Mesh;
var meshes: SoftEngine.Mesh[] = [];
var mera: SoftEngine.Camera;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = <HTMLCanvasElement> document.getElementById("frontBuffer");
    mesh = new SoftEngine.Mesh("Cube", 8);
    meshes.push(mesh);
    mera = new SoftEngine.Camera();
    device = new SoftEngine.Device(canvas);

    mesh.Vertices[0] = new BABYLON.Vector3(-1, 1, 1);
    mesh.Vertices[1] = new BABYLON.Vector3(1, 1, 1);
    mesh.Vertices[2] = new BABYLON.Vector3(-1, -1, 1);
    mesh.Vertices[3] = new BABYLON.Vector3(-1, -1, -1);
    mesh.Vertices[4] = new BABYLON.Vector3(-1, 1, -1);
    mesh.Vertices[5] = new BABYLON.Vector3(1, 1, -1);
    mesh.Vertices[6] = new BABYLON.Vector3(1, -1, 1);
    mesh.Vertices[7] = new BABYLON.Vector3(1, -1, -1);

    // Set Position to -10 so -Z is out of screen
    mera.Position = new BABYLON.Vector3(0, 0, -10);
    mera.Target = new BABYLON.Vector3(0, 0, 0);

    // Calling the HTML5 rendering loop
    requestAnimationFrame(drawingLoop); 
}

// Rendering loop handler
function drawingLoop() {
    device.clear();

    // rotating slightly the cube during each frame rendered
    //mesh.Rotation.x += 0.01;
    //mesh.Rotation.y += 0.01; 

    // This is a Left Handed coordinate system with:
    //   +Y up
    //   +X right
    //   -Z out of screen (+Z into screen)
    //   Rotations are clockwise.

    //mesh.Rotation.z += 0.01;
    //mesh.Position.z += 0.005;
    mesh.Rotation.x += 0.01;
    mesh.Position.x += 0.005;
    //mesh.Rotation.y += 0.01;
    //mesh.Position.y += 0.005;

    // Bound the movments so the mesh stays in view
    if (mesh.Position.x > 2 || mesh.Position.x < -2) {
        mesh.Position.x = 0;
    }
    if (mesh.Position.y > 2 || mesh.Position.y < -2) {
        mesh.Position.y = 0;
    }
    if (mesh.Position.z > 4 || mesh.Position.z < -4) {
        mesh.Position.z = 0;
    }


    // Doing the various matrix operations
    device.render(mera, meshes);
    // Flushing the back buffer into the front buffer
    device.present();

    // Calling the HTML5 rendering loop recursively
    requestAnimationFrame(drawingLoop);
}
