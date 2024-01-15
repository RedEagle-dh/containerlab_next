import { exec } from "child_process";

export async function GET(request: Request) {
	const ymlPath = "/home/dave/testing/clab-files/srl02/srl02.clab.yml"; // WSL-Pfad

	exec(
		`wsl sudo containerlab deploy -t ${ymlPath}`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`Ausführungsfehler: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
		}
	);

	exec(
		`wsl sudo containerlab graph --topo ${ymlPath} --srv ":3002"`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`Ausführungsfehler: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
		}
	);

	return new Response("Hello world!");
}
