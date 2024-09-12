export type TopologyBuildRequest = {
	type: 'topology build request';
	source: string;
	sibling: string;
};

export type TopologyBuildResponse = {
	type: 'topology build response';
	source: string;
	sibling: string;
	topology: {
		name: string;
		topology: {
			nodes: Record<string, NodeInfo>;
			links: Link[];
		};
	};
	nodes: Record<string, {}>;
	interfaces: {
		gnmi: string; // or use a more specific type if needed
	};
	running: boolean;
};

export type NodeInfo = {
	kind: string;
	image: string;
};

export type Link = {
	endpoints: string[];
};

export type GNMINotification = {
	type: 'gNMI notification';
	source: string;
	node: string;
	path: string;
	data: {
		notification: GNMINotificationDetail[];
	};
	diff: Diff;
};

export type GNMINotificationDetail = {
	timestamp: number;
	prefix: string | null;
	alias: string | null;
	atomic: boolean;
	update?: Update[];
};

export type Update = {
	path: string;
	val: {
		'openconfig-interfaces:config'?: InterfaceConfig;
		'openconfig-if-ethernet:ethernet'?: EthernetConfig;
		'openconfig-interfaces:name'?: string;
		'openconfig-interfaces:subinterfaces'?: Subinterfaces;
	};
};

export type Diff = {
	type_changes?: string; // Adjust type as needed
	dictionary_item_added?: string; // Adjust type as needed
};

export type InterfaceConfig = {
	mtu: number;
	name: string;
	type: string;
};

export type EthernetConfig = {
	config: {
		'arista-intf-augments:fec-encoding': {
			disabled: boolean;
			'fire-code': boolean;
			'reed-solomon': boolean;
			'reed-solomon544': boolean;
		};
		'mac-address': string;
		'port-speed': string;
		'arista-intf-augments:sfp-1000base-t': boolean;
	};
};

export type Subinterfaces = {
	subinterface: Subinterface[];
};

export type Subinterface = {
	index: number;
	'openconfig-if-ip:ipv4'?: IPv4Config;
};

export type IPv4Config = {
	addresses: {
		address: IPv4Address[];
	};
	config?: {
		enabled?: boolean;
	};
};

export type IPv4Address = {
	config: {
		ip: string;
		'prefix-length': number;
	};
	ip: string;
};
