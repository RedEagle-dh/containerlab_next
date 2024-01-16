import { exec } from "child_process";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export async function GET(request: NextApiRequest, response: NextApiResponse) {
	await NextCors(request, response, {
		// Options
		methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
		origin: "*",
		optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	});
	const ymlPath = "/home/dave/testing/clab-files/srl02/srl02.clab.yml"; // WSL-Pfad

	function execAsync(command: string) {
		return new Promise((resolve, reject) => {
			exec(command, (error: any, stdout: any, stderr: any) => {
				if (error) {
					reject(`Ausführungsfehler: ${error}`);
					return;
				}
				resolve({ stdout, stderr });
			});
		});
	}

	async function runCommandsSequentially() {
		try {
			// Erster Befehl
			/* const result1: any = await execAsync(
				`sudo containerlab deploy -t ${ymlPath}`
			);
			console.log("Erster Befehl ausgeführt:", result1.stdout); */

			// Zweiter Befehl, ausgeführt nachdem der erste Befehl abgeschlossen ist
			const result2: any = await execAsync(
				`sudo containerlab graph --topo ${ymlPath} --srv ":3002"`
			);
			console.log("Zweiter Befehl ausgeführt:", result2.stdout);
		} catch (error) {
			console.error("Fehler:", error);
		}
	}

	runCommandsSequentially();

	return new Response("Hello world!");
}
