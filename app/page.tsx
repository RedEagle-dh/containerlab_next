'use client';

export default function Home() {

    const startContainerlab = () => {
        console.log("Starting containerlab");
        fetch("/api", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <h1 className="text-3xl mb-4">Netzwerk-Diagramm von Containerlab</h1>
            <p className="mb-4">Hier kannst du das Netzwerk-Diagramm von Containerlab sehen.</p>
            <button onClick={startContainerlab} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Containerlab starten</button>
            <iframe id="containerlab-frame" src="http://localhost:3002" width={"100%"} height={"800px"}></iframe>


        </div>
    );
}
