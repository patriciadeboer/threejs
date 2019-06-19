let container;
let camera;
let renderer;
let scene;
let mesh;

function init() {
  // Get a reference to the container element that will hold our scene
  container = document.querySelector('#scene-container');

  // create a Scene
  scene = new THREE.Scene();

  // Set the background color
  scene.background = new THREE.Color('skyblue');

  // Create a Camera
  const fov = 35; // AKA Field of View
  const aspect = container.clientWidth / container.clientHeight;

  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set(0, 0, 15);
  // //OR
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 10;
  //NOTE: 1 unit = 1 meter is just a convention.

  // create a geometry
  //parameters define the width, height, and depth of the box, respectively.
  const geometry = new THREE.BoxBufferGeometry(2, 2, 2);

  // //ADD FOR TEXTURE
  //   // create a texture loader.
  //   const textureLoader = new THREE.TextureLoader();

  //   // Load a texture. See the note in chapter 4 on working locally, or the page
  //   // https://threejs.org/docs/#manual/introduction/How-to-run-things-locally
  //   // if you run into problems here
  //   const texture = textureLoader.load( '../../imgs/dark-s_pz.jpg' );

  //   // set the "color space" of the texture
  //   texture.encoding = THREE.sRGBEncoding;

  //   // reduce blurring at glancing angles
  //   texture.anisotropy = 16;

  //   // create a Standard material using the texture we just loaded as a color map
  //   const material = new THREE.MeshStandardMaterial( {
  //     map: texture,
  //   } );
  // create a texture loader.
  const textureLoader = new THREE.TextureLoader();

  // Load a texture. See the note in chapter 4 on working locally, or the page
  // https://threejs.org/docs/#manual/introduction/How-to-run-things-locally
  // if you run into problems here
  const texture = textureLoader.load('../../imgs/patricia.jpg');

  // set the "color space" of the texture
  texture.encoding = THREE.sRGBEncoding;

  // reduce blurring at glancing angles
  texture.anisotropy = 16;
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  // create a default (white) Basic material
  //Allows to see things without light
  // const material = new THREE.MeshBasicMaterial({color:0x800080});
  // const material = new THREE.MeshStandardMaterial({ color: 'coral' });

  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh(geometry, material);

  // add the mesh to the scene
  scene.add(mesh);
  //to remove it later, we can use scene.remove( mesh ) method.

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 5.0);

  // move the light back and up a bit
  light.position.set(10, 10, 10);

  // remember to add the light to the scene
  scene.add(light);

  //The next step is to create the renderer, which is a machine that takes your scene and camera as inputs and outputs pretty pictures onto the <canvas> element in your HTML page.
  //WebGL renderer

  // create the renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });

  //use the container to set the size of the canvas and via method calculates the correct width and height in pixels
  renderer.setSize(container.clientWidth, container.clientHeight);
  //correct pixel ratio for the device running the app
  renderer.setPixelRatio(window.devicePixelRatio);

  // add the automatically created <canvas> element to the page
  container.appendChild(renderer.domElement);

  // start the animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}

// function animate() {
//   // call animate recursively
//   requestAnimationFrame(animate);

//     // increase the mesh's rotation each frame
//     mesh.rotation.z += 0.01;
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.01;

//   // render, or 'create a still image', of the scene
//   // this will create one still image / frame each time the animate
//   // function calls itself
//   renderer.render(scene, camera);
// }

//Anything that involves updating the scene should go in here. The only thing that we’re currently updating each frame is the rotation of the mesh, so move those three lines into this function.
function update() {
  // increase the mesh's rotation each frame
  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}
// render, or 'draw a still image', of the scene
function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight);
  console.log('You resized the browser window!');
}

window.addEventListener('resize', onWindowResize);
// function play() {

//   renderer.setAnimationLoop( () => {

//     update();
//     render();

//   } );

// }

// function stop() {

//   renderer.setAnimationLoop( null );

// }
init();
//animate();
