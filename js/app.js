// import * as THREE from 'three';
import {
  THREE
} from './js/vendor/three.module.js'

// Get a reference to the container element that will hold our scene
const container = document.querySelector( '#scene-container' );

// create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color( 'skyblue' );

// Create a Camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;

const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera( fov, aspect, near, far )

// every object is initially created at ( 0, 0, 0 )
// we'll move the camera back a bit so that we can view the scene
camera.position.set( 0, 0, 10 );
// //OR
// camera.position.x = 0;
// camera.position.y = 0;
// camera.position.z = 10;
//NOTE: 1 unit = 1 meter is just a convention.

// create a geometry
//parameters define the width, height, and depth of the box, respectively.
const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

// create a default (white) Basic material
//Allows to see things without light
const material = new THREE.MeshBasicMaterial();

// create a Mesh containing the geometry and material
const mesh = new THREE.Mesh( geometry, material );

// add the mesh to the scene
scene.add( mesh )
//to remove it later, we can use scene.remove( mesh ) method.

//The next step is to create the renderer, which is a machine that takes your scene and camera as inputs and outputs pretty pictures onto the <canvas> element in your HTML page.
//WebGL renderer

// create the renderer
const renderer = new THREE.WebGLRenderer();

//use the container to set the size of the canvas and via method calculates the correct width and height in pixels
renderer.setSize( container.clientWidth, container.clientHeight );
//correct pixel ratio for the device running the app
renderer.setPixelRatio( window.devicePixelRatio );

// add the automatically created <canvas> element to the page
container.appendChild( renderer.domElement );

// render, or 'create a still image', of the scene
renderer.render( scene, camera );
