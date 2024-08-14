import { BaseEdge, getStraightPath } from 'reactflow';

export default function CustomEdge({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
}: {
	id: any;
	sourceX: any;
	sourceY: any;
	targetX: any;
	targetY: any;
}) {
	const [edgePath] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge
				id={id}
				path={edgePath}
				style={{ color: 'red' }}
			/>
		</>
	);
}
