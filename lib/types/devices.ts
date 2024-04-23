import { Issue } from './issues';

export type DeviceStatus = 'Online' | 'Offline';
export type DeviceType =
	| 'Router'
	| 'Switch'
	| 'Server'
	| 'AccessPoint'
	| 'Workstation'
	| 'Printer';

export interface NetworkDevice {
	id: string;
	type: DeviceType;
	ip: string;
	status: DeviceStatus;
	issues?: Issue[]; // Optional, falls keine Issues vorhanden sind
}

const devices: NetworkDevice[] = [
	{
		id: 'FD-RT-01',
		type: 'Router',
		ip: '10.0.0.1',
		status: 'Online',
	},
	{
		id: 'FD-SW-01',
		type: 'Switch',
		ip: '10.0.0.2',
		status: 'Online',
		issues: [
			{
				id: '1',
				title: 'Packet Loss',
				description: 'Packets are being dropped',
				severity: 'High',
			},
			{
				id: '2',
				title: 'High Latency',
				description: 'Network latency is too high',
				severity: 'Medium',
			},
		],
	},
	{
		id: 'FD-SW-04',
		type: 'Switch',
		ip: '10.0.0.2',
		status: 'Online',
		issues: [
			{
				id: '1',
				title: 'Packet Loss',
				description: 'Packets are being dropped',
				severity: 'High',
			},
			{
				id: '2',
				title: 'High Latency',
				description: 'Network latency is too high',
				severity: 'Medium',
			},
		],
	},
	{
		id: 'FD-SV-01',
		type: 'Server',
		ip: '10.0.0.100',
		status: 'Offline',
	},
	{
		id: 'FD-AP-01',
		type: 'AccessPoint',
		ip: '10.0.0.50',
		status: 'Online',
		issues: [
			{
				id: '6',
				title: 'High Temperature',
				description: 'Device temperature is too high',
				severity: 'High',
			},
		],
	},
	{
		id: 'FD-WS-01',
		type: 'Workstation',
		ip: '10.0.0.150',
		status: 'Online',
		issues: [
			{
				id: '3',
				title: 'Low Bandwidth',
				description: 'Network bandwidth is too low',
				severity: 'Low',
			},
			{
				id: '4',
				title: 'Intermittent Connectivity',
				description: 'Network connectivity is intermittent',
				severity: 'Low',
			},
		],
	},
	{
		id: 'FD-PR-01',
		type: 'Printer',
		ip: '',
		status: 'Offline',
		issues: [
			{
				id: '5',
				title: 'No Signal',
				description: 'No network signal is detected',
				severity: 'High',
			},
		],
	},
	// ... Weitere Geräte ...
];

export default devices;
