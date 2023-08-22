import { AxiomV2ComputeQuery } from "@axiom-crypto/codec";
import { Axiom, AxiomConfig } from "../../../src";
import { QueryV2 } from "../../../src/v2/query/queryV2";
import { ethers } from "ethers";
import { getFunctionSelector } from "../../../src/shared/utils";

describe("QueryV2", () => {
  const WETH_ADDR = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  const WETH_WHALE = "0x2E15D7AA0650dE1009710FDd45C3468d75AE1392";

  const config: AxiomConfig = {
    apiKey: "demo",
    providerUri: process.env.PROVIDER_URI as string,
    version: "v2",
  }
  const axiom = new Axiom(config);

  test("should initialize QueryV2", () => {
    expect(typeof axiom.query).toEqual("object");
  });

  test("should initialize QueryBuilderV2 with dataQuery", async () => {
    const dataQuery = {
      headerSubqueries: [],
      receiptSubqueries: [],
    };
    const query = axiom.query as QueryV2;
    const qb = query.new(dataQuery);
    expect(typeof query).toEqual("object");
  });

  test("should initialize QueryBuilderV2 with computeQuery", async () => {
    const dataQuery = {
      headerSubqueries: [],
      receiptSubqueries: [],
    };
    const computeQuery: AxiomV2ComputeQuery = {
      k: 8,
      omega: "0x1234",
      vkey: "0xabcdef",
      resultLen: 32,
      computeProof: "0x4c8f18581c0167eb90a761b4a304e009b924f03b619a0c0e8ea3adfce20aee64",
    };
    const query = axiom.query as QueryV2;
    const qb = query.new(dataQuery, computeQuery);
    expect(typeof query).toEqual("object");
  });

  test("should initialize QueryBuilderV2 with callback", async () => {
    const dataQuery = {
      headerSubqueries: [],
      receiptSubqueries: [],
    };
   const computeQuery: AxiomV2ComputeQuery = {
      k: 8,
      omega: "0x1234",
      vkey: "0xabcdef",
      resultLen: 32,
      computeProof: "0x4c8f18581c0167eb90a761b4a304e009b924f03b619a0c0e8ea3adfce20aee64",
    };
    const callbackQuery = {
      callbackAddr: WETH_ADDR,
      callbackFunctionSelector: getFunctionSelector("balanceOf", ["address"]),
      callbackExtraData: ethers.solidityPacked(["address"], [WETH_WHALE]),
    }
    const query = axiom.query as QueryV2;
    const qb = query.new(dataQuery, computeQuery, callbackQuery);
    expect(typeof query).toEqual("object");
  });

  test("should initialize QueryBuilderV2 with options", async () => {
    const dataQuery = {
      headerSubqueries: [],
      receiptSubqueries: [],
    };
   const computeQuery: AxiomV2ComputeQuery = {
      k: 8,
      omega: "0x1234",
      vkey: "0xabcdef",
      resultLen: 32,
      computeProof: "0x4c8f18581c0167eb90a761b4a304e009b924f03b619a0c0e8ea3adfce20aee64",
    };
    const callbackQuery = {
      callbackAddr: WETH_ADDR,
      callbackFunctionSelector: getFunctionSelector("balanceOf", ["address"]),
      callbackExtraData: ethers.solidityPacked(["address"], [WETH_WHALE]),
    }
    const options = {
    }
    const query = axiom.query as QueryV2;
    const qb = query.new(dataQuery, computeQuery, callbackQuery, options);
    expect(typeof query).toEqual("object");
  });
});