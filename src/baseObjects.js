import * as THREE from "three";
import { scene } from "./settings";

const sphereRadius = 1;
const sphereWidth = 128;
const sphereHeight = 128;

export const sphereGeometry = new THREE.SphereGeometry(
	sphereRadius, sphereWidth, sphereHeight
);

export const solarSystem = new THREE.Object3D();
scene.add(solarSystem);