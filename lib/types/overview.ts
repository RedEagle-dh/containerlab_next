export type Notification = {
	timestamp: number;
	prefix: string | null;
	alias: string | null;
	atomic: boolean;
	update: Update[];
};

export type Update = {
	path: string;
	val: {
		'openconfig-system:boot-time'?: string;
		'openconfig-system:current-datetime'?: string;
		'openconfig-system:hostname'?: string;
		'openconfig-system:last-configuration-timestamp'?: string;
		'openconfig-system:software-version'?: string;
		'openconfig-interfaces:interface'?: Interface[];
	};
};

export type Interface = {
	config: InterfaceConfig;
	'openconfig-if-ethernet:ethernet': EthernetConfig;
	name: string;
	state: InterfaceState;
	subinterfaces: {
		subinterface: Subinterface[];
	};
};

export type InterfaceConfig = {
	mtu: number;
	name: string;
	type: string;
	description?: string;
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

export type InterfaceState = {
	'admin-status': string;
	management: boolean;
	description?: string;
	counters?: Counters;
	'duplex-mode'?: string;
	'hw-mac-address'?: string;
	'mac-address'?: string;
	'negotiated-duplex-mode'?: string;
	'negotiated-port-speed'?: string;
	'port-speed'?: string;
	'arista-intf-augments:inactive'?: boolean;
	'arista-intf-augments:supported-speeds'?: string[];
	ifindex?: number;
	'last-change'?: string;
	mtu?: number;
	'oper-status'?: string;
	type?: string;
};

export type Counters = {
	'in-crc-errors': string;
	'in-fragment-frames': string;
	'in-jabber-frames': string;
	'in-mac-control-frames': string;
	'in-mac-pause-frames': string;
	'in-maxsize-exceeded': string;
	'in-oversize-frames': string;
	'out-mac-control-frames': string;
	'out-mac-pause-frames': string;
	'carrier-transitions'?: string;
	'in-broadcast-pkts'?: string;
	'in-discards'?: string;
	'in-errors'?: string;
	'in-fcs-errors'?: string;
	'in-multicast-pkts'?: string;
	'in-octets'?: string;
	'in-pkts'?: string;
	'in-unicast-pkts'?: string;
	'out-broadcast-pkts'?: string;
	'out-discards'?: string;
	'out-errors'?: string;
	'out-multicast-pkts'?: string;
	'out-octets'?: string;
	'out-pkts'?: string;
	'out-unicast-pkts'?: string;
};

export type Subinterface = {
	index: number;
	'openconfig-if-ip:ipv4': IPv4Config;
	'openconfig-if-ip:ipv6'?: IPv6Config;
	config?: {
		description?: string;
		enabled?: boolean;
	};
	state?: {
		enabled?: boolean;
		description?: string;
	};
};

export type IPv4Config = {
	addresses: {
		address: IPv4Address[];
	};
	config?: {
		enabled?: boolean;
	};
	state?: {
		enabled?: boolean;
	};
	neighbors?: {
		neighbor: Neighbor[];
	};
};

export type IPv6Config = {
	addresses: {
		address: IPv6Address[];
	};
	neighbors?: {
		neighbor: Neighbor[];
	};
};

export type IPv4Address = {
	config: {
		ip: string;
		'prefix-length': number;
	};
	ip: string;
	state?: {
		ip: string;
		origin: string;
		'prefix-length': number;
		status?: string;
	};
};

export type IPv6Address = {
	config: {
		ip: string;
		'prefix-length': number;
	};
	ip: string;
	state?: {
		ip: string;
		origin: string;
		'prefix-length': number;
		status?: string;
	};
};

export type Neighbor = {
	config: {
		ip: string;
	};
	ip: string;
	state: {
		ip: string;
		'link-layer-address': string;
		origin: string;
		'neighbor-state'?: string;
	};
};

export type NodeData = {
	notification: Notification[];
};

export type ContinuousIntegration = {
	'clab-realnet_continuous_integration-ceos1': NodeData;
	'clab-realnet_continuous_integration-ceos3': NodeData;
};

export type Security = {
	'clab-realnet_security-ceos1': NodeData;
};

export type OverviewMessage = {
	continuous_integration?: ContinuousIntegration;
	security?: Security;
};
