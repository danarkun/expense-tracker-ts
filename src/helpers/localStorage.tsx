export const getData = (key: any): any => {
	if (!localStorage || localStorage.getItem(key) == null) return undefined;

	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null)
			return undefined;
		return JSON.parse(serializedState as string);
	} catch (err) {
		console.error(`Error getting item ${key} from localStorage`, err);
		return undefined;
	}
};

export const storeData = (key: string, state: any) => {
	if (!localStorage) return;

	console.log("Saving storage");
	try {
		return localStorage.setItem(key, JSON.stringify(state));
	} catch (err) {
		console.error(`Error storing item ${key} to localStorage`, err);
	}
};
