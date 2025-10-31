import * as THREE from "three";



export const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
export const scene = new THREE.Scene();

// field of view
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

export const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 50;
camera.position.y = 20;

export const textureLoader = new THREE.TextureLoader()
