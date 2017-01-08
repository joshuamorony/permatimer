export class ProjectModel {
	
	constructor(public name: string, 
				public lastChecked: Date, 
				public totalSeconds: number,
				public active: boolean) {

	}

	setName(name: string): void {
		this.name = name;
	}

	setLastChecked(lastChecked: Date): void {
		this.lastChecked = lastChecked;
	}

	addToTotalSeconds(totalSeconds: number): void {
		this.totalSeconds += totalSeconds;
	}

	deductFromTotalSeconds(totalSeconds: number): void {
		this.totalSeconds -= totalSeconds;
	}

	setIsActive(active: boolean): void {
		this.active = active;
	}
}