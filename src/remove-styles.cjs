const { writeFileSync, mkdirSync } = require('fs');
const path = require("path");
const { find } = require("find-in-files");

const USAGE_PATTERN = /((.|\n)*)(?=<style)/;
const SOURCE_FOLDER = path.join(__dirname, 'lib');
console.log(SOURCE_FOLDER);

(async () => {
    const searchResults = await find(USAGE_PATTERN, SOURCE_FOLDER, '.svelte$');
    mkdirSync(path.join(__dirname, 'lib', 'no-styles'), { recursive: true })
		console.log(searchResults)

    Object.keys(searchResults).forEach((key) => {
        let fileName = path.basename(key)
        if (fileName === 'Select.svelte') {
            searchResults[key].matches[0] = searchResults[key].matches[0].replace('./filter', '../filter');
            searchResults[key].matches[0] = searchResults[key].matches[0].replace('./get-items', '../get-items');
        }
				const newPath = path.join(__dirname, 'lib', 'no-styles', fileName)
				console.log('NEWPATH:', newPath)
        writeFileSync(newPath, searchResults[key].matches[0])
    });
})();
