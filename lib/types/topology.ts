type TopologyBuildResponse = {
    type: "topology build response";
    source: string;
    sibling: string;
    topology: {
      name: string;
      topology: {
        nodes: {
          [key: string]: {
            kind: string;
            image: string;
          };
        };
        links: {
            endpoints: string[]; // Ein Array von Strings, das die Endpunkte definiert
          }[];
      };
    };
    nodes: {
      [key: string]: Record<string, unknown>; 
    };
    interfaces: {
      gnmi: any;
    };
    running: boolean;
  };


  // links gibt es nicht mehr, außer in traffic engineering!