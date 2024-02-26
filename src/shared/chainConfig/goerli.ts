import { AxiomV2CircuitConstant } from "@axiom-crypto/tools";
import { Endpoints, Path } from "../endpoints";

export let versionDataGoerli: any = {
  v2: {
    Addresses: {
      Axiom: "0x071b7aA74f060B40cB7EEE577c30E634276e7C9f",
      AxiomQuery: "0xBd5307B0Bf573E3F2864Af960167b24Aa346952b",
    },
    Urls: {
      ApiBaseUrl: "https://api.axiom.xyz/v2",
    },
    Endpoints: {
      GetBlockHashWitness: Path.Block + Endpoints.GetBlockHashWitness,
      GetBlockMerkleProof: Path.Block + Endpoints.GetBlockMerkleProof,
      GetBlockParams: Path.Block + Endpoints.GetBlockParams,
      GetBlockRlpHeader: Path.Block + Endpoints.GetBlockRlpHeader,
      GetBlockMmrProof: Path.Block + Endpoints.GetBlockMmrProof,
      GetAllQueries: Path.Query + Endpoints.GetAllQueries,
      GetDataForQuery: Path.Query + Endpoints.GetDataForQuery,
      GetQueryCount: Path.Query + Endpoints.GetQueryCount,
      GetQueryData: Path.Query + Endpoints.GetQueryData,
      GetQuery: Path.Query + Endpoints.GetQuery,
    },
    Values: {
      MaxQuerySize: AxiomV2CircuitConstant.UserMaxSubqueries,
      QueryEncodingVersion: 2,
    },
  },
};

export let versionOverrideGoerliMock: any = {
  v2: {
    Addresses: {
      Axiom: "0x2aE6ad6127C222f071C023086C442080B03AfCCe",
      AxiomQuery: "0xf15cc7B983749686Cd1eCca656C3D3E46407DC1f",
    },
  },
};
