import { planets, planetInfo, createOrbit } from "./planets";
import { camera, renderer, scene } from "./settings";
import { createStar, starsArray } from "./stars";
import { createParticles, glow, sun, particleArray } from "./sun";
import { solarSystem } from './baseObjects'
import $ from "jquery";
import * as THREE from "three";

$(() => {
	function addInfo(planet){
		const info = planetInfo[planet]
		$("#planetName").text(planet)
		$("#planetDescription").text(info.description)
		$("#planetType").text(info.type)
		$("#planetDiameter").text(info.diameter)
		$("#planetWeight").text(info.weight)
		$("#planetDistance").text(info.distance)
		$("#orbitalPeriod").text(info.orbitalPeriod)
		$("#planetTemperature").text(info.temperature)
		$("#panel").fadeIn(500)
		
	}
	const buttonsDiv = $("<div>").addClass("buttons");
	$("body").append(buttonsDiv);
	let chosenPlanet = null;
	planets.forEach((planet) => {
		solarSystem.add(createOrbit(planet.distance))
		const button = $("<button>")
			.text(planet.name)
			.addClass("button")
			.on("click", () => {
				chosenPlanet = planet.planet;
				addInfo(planet.name)
			});
		buttonsDiv.append(button);
	});
	const sunButton = $("<button>")
		.text("Sun")
		.addClass("button")
		.on("click", () => {
			chosenPlanet = null;
			$("#panel").fadeOut(500)
		});
	buttonsDiv.append(sunButton);

	createStar();
	createParticles();
	let time = 0;
	let initialPositionZ = 70;

	$(window).on("wheel", (event) => {
		const y = event.originalEvent.deltaY;
		initialPositionZ += y * 0.1;
		initialPositionZ = Math.max(10, Math.min(200, initialPositionZ));
	});
	let cameraZ = 50;
	function animate() {
		time += 0.01;
		if (chosenPlanet) {
			const vector = new THREE.Vector3();
			chosenPlanet.getWorldPosition(vector);
			

			camera.position.x = vector.x + Math.cos(time) * 20;
			camera.position.y = vector.y + 10;
			camera.position.z = vector.z + Math.sin(time) * 20;
			camera.lookAt(vector);
		} else {
			cameraZ += (initialPositionZ - cameraZ) * 0.05;
			camera.position.x = cameraZ;
			camera.position.z = cameraZ;

			camera.lookAt(0, 0, 0);
		}

		// chosenPlanet.getWorldPosition()

		const sinus = 1 + Math.sin(time * 2) * 0.05;
		sun.scale.set(5 * sinus, 5 * sinus, 5 * sinus);
		glow.scale.set(5 * sinus, 5 * sinus, 1);
		glow.material.opacity = sinus;
		planets.forEach((planet) => {
			planet.planet.add(createOrbit())
			planet.planetGroup.rotation.y += planet.speed;
			planet.planet.rotation.y += planet.speed * Math.PI;

		});
		starsArray.forEach((star) => {
			const positions = star.geometry.attributes.position.array;
			for (let counter = 2; counter < positions.length; counter += 3) {
				positions[counter] += 0.5;
				if (positions[counter] > 500) {
					positions[counter] = -500;
				}
			}
			star.geometry.attributes.position.needsUpdate = true;
		});
		particleArray.forEach((part) => {
			const positions = part.geometry.attributes.position.array;
			for (let counter = 0; counter < positions.length; counter += 3) {
				positions[counter] += positions[counter] * 0.01;
				positions[counter + 1] += positions[counter + 1] * 0.01;
				positions[counter + 2] += positions[counter + 2] * 0.01;

				if (
					positions[counter] > 20 ||
					positions[counter + 1] > 20 ||
					positions[counter + 2] > 20
				) {
					positions[counter] = (Math.random() - 0.5) * 15;
					positions[counter + 1] = (Math.random() - 0.5) * 15;
					positions[counter + 2] = (Math.random() - 0.5) * 15;
				}
			}
			part.geometry.attributes.position.needsUpdate = true;
		});

		renderer.render(scene, camera);
	}
	renderer.setAnimationLoop(animate);
});
