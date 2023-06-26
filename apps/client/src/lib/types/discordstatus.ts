export interface DiscordStatus {
	page: Page;
	status: Status;
	components: Component[];
	incidents: Incident[];
	scheduled_maintenances: ScheduledMaintenance[];
}

export interface Page {
	id: string;
	name: string;
	url: string;
	updated_at: string;
}

export interface Status {
	description: string;
	indicator: string;
}

export interface Component {
	created_at: string;
	description: string | null;
	id: string;
	name: string;
	page_id: string;
	position: number;
	status: string;
	updated_at: string;
}

export interface Incident {
	created_at: string;
	id: string;
	impact: string;
	incident_updates: IncidentUpdate[];
	monitoring_at: string | null;
	name: string;
	page_id: string;
	resolved_at: string | null;
	shortlink: string;
	status: string;
	updated_at: string;
}

export interface IncidentUpdate {
	body: string;
	created_at: string;
	display_at: string;
	id: string;
	incident_id: string;
	status: string;
	updated_at: string;
}

export interface ScheduledMaintenance {
	created_at: string;
	id: string;
	impact: string;
	incident_updates: IncidentUpdate2[];
	monitoring_at: string | null;
	name: string;
	page_id: string;
	resolved_at: string | null;
	scheduled_for: string;
	scheduled_until: string;
	shortlink: string;
	status: string;
	updated_at: string;
}

export interface IncidentUpdate2 {
	body: string;
	created_at: string;
	display_at: string;
	id: string;
	incident_id: string;
	status: string;
	updated_at: string;
}
