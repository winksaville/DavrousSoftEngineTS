var canvas;
var device;
var mesh;
var meshes = [];
var mera;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.getElementById("frontBuffer");
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

    requestAnimationFrame(drawingLoop);
}

function drawingLoop() {
    device.clear();

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

    device.render(mera, meshes);

    device.present();

    requestAnimationFrame(drawingLoop);
}
