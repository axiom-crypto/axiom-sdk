export const Versions = [
  "v0",
  "v0_2",
  "v1",
];

export type VersionsType = typeof Versions[number];

const endpoints = {
  getBlockHashWitness: "/get_block_hash_witness",
  getBlockMerkleProof: "/get_block_merkle_proof",
  getBlockParams: "/get_block_params",
  getBlockRlpHeader: "/get_block_rlp_header",
  getBlockMmrProof: "/get_block_mmr_proof",
}

let versionData: any = {
  v0: {
    Addresses: {
      Axiom: "0x2251c204749e18a0f9A7a90Cff1b554F8d492b3c",
      AxiomStoragePf: "",
    },
    Urls: {
      ApiBaseUrl: "https://api.axiom.xyz/v0",
    },
    Endpoints: {
      GetBlockHashWitness: endpoints.getBlockHashWitness,
      GetBlockMerkleProof: endpoints.getBlockMerkleProof,
      GetBlockParams: endpoints.getBlockParams,
      GetBlockRlpHeader: endpoints.getBlockRlpHeader,
    },
    Values: {
      MaxQuerySize: 64,
    },
  },
  v0_2: {
    Addresses: {
      Axiom: "0xF990f9CB1A0aa6B51c0720a6f4cAe577d7AbD86A",
      AxiomStoragePf: "",
    },
    Urls: {
      ApiBaseUrl: "https://api.axiom.xyz/v0_2",
    },
    Endpoints: {
      GetBlockHashWitness: endpoints.getBlockHashWitness,
      GetBlockMerkleProof: endpoints.getBlockMerkleProof,
      GetBlockParams: endpoints.getBlockParams,
      GetBlockRlpHeader: endpoints.getBlockRlpHeader,
      GetBlockMmrProof: endpoints.getBlockMmrProof,
    },
    Values: {
      MaxQuerySize: 64,
    },
  },
  v1: {
    Addresses: {
      Axiom: "",
      AxiomStoragePf: "",
    },
    Urls: {
      ApiBaseUrl: "https://api.axiom.xyz/v1",
    },
    Endpoints: {
      GetBlockHashWitness: endpoints.getBlockHashWitness,
      GetBlockMerkleProof: endpoints.getBlockMerkleProof,
      GetBlockParams: endpoints.getBlockParams,
      GetBlockRlpHeader: endpoints.getBlockRlpHeader,
      GetBlockMmrProof: endpoints.getBlockMmrProof,
    },
    Values: {
      MaxQuerySize: 64,
    },
  },
}

// Quick and dirty function to update SINGLE constant. Update one at a time
// otherwise the function will only update the first key for each level.
//
// Example: updateConstants({v0: {Addresses: {Axiom: "0x1234"}}})
export const updateConstants = (updateObject: any) => {
  if (process.env.ENV === "prod") {
    console.log("Error: Cannot write constants in prod environment");
    return;
  }

  // Parse the update object
  let versionMem = versionData;
  let updateMem = {...updateObject};
  let lastKey: string;
  for (let i = 0; i < 10; i++) {
    lastKey = Object.keys(updateMem)[0];
    if (typeof updateMem[lastKey] !== "object") {
      versionMem[lastKey] = updateMem[lastKey];
      break;
    }
    
    if (versionMem[lastKey] === undefined) {
      console.log("Invalid path");
      break;
    }
    updateMem = updateMem[lastKey];
    versionMem = versionMem[lastKey];
  }
}

export const Constants: {[V in VersionsType]: any} = process.env.ENV === "prod" 
  ? Object.freeze(versionData) 
  : versionData;

export const ContractEvents = Object.freeze({
  QueryInitiatedOnchain: "QueryInitiatedOnchain",
  QueryFulfilled: "QueryFulfilled",
})
