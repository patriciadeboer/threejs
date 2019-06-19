import * as THREE from 'three';
// import {
//   THREEE
// } from './js/vendor/three.module.js;

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
//NOTE: Of course, 1 unit = 1 meter is just a convention.

// create a geometry
//parameters define the width, height, and depth of the box, respectively.
const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );

// create a default (white) Basic material
const material = new THREE.MeshBasicMaterial();
