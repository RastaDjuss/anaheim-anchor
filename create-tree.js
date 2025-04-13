import fs from "fs";

const inputPath = "./input-tree.json"; // Change ceci si nécessaire
const outputPath = "./cleaned-tree.json";

const exclusions = ["node_modules", ".git", "dist", "build", "tests"];

try {
	// Vérifie si le fichier existe avant de continuer
	if (!fs.existsSync(inputPath)) {
		throw new Error(`Le fichier d'entrée "${inputPath}" est introuvable.`);
	}

	const treeData = JSON.parse(fs.readFileSync(inputPath, "utf8"));

	function cleanTree(tree) {
		return tree
			.filter((item) => !exclusions.includes(item.name))
			.map((item) => {
				if (item.type === "directory" && item.contents) {
					return { ...item, contents: cleanTree(item.contents) };
				}
				return item;
			});
	}

	const cleanedTreeData = cleanTree(treeData);

	fs.writeFileSync(outputPath, JSON.stringify(cleanedTreeData, null, 2), "utf8");
	console.log(`✅ Nettoyage terminé ! Fichier sauvegardé sous : ${outputPath}`);
} catch (error) {
	console.error(`❌ Erreur : ${error.message}`);
}