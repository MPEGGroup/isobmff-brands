import fs from 'fs'

if (process.argv.length < 3) {
	console.log("usage: node brand-spec-check.js <brand definition>");
	process.exit(-1);
}

const brandDefinition = JSON.parse(fs.readFileSync(process.argv[2]+".json"));
// console.log(brandDefinition);
console.log("Analyzing brand definition \""+brandDefinition.brand+"\" against spec edition "+brandDefinition.edition+".");
console.log("- Found "+brandDefinition.requiredBoxSupport.length+" boxes in the given brand definition.");

let boxDefinitions = {};
for (let editionIndex = 1; editionIndex<=brandDefinition.edition; editionIndex++) {
	console.log("Loading edition "+editionIndex);
	let edition = JSON.parse(fs.readFileSync("edition"+editionIndex+".json"));
//	console.log(edition);
	console.log("Found "+Object.keys(edition.boxes).length+" boxes.");
	const keys = Object.keys(edition.boxes);
	for (const b in keys) {
		const key = keys[b];
		console.log("Processing definition of box \""+key+"\"");
		if (boxDefinitions[key]) {
			console.log("Box \""+key+"\" already exists in previous editions ("+JSON.stringify(boxDefinitions[key])+"), overriding with "+JSON.stringify(edition.boxes[key]));
		}
		boxDefinitions[key] = edition.boxes[key];
	}
}
console.log("- Found "+Object.keys(boxDefinitions).length+" boxes defined in all needed editions.");
//console.log(boxDefinitions);


brandDefinition.requiredBoxSupport.forEach(function (b) {
	if (!b.type) {
		console.error("Box in brand does not have type:", JSON.stringify(b));
	} else {
		const boxDef = boxDefinitions[b.type];
		if (!boxDef) {
			console.error("Box of type \""+b.type+"\" does not exist in provided spec edition");
		} else {
			if (boxDef.versions) {
				if (!b.versions || b.versions.length === 0) {
					console.error("Box of type \""+b.type+"\" is defined with versions ["+boxDef.versions+"], but the brand definition does not indicate any");	
				}
			}
			if (boxDef.flags) {
				if (!b.flags || b.flags.length === 0) {
					console.error("Box of type \""+b.type+"\" is defined with flags ["+boxDef.flags+"], but the brand definition does not indicate any");	
				}
			}
		}
	}
})