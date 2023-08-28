const { existsSync, readdirSync, unlinkSync, lstatSync, rmdirSync } = require('fs');
const path = require("path");

// recursive remove folder that works on windows too
function removeFolderSync(folderPath) {
	if (!existsSync(folderPath)) return;
	readdirSync(folderPath).forEach(element => {
		const elementAbs = path.join(folderPath, element);

		if (lstatSync(elementAbs).isDirectory()) removeFolderSync(elementAbs);
		else unlinkSync(elementAbs);
	});
	rmdirSync(folderPath);
}

(async () => {
		const noStylesPath = path.join(__dirname, '/lib/no-styles')
		// console.log(noStylesPath)
		removeFolderSync(noStylesPath)
})();
