import { type ClassValue, clsx } from 'clsx';
import dagre from 'dagre';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const canvasWidth = 800; // Breite des Canvas
const canvasHeight = 600; // Höhe des Canvas

export function transformToReactFlowFormat(topoObject: any) {
	const { nodes, links } = topoObject.topology.topology;

	const reactFlowNodes = Object.keys(nodes).map((nodeId, index, arr) => {
		const spacing = 200; // Abstand zwischen den Knoten
		const totalLength = spacing * (arr.length - 1);
		const startX = (canvasWidth - totalLength) / 2; // Startposition so berechnen, dass alles zentriert ist
		console.log(nodeId);
		return {
			id: nodeId,
			type: 'custom',
			data: {
				label: `${nodeId}`,
				kind: nodes[nodeId].kind,
				image: nodes[nodeId].image,
				ip: nodes[nodeId].ip,
				mac: nodes[nodeId].mac,
				bandwidth: nodes[nodeId].bandwidth,
			},
			position: { x: startX + index * spacing, y: canvasHeight / 2 }, // Vertikal zentriert, horizontal verteilt
		};
	});

	const reactFlowEdges = links.map((link: any) => ({
		id: `${link.endpoints[0]}_${link.endpoints[1]}`, // Generiert eine eindeutige ID für die Kante
		source: link.endpoints[0].split(':')[0], // Teilt "ceos1:eth1" und nimmt "ceos1"
		target: link.endpoints[1].split(':')[0], // Teilt "ceos3:eth1" und nimmt "ceos3"
		type: 'smoothstep', // Gestaltet die Linienführung der Kanten geschmeidig
	}));
	return {
		nodes: reactFlowNodes,
		edges: reactFlowEdges,
	};
}
