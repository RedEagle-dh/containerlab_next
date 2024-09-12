'use client';

import { cn, transformToReactFlowFormat } from '@/lib/utils';
import Chart from 'react-apexcharts';
import ReactFlow, {
	addEdge,
	Background,
	BaseEdge,
	Controls,
	Edge,
	MiniMap,
	useEdgesState,
	useNodesState,
} from 'reactflow';
import { isEqual } from 'lodash';
import CustomNode from '../components/CustomNode';
import dagre from 'dagre';
import CustomEdge from '../components/CustomEdge';
import { useCallback, useEffect, useState } from 'react';

import { socket } from '../components/socket';

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
import { InterfaceState, OverviewMessage } from '@/lib/types/overview';
const edgeTypes = {
	'custom-edge': CustomEdge,
};

const nodeTypes = { custom: CustomNode };
export default function Home() {
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

	const inOctetsChartConfig: any = {
		type: 'line',
		height: 240,
		series: [
			{
				name: 'in-octets',
				data: [
					1024000, 1100000, 1150000, 1200000, 1250000, 1300000,
					1350000, 1400000, 1450000,
				],
			},
		],
		options: {
			chart: {
				toolbar: {
					show: false,
				},
			},
			title: {
				show: false,
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
					'Jan',
					'Feb',
					'Mar',
					'Apr',
					'May',
					'Jun',
					'Jul',
					'Aug',
					'Sep',
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

	const nodes = [
		{
			id: '1',
			type: 'customNode', // Custom Node Type
			data: {
				label: 'Node 1',
				style: {
					backgroundColor: '#ffffff', // White background for minimalism
					borderRadius: '8px', // Rounded corners for modern look
					padding: '10px',
					boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
					color: '#333', // Dark text for contrast
				},
			},
			position: { x: 50, y: 100 },
		},
		{
			id: '2',
			type: 'customNode',
			data: {
				label: 'Node 2',
				style: {
					backgroundColor: '#f7f9fc', // Light gray for variation
					borderRadius: '8px',
					padding: '10px',
					boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
					color: '#333',
				},
			},
			position: { x: 250, y: 100 },
		},
	];

	const edges: Edge[] = [
		{
			id: 'e1-2',
			source: '1',
			target: '2',
			type: 'straight', // Simple straight line for minimalism
			style: {
				stroke: '#777', // Gray color for neutral style
				strokeWidth: 2, // Thin line
			},
		},
	];

	const node1: InterfaceState = {
		'admin-status': 'up',
		management: true,
		description: 'Uplink to Core Switch',
		counters: {
			'in-crc-errors': '0',
			'in-fragment-frames': '0',
			'in-jabber-frames': '0',
			'in-mac-control-frames': '15',
			'in-mac-pause-frames': '3',
			'in-maxsize-exceeded': '0',
			'in-oversize-frames': '1',
			'out-mac-control-frames': '10',
			'out-mac-pause-frames': '5',
			'carrier-transitions': '3',
			'in-broadcast-pkts': '2000',
			'in-discards': '0',
			'in-errors': '0',
			'in-fcs-errors': '0',
			'in-multicast-pkts': '1500',
			'in-octets': '1024000',
			'in-pkts': '100000',
			'in-unicast-pkts': '75000',
			'out-broadcast-pkts': '1500',
			'out-discards': '0',
			'out-errors': '0',
			'out-multicast-pkts': '1200',
			'out-octets': '2048000',
			'out-pkts': '150000',
			'out-unicast-pkts': '125000',
		},
		'duplex-mode': 'full',
		'hw-mac-address': '00:1A:2B:3C:4D:5E',
		'mac-address': '00:1A:2B:3C:4D:5E',
		'negotiated-duplex-mode': 'full',
		'negotiated-port-speed': '1Gbps',
		'port-speed': '1Gbps',
		'arista-intf-augments:inactive': false,
		'arista-intf-augments:supported-speeds': ['100Mbps', '1Gbps', '10Gbps'],
		ifindex: 1,
		'last-change': '2024-08-23T12:34:56Z',
		mtu: 1500,
		'oper-status': 'up',
		type: 'ethernetCsmacd',
	};

	const node2: InterfaceState = {
		'admin-status': 'down',
		management: false,
		description: 'Server Connection - Port 1',
		counters: {
			'in-crc-errors': '5',
			'in-fragment-frames': '2',
			'in-jabber-frames': '0',
			'in-mac-control-frames': '0',
			'in-mac-pause-frames': '0',
			'in-maxsize-exceeded': '0',
			'in-oversize-frames': '0',
			'out-mac-control-frames': '8',
			'out-mac-pause-frames': '4',
			'carrier-transitions': '1',
			'in-broadcast-pkts': '1500',
			'in-discards': '1',
			'in-errors': '3',
			'in-fcs-errors': '2',
			'in-multicast-pkts': '1300',
			'in-octets': '2048000',
			'in-pkts': '90000',
			'in-unicast-pkts': '60000',
			'out-broadcast-pkts': '1200',
			'out-discards': '1',
			'out-errors': '2',
			'out-multicast-pkts': '1000',
			'out-octets': '4096000',
			'out-pkts': '140000',
			'out-unicast-pkts': '110000',
		},
		'duplex-mode': 'half',
		'hw-mac-address': '00:1F:2E:3D:4C:5B',
		'mac-address': '00:1F:2E:3D:4C:5B',
		'negotiated-duplex-mode': 'half',
		'negotiated-port-speed': '100Mbps',
		'port-speed': '100Mbps',
		'arista-intf-augments:inactive': true,
		'arista-intf-augments:supported-speeds': ['10Mbps', '100Mbps', '1Gbps'],
		ifindex: 2,
		'last-change': '2024-08-22T10:22:45Z',
		mtu: 9000,
		'oper-status': 'down',
		type: 'ethernetCsmacd',
	};

	const overviewData = [node1, node2];

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
								<div className='flex gap-2'>
									<div>
										<Select>
											<SelectTrigger className=''>
												<SelectValue placeholder='Select a field' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														Counter Fields
													</SelectLabel>
													<SelectItem value='in-crc-errors'>
														In CRC Errors
													</SelectItem>
													<SelectItem value='in-fragment-frames'>
														In Fragment Frames
													</SelectItem>
													<SelectItem value='in-jabber-frames'>
														In Jabber Frames
													</SelectItem>
													<SelectItem value='in-mac-control-frames'>
														In MAC Control Frames
													</SelectItem>
													<SelectItem value='in-mac-pause-frames'>
														In MAC Pause Frames
													</SelectItem>
													<SelectItem value='in-maxsize-exceeded'>
														In Maxsize Exceeded
													</SelectItem>
													<SelectItem value='in-oversize-frames'>
														In Oversize Frames
													</SelectItem>
													<SelectItem value='out-mac-control-frames'>
														Out MAC Control Frames
													</SelectItem>
													<SelectItem value='out-mac-pause-frames'>
														Out MAC Pause Frames
													</SelectItem>
													<SelectItem value='carrier-transitions'>
														Carrier Transitions
													</SelectItem>
													<SelectItem value='in-broadcast-pkts'>
														In Broadcast Packets
													</SelectItem>
													<SelectItem value='in-discards'>
														In Discards
													</SelectItem>
													<SelectItem value='in-errors'>
														In Errors
													</SelectItem>
													<SelectItem value='in-fcs-errors'>
														In FCS Errors
													</SelectItem>
													<SelectItem value='in-multicast-pkts'>
														In Multicast Packets
													</SelectItem>
													<SelectItem value='in-octets'>
														In Octets
													</SelectItem>
													<SelectItem value='in-pkts'>
														In Packets
													</SelectItem>
													<SelectItem value='in-unicast-pkts'>
														In Unicast Packets
													</SelectItem>
													<SelectItem value='out-broadcast-pkts'>
														Out Broadcast Packets
													</SelectItem>
													<SelectItem value='out-discards'>
														Out Discards
													</SelectItem>
													<SelectItem value='out-errors'>
														Out Errors
													</SelectItem>
													<SelectItem value='out-multicast-pkts'>
														Out Multicast Packets
													</SelectItem>
													<SelectItem value='out-octets'>
														Out Octets
													</SelectItem>
													<SelectItem value='out-pkts'>
														Out Packets
													</SelectItem>
													<SelectItem value='out-unicast-pkts'>
														Out Unicast Packets
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Select>
											<SelectTrigger className=''>
												<SelectValue placeholder='Select a network' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='realnet'>
													Realnet
												</SelectItem>
												<SelectItem value='security'>
													Security
												</SelectItem>
												<SelectItem value='continuous_integration'>
													Continuous Integration
												</SelectItem>
												<SelectItem value='traffic_engineering'>
													Traffic Engineering
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
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
							</div>
						</CardHeader>
						<CardContent>
							<Chart {...inOctetsChartConfig} />
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
							<div className='mb-2'>
								<Select>
									<SelectTrigger className=''>
										<SelectValue placeholder='Select a network' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='realnet'>
											Realnet
										</SelectItem>
										<SelectItem value='security'>
											Security
										</SelectItem>
										<SelectItem value='continuous_integration'>
											Continuous Integration
										</SelectItem>
										<SelectItem value='traffic_engineering'>
											Traffic Engineering
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
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
							<div className='flex items-center justify-between'>
								{/* Angepasste Überschrift "Data" */}
								<h2 className='text-2xl font-bold text-gray-900'>
									Node Data Overview
								</h2>
								{/* Dropdown für die Auswahl eines Nodes */}
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
						{/* Card Content mit Scrollfunktion und max-Höhe */}
						<CardContent className='p-6 bg-white rounded-lg shadow-md max-h-[500px] overflow-y-auto overflow-x-auto'>
							{overviewData.map((node, index) => (
								<div
									key={`node-${index}`}
									className='mb-8'
								>
									{/* Node Titel */}
									<h3 className='text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4'>
										{`Node ${index + 1}`}
									</h3>

									<div className='space-y-3'>
										{Object.entries(node).map(
											([key, value], subIndex) => (
												<div key={`key-${subIndex}`}>
													{/* Überprüfen, ob der Wert ein verschachteltes Objekt ist */}
													{typeof value ===
														'object' &&
													value !== null &&
													!Array.isArray(value) ? (
														<div className='mb-4'>
															{/* Parent Key als Überschrift */}
															<h4 className='text-md font-medium text-gray-700 mb-2'>
																{key}
															</h4>
															<div className='ml-4 border-l-2 border-gray-200 pl-4 space-y-1'>
																{/* Rendern der verschachtelten Schlüssel-Wert-Paare */}
																{Object.entries(
																	value
																).map(
																	([
																		subKey,
																		subValue,
																	]) => (
																		<p
																			key={`sub-${subKey}`}
																			className='text-sm text-gray-600'
																		>
																			<span className='font-semibold'>
																				{
																					subKey
																				}

																				:
																			</span>{' '}
																			{
																				subValue
																			}
																		</p>
																	)
																)}
															</div>
														</div>
													) : (
														// Normales Rendering für primitive Typen (string, number, boolean)
														<p className='text-sm text-gray-700'>
															<span className='font-semibold'>
																{key}:
															</span>{' '}
															{typeof value ===
															'boolean'
																? value
																	? 'true'
																	: 'false'
																: value}
														</p>
													)}
												</div>
											)
										)}
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
