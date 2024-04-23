export type Severity = 'Low' | 'Medium' | 'High';

export interface Issue {
	id: string;
	title: string;
	description: string;
	severity: Severity;
}
