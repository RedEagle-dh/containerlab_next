import devices, { NetworkDevice } from './devices';

export type NetworkStatus = 'Online' | 'Offline';

export interface Network {
	id: string;
	name: string;
	devices: NetworkDevice[];
	status: NetworkStatus;
}

export const networks: Network[] = [
	{
		id: 'FD-01',
		name: 'digsi-roam',
		devices: devices,
		status: 'Online',
	},
];
