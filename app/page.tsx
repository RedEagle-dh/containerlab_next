'use client';

import { cn, transformToReactFlowFormat } from '@/lib/utils';
import Chart from 'react-apexcharts';
import ReactFlow, {
	addEdge,
	Background,
	BaseEdge,
	Controls,
	MiniMap,
	useEdgesState,
	useNodesState,
} from 'reactflow';
import { isEqual } from 'lodash';
import CustomNode from './components/CustomNode';
import dagre from 'dagre';
import CustomEdge from './components/CustomEdge';
import { useCallback, useEffect, useState } from 'react';

import { socket } from './components/socket';

import 'reactflow/dist/style.css';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
const edgeTypes = {
	'custom-edge': CustomEdge,
};

const nodeTypes = { custom: CustomNode };
export default function Home() {
	// TODO receive this object from the backend via websockets
	const topoObject = {
		topology: {
			name: 'realnet_continuous_integration',
			topology: {
				nodes: {
					ceos1: {
						kind: 'ceos',
						image: 'ceos:latest',
						ip: '192.168.1.1',
						mac: '00:1B:44:11:3A:B7',
						bandwidth: '1Gbps',
						visible: false,
					},
					ceos3: {
						kind: 'ceos',
						image: 'ceos:latest',
						ip: '192.168.1.2',
						mac: '00:1B:44:11:3A:B8',
						bandwidth: '1Gbps',
						visible: false,
					},
				},
				links: [
					{
						endpoints: ['ceos1:eth1', 'ceos3:eth1'],
					},
				],
			},
		},
		nodes: {
			ceos1: {},
			ceos3: {},
		},
		interfaces: {
			gnmi: '<not serializable>',
		},
	};
	const { toast } = useToast();
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [mapNodes, setMapNodes] = useState<any>();
	const [mapEdges, setMapEdges] = useState<any>();

	const [changes, setChanges] = useState<boolean>(false);

	const [isConnected, setIsConnected] = useState(false);
	const [transport, setTransport] = useState('N/A');

	useEffect(() => {
		if (socket.connected) {
			onConnect();
		}

		function onConnect() {
			console.log('Connected');
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);

			socket.io.engine.on('upgrade', (transport) => {
				setTransport(transport.name);
			});
		}

		function onDisconnect() {
			console.log('Disconnected');
			setIsConnected(false);
			setTransport('N/A');
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);

		socket.on('data', (data) => {
			console.log('Received data:', data);
			const json = transformToReactFlowFormat(JSON.parse(data));
			console.log(JSON.stringify(mapNodes));
			console.log(JSON.stringify(json.nodes));
			console.log(
				JSON.stringify(json.edges) !== JSON.stringify(mapEdges) ||
					JSON.stringify(json.nodes) !== JSON.stringify(mapNodes)
			);
			if (
				JSON.stringify(json.edges) !== JSON.stringify(mapEdges) ||
				JSON.stringify(json.nodes) !== JSON.stringify(mapNodes)
			) {
				setChanges(true);
				setMapEdges(json.edges);
				setMapNodes(json.nodes);
			}
		});

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
		};
	}, [mapEdges, mapNodes]);

	useEffect(() => {
		if (changes) {
			toast({
				title: 'You have unloaded changes',
				description: 'New topology data has been received',
				action: (
					<ToastAction
						altText='Try again'
						onClick={reload}
					>
						Reload
					</ToastAction>
				),
			});
		}
	}, [changes]);

	const reload = () => {
		setChanges(false);
		setNodes(mapNodes || []);
		setEdges(mapEdges || []);
	};

	const [selectedNode, setSelectedNode] = useState<any>(null);

	const onNodeClick = (event: any, element: any) => {
		setSelectedNode(element);
		console.log(element);
	};
	const onConnect = useCallback(
		(connection: any) => {
			const edge = { ...connection, type: 'custom-edge' };
			setEdges((eds) => addEdge(edge, eds));
		},
		[setEdges]
	);

	const gridClass = selectedNode ? 'grid-cols-2' : 'grid-cols-1';

	const chartConfig: any = {
		type: 'line',
		height: 240,
		series: [
			{
				name: 'Sales',
				data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
			},
		],
		options: {
			chart: {
				toolbar: {
					show: false,
				},
			},
			title: {
				show: '',
			},
			dataLabels: {
				enabled: false,
			},
			colors: ['#020617'],
			stroke: {
				lineCap: 'round',
				curve: 'smooth',
			},
			markers: {
				size: 0,
			},
			xaxis: {
				axisTicks: {
					show: false,
				},
				axisBorder: {
					show: false,
				},
				labels: {
					style: {
						colors: '#616161',
						fontSize: '12px',
						fontFamily: 'inherit',
						fontWeight: 400,
					},
				},
				categories: [
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
					'Oct',
					'Nov',
					'Dec',
				],
			},
			yaxis: {
				labels: {
					style: {
						colors: '#616161',
						fontSize: '12px',
						fontFamily: 'inherit',
						fontWeight: 400,
					},
				},
			},
			grid: {
				show: true,
				borderColor: '#dddddd',
				strokeDashArray: 5,
				xaxis: {
					lines: {
						show: true,
					},
				},
				padding: {
					top: 5,
					right: 20,
				},
			},
			fill: {
				opacity: 0.8,
			},
			tooltip: {
				theme: 'dark',
			},
		},
	};

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2022, 0, 20),
		to: addDays(new Date(2022, 0, 20), 20),
	});

	return (
		<div className='grid grid-cols-[2fr,1fr] gap-4 p-4 h-screen'>
			<div className='flex flex-col p-4 gap-8'>
				<div className='flex-grow-[3] border border-gray-200 rounded-lg'>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						style={{
							width: '100%',
							height: '100%',
						}}
						edgeTypes={edgeTypes}
						nodeTypes={nodeTypes}
						onNodesChange={onNodesChange}
						onConnect={onConnect}
						onEdgesChange={onEdgesChange}
						onNodeClick={onNodeClick}
						fitView
					>
						<Controls />
						<Background
							color='#aaa'
							gap={16}
						/>
					</ReactFlow>
				</div>
				<div className='flex-grow'>
					<Card>
						<CardHeader>
							<div className='flex justify-between'>
								<h2 className='text-2xl font-semibold'>
									Timeline
								</h2>
								{/* create a dropdown menu with these items: "all", every single node from the network topo */}
								<div className={cn('grid gap-2')}>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												id='date'
												variant={'outline'}
												className={cn(
													'w-[300px] justify-start text-left font-normal',
													!date &&
														'text-muted-foreground'
												)}
											>
												<CalendarIcon className='mr-2 h-4 w-4' />
												{date?.from ? (
													date.to ? (
														<>
															{format(
																date.from,
																'LLL dd, y'
															)}{' '}
															-{' '}
															{format(
																date.to,
																'LLL dd, y'
															)}
														</>
													) : (
														format(
															date.from,
															'LLL dd, y'
														)
													)
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent
											className='w-auto p-0'
											align='start'
										>
											<Calendar
												initialFocus
												mode='range'
												defaultMonth={date?.from}
												selected={date}
												onSelect={setDate}
												numberOfMonths={2}
											/>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Chart {...chartConfig} />
						</CardContent>
					</Card>
				</div>
			</div>
			<div className='flex flex-col h-screen p-4 gap-4'>
				<div className='flex-none'>
					<Card>
						<CardHeader>
							<h2 className='text-2xl font-semibold'>Actions</h2>
						</CardHeader>
						<CardContent>
							<div className='flex gap-4'>
								<div>
									<Button>Start</Button>
								</div>
								<div>
									<Button>Refresh</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className='flex-grow'>
					<Card className=''>
						<CardHeader>
							<div className='flex justify-between'>
								<h2 className='text-2xl font-semibold'>Data</h2>
								<Select>
									<SelectTrigger className='w-[180px]'>
										<SelectValue placeholder='Select a node' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Nodes</SelectLabel>
											<SelectItem value='all'>
												All
											</SelectItem>
											<SelectItem value='node_1'>
												Node 1
											</SelectItem>
											<SelectItem value='node_2'>
												Node 2
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</CardHeader>
						<CardContent>
							{/* create a list without points or numbers */}
							<ul className='list-none'>
								<li>
									<span className='font-semibold'>Name:</span>{' '}
									{topoObject.topology.name}
								</li>
								<li>
									<span className='font-semibold'>
										Nodes:
									</span>{' '}
									{
										Object.keys(
											topoObject.topology.topology.nodes
										).length
									}
								</li>
								<li>
									<span className='font-semibold'>
										Links:
									</span>{' '}
									{topoObject.topology.topology.links.length}
								</li>
								<li>
									<span className='font-semibold'>
										Interfaces:
									</span>{' '}
									{Object.keys(topoObject.interfaces).length}
								</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
