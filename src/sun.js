import * as THREE from "three";
import { textureLoader } from "./settings";
import { solarSystem, sphereGeometry } from "./baseObjects";

const texture = textureLoader.load("src/textures/sunGlow.png");
const glowMaterial = new THREE.SpriteMaterial({
	map: texture,
	blending: THREE.AdditiveBlending,
	transparent: true,
	opacity: 0.5
});

export const glow = new THREE.Sprite(glowMaterial);
glow.scale.set(5,5,5)
const sunMaterial = new THREE.MeshBasicMaterial({ color: "rgb(253, 194, 0)" });
export const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.set(5, 5, 5);
sun.add(glow);
solarSystem.add(sun);

export const particleArray = [];

export function createParticles() {
	const geom = new THREE.BufferGeometry();

    const positions = [];

	for (let pos = 0; pos <= 2000; pos++) {
		positions.push(
			(Math.random() - 0.5) * 15,
			(Math.random() - 0.5) * 15,
			(Math.random() - 0.5) * 15,
		);
	}
    
	geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
	
	const material = new THREE.PointsMaterial({
		map: texture,
		size: 0.2,
		transparent: true,
		blending: THREE.AdditiveBlending,
		opacity: 0.7,
		depthWrite: false
	});

	const particles = new THREE.Points(geom, material);
	particleArray.push(particles)
	solarSystem.add(particles);
};