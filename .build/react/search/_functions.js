export const toggleThemeSelection = (props) => {
	const { entryId, setSelectedThemes } = props;

	setSelectedThemes((currentSelectedThemes) => {
		if (currentSelectedThemes.includes(entryId)) {
			return currentSelectedThemes.filter((id) => id !== entryId);
		} else {
			return [...currentSelectedThemes, entryId];
		}
	});
};
