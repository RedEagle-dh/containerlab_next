import React from 'react';
import { Handle, NodeToolbar, Position } from 'reactflow';

const CustomNode = ({ data }: { data: any }) => (
	<div
		style={{
			width: 100,
			height: 50,
		}}
		className='flex justify-center items-center bg-white border-2 border-blue-500 rounded-lg'
	>
		{data.label}
		<Handle
			type='source'
			position={Position.Right}
			className='bg-black rounded-xl'
			isConnectable={true}
		/>
		<Handle
			type='target'
			position={Position.Left}
			className='bg-black rounded-xl'
			isConnectable={true}
		/>
	</div>
);

export default CustomNode;
