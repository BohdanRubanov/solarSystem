import * as THREE from "three";
import { solarSystem, sphereGeometry } from "./baseObjects";
import { textureLoader } from "./settings";

function createPlanet(name, distance, size, speed, textureFile) {
	const texture = textureLoader.load(`src/textures/${textureFile}`)
	const planetGroup = new THREE.Object3D();
	solarSystem.add(planetGroup);
	const planetMaterial = new THREE.MeshBasicMaterial({
		map: texture
	});
	const planet = new THREE.Mesh(sphereGeometry, planetMaterial);
	planet.position.x = distance;
	planet.scale.set(size, size, size);
	planetGroup.add(planet);
	return { planet, speed, planetGroup, name, distance };
}

export function createOrbit(radius) {
	const orbitGeometry = new THREE.RingGeometry(radius-0.1, radius+0.1, 128)
	const orbitMaterial = new THREE.MeshBasicMaterial(
		{
			color: "rgb(197, 197, 197)", 
			side: THREE.DoubleSide, 
			transparent: true, 
			opacity: 0.6
		})
	const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial)
	orbit.rotation.x = Math.PI/2
	return orbit
}








export const planets = [
	createPlanet("Mercury", 20, 1, 0.04, "2k_mercury.jpg"),
	createPlanet("Venus", 28, 1.5, 0.03, "venusmapthumb.jpg"),
	createPlanet("Earth", 38, 2, 0.02, "earth_atmos_2048.jpg"),
	createPlanet("Mars", 48, 1.5, 0.018, "2k_mars.jpg"),
	createPlanet("Jupiter", 70, 4, 0.01, "2k_jupiter.jpg"),
	createPlanet("Saturn", 90, 3.5, 0.008, "2k_saturn.jpg"),
	createPlanet("Uranus", 115, 2.5, 0.006, "2k_uranus.jpg"),
	createPlanet("Neptune", 135, 2.3, 0.005, "2k_neptune.jpg"),
];

export const planetInfo = {
	Mercury: {
		description:
			"The closest planet to the Sun and the smallest in the Solar System.",
		type: "Rocky",
		diameter: "4,879 km",
		mass: "3.30 × 10^23 kg",
		distance: "57.9 million km (0.387 AU)",
		orbitalPeriod: "88 days",
		temperature: "−173 … +427 °C",
	},
	Venus: {
		description:
			"The second planet from the Sun and the hottest in the Solar System.",
		type: "Rocky",
		diameter: "12,104 km",
		mass: "4.87 × 10^24 kg",
		distance: "108 million km (0.723 AU)",
		orbitalPeriod: "225 days",
		temperature: "≈470 °C",
	},
	Earth: {
		description: "Our home planet, the only known one to support life.",
		type: "Rocky",
		diameter: "12,742 km",
		mass: "5.97 × 10^24 kg",
		distance: "149.6 million km (1 AU)",
		orbitalPeriod: "365 days",
		temperature: "−89 … +58 °C",
	},
	Mars: {
		description:
			"The Red Planet, home to the tallest volcano in the Solar System.",
		type: "Rocky",
		diameter: "6,779 km",
		mass: "6.42 × 10^23 kg",
		distance: "227.9 million km (1.52 AU)",
		orbitalPeriod: "687 days",
		temperature: "−125 … +20 °C",
	},
	Jupiter: {
		description: "The largest planet in the Solar System.",
		type: "Gas giant",
		diameter: "142,984 km",
		mass: "1.90 × 10^27 kg",
		distance: "778.6 million km (5.2 AU)",
		orbitalPeriod: "11.86 years",
		temperature: "≈−145 °C (cloud-top average)",
	},
	Saturn: {
		description: "Famous for its massive rings made of ice and rock.",
		type: "Gas giant",
		diameter: "120,536 km",
		mass: "5.68 × 10^26 kg",
		distance: "1.43 billion km (9.58 AU)",
		orbitalPeriod: "29.5 years",
		temperature: "≈−178 °C",
	},
	Uranus: {
		description: "An ice giant that rotates lying on its side.",
		type: "Ice giant",
		diameter: "50,724 km",
		mass: "8.68 × 10^25 kg",
		distance: "2.87 billion km (19.2 AU)",
		orbitalPeriod: "84 years",
		temperature: "≈−224 °C",
	},
	Neptune: {
		description:
			"The most distant planet, known for its extremely strong winds.",
		type: "Ice giant",
		diameter: "49,244 km",
		mass: "1.02 × 10^26 kg",
		distance: "4.50 billion km (30.1 AU)",
		orbitalPeriod: "165 years",
		temperature: "≈−214 °C",
	},
};
