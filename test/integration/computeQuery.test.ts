import { ethers } from "ethers";
import {
  Axiom,
  AxiomConfig,
  AxiomV2Callback,
  QueryV2,
  bytes32,
  AxiomV2ComputeQuery,
  buildReceiptSubquery,
  getTxHash,
  buildTxSubquery,
  TxField,
} from "../../src";
import { exampleClientMock, exampleClientReal } from "./constants";

describe("On-chain compute query scenarios", () => {
  const provider = new ethers.JsonRpcProvider(process.env.PROVIDER_URI_GOERLI as string);
  const config: AxiomConfig = {
    privateKey: process.env.PRIVATE_KEY_GOERLI as string,
    providerUri: process.env.PROVIDER_URI_GOERLI as string,
    version: "v2",
    chainId: 5,
    mock: (process.env.MOCK ?? "false").toLowerCase() === "true" ? true : false,
  };
  const overrides = {
    // Addresses: {
    //   AxiomQuery: "",
    // },
  };
  const axiom = new Axiom(config, overrides);

  const exampleClientAddr = config.mock ? exampleClientMock : exampleClientReal;
  const vk = [
    2, 13, 0, 0, 0, 0, 6, 0, 0, 0, 22, 53, 175, 191, 189, 44, 47, 125, 102, 223, 68, 183, 53, 24, 221, 245, 11, 40, 210,
    84, 147, 34, 241, 111, 251, 44, 176, 97, 40, 23, 111, 5, 236, 172, 54, 30, 205, 68, 139, 37, 34, 255, 110, 222, 63,
    213, 167, 105, 46, 125, 148, 2, 105, 228, 6, 175, 114, 9, 31, 238, 182, 133, 168, 45, 28, 159, 208, 89, 2, 25, 123,
    44, 175, 207, 178, 3, 221, 30, 25, 215, 156, 251, 160, 211, 110, 185, 184, 40, 149, 62, 212, 252, 3, 33, 213, 13,
    168, 207, 31, 79, 122, 8, 89, 199, 135, 196, 192, 174, 16, 147, 131, 241, 135, 209, 141, 121, 218, 157, 251, 41, 43,
    229, 189, 79, 74, 73, 203, 38, 10, 225, 22, 159, 68, 40, 178, 33, 77, 56, 45, 239, 47, 26, 48, 164, 220, 229, 77,
    11, 146, 91, 234, 0, 222, 21, 9, 189, 92, 8, 48, 21, 219, 88, 148, 231, 146, 23, 206, 174, 143, 102, 244, 158, 218,
    170, 16, 40, 217, 41, 193, 180, 163, 195, 189, 243, 165, 124, 168, 64, 88, 48, 31, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 94, 101, 9, 254, 49, 236, 93, 96,
    23, 118, 181, 46, 30, 41, 236, 48, 44, 15, 112, 137, 187, 108, 11, 230, 43, 96, 111, 69, 50, 153, 25, 204, 129, 129,
    113, 41, 52, 239, 50, 191, 209, 143, 20, 213, 216, 45, 5, 231, 59, 177, 9, 196, 52, 186, 84, 74, 53, 53, 208, 113,
    74, 25, 47, 136, 9, 246, 57, 166, 7, 252, 165, 231, 133, 67, 159, 89, 40, 185, 227, 220, 49, 214, 153, 188, 68, 30,
    142, 194, 8, 20, 25, 249, 80, 147, 31, 161, 87, 175, 54, 150, 94, 83, 148, 106, 110, 69, 205, 74, 58, 128, 93, 13,
    63, 58, 119, 119, 156, 38, 59, 157, 102, 121, 158, 173, 155, 207, 7, 129, 32, 221, 160, 2, 15, 131, 249, 95, 54,
    190, 51, 37, 210, 75, 10, 123, 164, 170, 220, 46, 2, 32, 0, 126, 162, 161, 23, 118, 254, 8, 8, 145, 202, 133, 199,
    119, 206, 57, 43, 71, 250, 177, 202, 247, 247, 49, 208, 24, 55, 134, 206, 167, 14, 195, 5, 67, 75, 229, 119, 93,
    216, 75, 48, 129, 127, 109, 132, 109, 219, 168, 23, 159, 8, 162, 147, 15, 247, 240, 86, 108, 80, 248, 240, 65, 159,
    237, 247, 215, 190, 191, 70, 240, 218, 95, 15, 139, 84, 196, 177, 252, 158, 196, 233, 173, 21, 59, 139, 120, 126,
    241, 79, 176, 156, 21, 225, 98, 163, 218, 200, 210, 106, 88, 71, 32, 119, 134, 30, 248, 17, 160, 55, 121, 168, 124,
    85, 5, 232, 156, 11, 224, 89, 116, 78, 181, 45, 120, 198, 223, 203, 156, 189, 160, 140, 117, 105, 10, 53, 212, 37,
    140, 202, 224, 95, 204, 114, 5, 234, 227, 19, 84, 3, 218, 83, 80, 10, 207, 66, 72, 41, 104, 80, 210, 173, 6, 147, 3,
    3, 204, 9, 218, 43, 35, 36, 5, 172, 46, 169, 251, 184, 212, 165, 201, 147, 253, 107, 135, 14, 26, 9, 80, 245, 138,
    84, 45, 246, 75, 105, 226, 144, 160, 229, 102, 4, 232, 113, 13, 47, 85, 223, 168, 20, 205, 28, 186, 82, 226, 253,
    139, 166, 67, 97, 144, 21, 186, 35, 159, 158, 228, 38, 196, 12, 95, 157, 154, 2, 142, 121, 143, 6, 8, 179, 106, 157,
    155, 217, 18, 101, 196, 132, 72, 190, 95, 68, 239, 44, 137, 58, 243, 46, 35, 108, 214, 53, 55, 219, 85, 27, 6, 120,
    27, 234, 122, 190, 156, 185, 136, 22, 96, 41, 175, 222, 2, 99, 20, 67, 69, 129, 29, 135, 146, 85, 144, 5, 117, 158,
    117, 230, 133, 35,
  ];
  // const computeProof =
  //   "0x00000000000000000000000000000000c42079f94a6350d7e6235f29174924f90000000000000000000000000000000028cc2ac818eb64fed8004e115fbcca6700000000000000000000000000000000000000000000000000000000b39244890000000000000000000000000000000032f6ef430555631f765df0dfae34eff30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000092a653000000000000000000000000000000000000000000000000000000003fc91a3a00000000000000000000000000000000fd70395cd496c647d5a6cc9d4b2b7fad000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c4900a96745da6c984ebe90f4f26604014c7700ffa6ee6e164e98b9dc955e11d9041af2742503bbaa22e4bd2ebb0c8119021dfc306cdef9430a9e53ab27976683bfb765bbc7dc1886dfd0e93193cbea51bb5d7958d0adbef750fb2e2031d01ae7b5409a538356c0f0ccd934bd083d6b2168d642d5c2259dc9fe3e2250d3dc497cab7728cc65be57d8ca4e6d77d02b203e83175fc32cb18562c676c212679d0d8c2ab75fe7f859a6f88e4e563c3116bfca8c74538ad61764115e313bb1695259c0d99e30021b026ddae92de36900120b492a554764123f5d25111a8998e7c762b424f5e3815bbf25a8fa532c2241ccfdcddfddcad23ec4a5140e0a628989fd26f2a491905f0646daec9582e2a61d3eb458122030f68bae3b8ec0b08ca3df9f17493bd00e664b65c0ecf23207e17e182d5ff1219ba735793ab71df4720501e54cdce9d3edc8a241c3cf018b08a583351d14e44a023530014f4f3f647a9946bb283952d16d6d752c02ddc442005564a647e5b211fb76b8f2780876e07ec6f2e22bbb3a874ea8a599790b2477c94e550c05df582b5d89fa3f3e10aa94ce5b57223048357aab8f8f5ba03a111a0eb3d8883c9f8d30b254fcdf975fe7e56dae84306d7817bd702d798dfbb0fbbf89eb4d114c7dd1919e3ec743d5fb43dd83dbb5b224795eeafd0ec0575085fc9922af7f9af084e34d868a1b935fe004c412c5ffb1572ce89d1a209d9d68abf1dd557def19b9f77fcf4d1ef1578bc7ebc9fb17aa562a8132e7646e8e57cd84478fdfce531243d0aec565351561c6d0e4f7f20921432aaf376585b1a8b5635fe7d63e8024cc20e9b92f696c52b5b0cae68dceff1f3702156c12067d5544d0f046de33c6982fce4792c6387ee9eb408d134d70661fce1843af7d0c69e87658ede8e364b588a07326dffd19439e329adc55b08797992e110e4efb9e590cd40f9d5094f10c8517c2e577155314b0763f428230df8640dd03fb684e26d89ecc301d62ca79d309efa1b9691e7fb24f9a69b5ac5891df3cd8177b492472a450eb47f1bd9d25f140bf290ff70f59234cf838a4f5273d74f59c061727bc78431b2f798d26bb3dd13c80f3472822baf84524b5068cd6e37f939c25215890dd8c00f9a08c69a56a0239f1f9e5c3645a6fe0417dd250bee7cd72080808ea13c52d0a70a0317ed9e86a4a57ac587d0bc2f164964255b75aa6f339c82ace699071e1d421ecc1c66b2bf2331abf0aaef04b036d86357a24907591abbc09593e966e1406e7c93178c09f8e752a9269abc920bdb9bfc9d964e05ec33ce802c56ca015451658745fb9f8acaea5a375c90671e8bc99adde3597a2bcb39d0c2ce467a824cd2132609edbff57a3e40722af2fcc8534b0324de9febea91c6b371bb0e33e9bc94fd986ad5db139c36d9d247b0082a847d18d8a12934be64fcd672086124fb228d149eb8731e84e56b13f702eba954c9dcd7b8f35d7c566e01e792b58671017ecfdec6c1103f2c4e79355d658ac07ab6460eb315abe8b3f9bd868001c9165378f0e573e765ef51942c7ab99cbf2fdc18a28135dc913c1e7ed6a2425520fe0db6a6a2fa735e9a748310e63bc95737c217728ef0e5196a21a9e0aa1080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003d074bccc0083263c99e7f7963f1c2b385cf95fd8920c12736ef8504342d520e9870b0528fae093871f5da7b2e392d21ad04f763ae1d44d79184dd1c30a0c41a9fcbfb2855ef40305f4bb79c2c879afdad52f1065a14a2fdcc36c6fc0a7b2106a4697e1fc5712e3adce3f92c51179a9e534d16e9d3ab4081763ef26eb27fce17df2c4c94445f5f0b12dfb28c523c3cf3e6cb67d1a66f19abf9b26aded3442502628bd669684f04ac73111e3e70169446a2cb22e128dac1e4e38f1ccfb8b87422c839874e7e41a15d6743cc2b980d29ec8b0733d95b9501f190b21a574e364106d573ed3c8cae147eed7f8af1f0a021f56882cd8d1dd4c70bdd1244f0f1857e0a204de08cea403ae669c295333bc90fda1b9117b14bacb50fb4deb7c710772209d3256a1826914f2ae8b0b29fb24374be30202932c9a1fbb44d89a59fe135d90574c87c835ac934eb16c4b534a4758b8d5cf752a4f2df50447c6b064bb889aa01cc73c2df25d0b67894f57811e5fee3dbe40b2f56c64d674d5bc952f8aca703167d0c33c959b2d872aa1e1f8b5c1b96c521c32432a886d336868c8a621d0c31267471079e40dd2dd2d99aad37d2801bf15027b09425c4fe17c43a2fa525dd9b1f8d88a6c1ec125b132f7d324b4b268c380e8c6860cd085be7db8d580d8a78e2234c55ab0cffcdaf6f291be5b5ca5872ef8ffad4ff0182ac3c8e6b0940d852ed126293961b155fc4f6f7f3e834281beed927cf1a10daed438be2c850f848ab47037ee6622a9cac1ad8ab7299bf8be7ad3883c7ac2befd6c5cfa550b64ff3e07e02c485e846903bc57fa21990e655a04cfd78f97957f148a017f4e8751a03913706798d4296ce435de420fcc9bbb95c22ec2f955d9e04e760607881d7c52a45f202df4eabe8f7ba96855d78bcea1fd3dbf4df1186b212d2ad50b0033a89a5d0cf0a0311dbdc322423b3478b917b02dc8d01aaf74c0e0dd13b349790ff7ad721e7015032469148289e03ebe9ae2e67194e2055eedd56d7a6622c6c5c3f8d1b01be078e9c4ad926bf7de3b93030391fa21b8a338eff69f35367fd5151358097a65b1a21cd1bde1d3e74539f039a806ca5936698a31bc1de31c634a690412523ee5b15bcf5710f1d49d735ed1a15b765d6a1cc78492cd1bd78c79f5d06bc17fdf69d10";

  const computeProof =
    "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67000000000000000000000000b392448932f6ef430555631f765df0dfae34eff3000000000000000000000000000000000000000000000000000000000092a6530000000000000000000000003fc91a3afd70395cd496c647d5a6cc9d4b2b7fad0d3d3dcfc9f6777cc5f4fe79a4a4bc394480c91776451fed0e53bee304e6ba51d9b1c84f81c7cfa5df53cd495afe8078e18938210082118baa078edad02e3a101188b835fce8eaf682dfa6dffeb9b1fad28dd4bf4535fd901260a282821fe41f86997c07c4c10fa50fdb973395fc27f0a423982501bf052607983874129f5d08b9454b6dff63d23697664a22703985abf0dcbf206ae26ad893f3452f161cf70a8f57efff4fdade9b2b9addf115afd14363f621931499067e144aca1392102e2e9c3410bf7f26aa6aa4b65c58612de327a3fc811d2577b6d284bb3507cd5eb004097987cc32b3e17772f8d6b45c6905a80c3655a9d3a9e27d407672100188b4184b03335ab8ba1cad7fddc305488cef6b1c1764f1a1067e2eb38c3d2b57abb5217981d402e02d67f82661d6d45fe5dfe629f4087135471f9f34cee61f20026f6fa000762da1318e2db4606154b97758b7cc0e390507730abfdf31095fc2b8452ab9e57acf3332739917e7b6796caa04bc722b2c06613a8a583b98af7d4578700a4ce009ea1cb0344b62146421099dd9382dd3109400373528e0a54241c50f36418ff058add2bff589bdc5c717efd96cdf949871d9615acc8d9c2f13570c5c14282a5f8b37cd2c68945b7e0211e221dea1c8648ea225a0f8247f5de75d7c734817a4a0a52a38a83ddefe77175fadaa50c8e815f22532c6b3a2a36b1606fe564c2e32f2767f878c952154d00d92b99034c443db9f84edeaf5cce82a19343e272706f59d193f070c1be07ea0aa8cb452773c0e205249e5b7e3726c6b4fb23c06e02dc355d45e3ec238e9dc64e5a1590a59daf8b72b666467de6e1bc82d8fe04fe42744bd44e29184cba80bff8831c358e9f3c7fac336a5ac0619b5f3c8ce0e83d407856b62d904d83194d0d6a4b306e54716a9612da94162fac8b2bfa0050075a42b9413b0ffe068c1d6f03747c456df76de07fb56768ab193beea54b1e0e8957a14f8658b5aeb63d22b80aa4ed5b403efa298d83771578535de585d2a3980781a2cd86fdf043feb8d862b78efa9835eee4d0db24fa3f2ea2280ab1b6da4983f6d28245997cbaaf391eacf503b5fcadf751a4d75898bf0f83d83b1e8ed8ad755451dd1dd2540b86bb86e1fdc6564d63f323fda56df4fb2bb7120d8cccc956a33e00141cd5d6b8860b46e7b29325b2b5f2f13f62ab1b33920210d9a8f4fb577b12d0731d08be9974a029c170a0408cfbc1da837a8bca104a6294d8caad889e585b51eab00646615e9b06cfdd9d72e4086a96e58438d4e7d2ee11f5adccc3b4a5269206f5f269909f9d308858b80f28f91f25141f95f3a51071923b42a706439be350bdd95d9ebc8fc3bb4301359ea34b6e3604afb0b0bd4416b575ff6b34eeee8f10f500e126fa83c86e068eed8bb643ae06fec29e5e6f45d392e2a519ae431622c263ba38665a6f6c91cd77833afd6c0fa7257a92db8a5c7de33f6a2db87806f2f086a9d0fdc54a74d150020943fcde74ce368d49cfe3316e8430193a9daf7bc4a2c3382c45dd107096d00c7b5ad1d63a94c4e27f273916474abbfd61cf90aec811ea5fb074a47130df2c3c9e8c8b8db955898eb8dfe63b4803f5ecad1b9b88a6709000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a9f5fec449c496a0cfdccc0a4bc5ad39e6e9dec27516330beb88e95175b0ba008833e17e67438ab42a9f760c073534980091ef03ab7118d164a2e653f53d2e2fb54bcdf449421cb84757ec0bc29c04ea80f6b2bc456f40f67dc8c561991d5507414d96c2f2c151f486f6a9326278099e089579e8c3fc9b975be2ace0e43b73020c1c43dbb2e52d32d65d9de7aa89b3557aad08c678165694a9b904cf0e9fd62d94c2ca61c3520233bed1d8233a50f9e2b80992e8685c2dfa6dcc5aa5c918301764eea6e00f5ee1c23616df6204156a57596f1a341d4f4154e6431cfb1da5fc01556c7610642692910980aabdeb11b956505bd72a7efa7e7365f0ce257fc00a0f6a44e829903c83c338fe9a621318ad3eb1e89e5216da6893d3e824f7781c710c12b5252f195ac2470f859d2960c7288e422f5c2a0cfa84897d70d9b705a27022a6d01c3b1fc45fe17221190cc4aef7a1ada82f13be0ef40112c952fe6673cf220ef543aa8547b3f29c3248c21703fdbe1b748c92d78e67f06128884bf31ac417afb77a74f3d1d66619c9b9dc32e31d949db968c005371bded9151d90269fb82eb7462b21a3070dfa50bf5ec1006e1acb42bf1a8fba538eda2aba80e6373b01021fe46978631e8364b050693093449ef69e0783e12349ca6f3d5f07ed3712460c6c7003c8c8f92ed3c6775ff9ada5b25a14438f50b7b4611144281c662c43a307162bffbc70b021dda97fa44e33e04b01e22518f1dca2635381220e13498dc62f6a4df001951c0c73354193815cba74b3acd0b4eda030ae404af0c2246ab9a52d25bd6f4f831cb073a22b1510499373d72ed277b3b4d2a12411f8318a1b9330095ce731d4eb0327cd92878dd258b8bc9a3ac56d4685532397b6ef859f5399ae13dcd2787bd231179e82588f2e88ccda78a9770818056cc2bdec258cd0395e8f2575e9fe9185ff7261a43e6d76103ef5fb8fe7db920b3754f6cebb5b6874448e01c3c2ce1195e5518cd53e822f2b5470841a21bc8c7c16c35710b1476f2276811499fcdd6a73b6bcd6dc5f214487fdc8c63a9a777c3db8baf46493579e14d36b1b6880df426daeecd3d1bdd48beed6ba129ed866161363352da2a6c50c2c91431e69ba703c269df8f900312577fbd1095c8cdc457c5c7ce18130565f1ebdd1a617";
  // const vkey = convertToBytes32(new Uint8Array(vk)).map(x => "0x" + x);
  // console.log(vkey);

  const vkey = [
    "be9df5238dceff54fa804e4595ec681b5b531469372c90a4c66e54f7838ce20f",
    "c04b25057d0bddf35d4542077516abb76445b8e745a457e3ccc1bf9aac2ba406",
    "09fb99633315342c07ddd4bab72cfa9e89824e909314cf31f75e13ee24fb2b47",
    "2d1e39c178c1c193eb329019dddfd310f4bb6e4c8907219b70e24db8b1802047",
    "0000000000000000000000000000000000000000000000000000000000000080",
    "0000000000000000000000000000000000000000000000000000000000000080",
    "0000000000000000000000000000000000000000000000000000000000000080",
    "c794ad62c739a4980719c91c986c3528cf18aebccde48d8b6398e77dd4780864",
    "33d9164d0bfa56aac8389cbe7f54261ca943344764389241dcd95570181cfd1d",
    "22e4c62aacfc240ed0553bfad00122ba8c7627c870c739f3f818584e066a8b1f",
    "841485e0a9f109688bdc4f5ff851d9e2e44833ae573456742c1237322e938542",
    "79a62f1cc2f1440cc9fdcd534b612a49da4b6139bbed8cf53a26f4568ac3f567",
    "7890b747b8190cb4366ce2ebd5d3234ea4ccc35c6da003af62d93077f1d19264",
    "9b11a4f0f83422d5403d4b69c7f32be55e733a56096911fa1ab95342b6f3110c",
  ].map((x) => "0x" + x);

  // const vkey: string[] = [];
  // const vkHex =
  //   "0xbe9df5238dceff54fa804e4595ec681b5b531469372c90a4c66e54f7838ce20fc04b25057d0bddf35d4542077516abb76445b8e745a457e3ccc1bf9aac2ba40609fb99633315342c07ddd4bab72cfa9e89824e909314cf31f75e13ee24fb2b472d1e39c178c1c193eb329019dddfd310f4bb6e4c8907219b70e24db8b1802047000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000080c794ad62c739a4980719c91c986c3528cf18aebccde48d8b6398e77dd478086433d9164d0bfa56aac8389cbe7f54261ca943344764389241dcd95570181cfd1d22e4c62aacfc240ed0553bfad00122ba8c7627c870c739f3f818584e066a8b1f841485e0a9f109688bdc4f5ff851d9e2e44833ae573456742c1237322e93854279a62f1cc2f1440cc9fdcd534b612a49da4b6139bbed8cf53a26f4568ac3f5677890b747b8190cb4366ce2ebd5d3234ea4ccc35c6da003af62d93077f1d192649b11a4f0f83422d5403d4b69c7f32be55e733a56096911fa1ab95342b6f3110c";
  // let i = 0;
  // const vkHexSlice = vkHex.slice(2);
  // while (i < vkHexSlice.length) {
  //   vkey.push("0x" + vkHexSlice.slice(i, i + 64).padStart(64, "0"));
  //   i += 64;
  // }
  console.log(vkey);

  test("Send a simple Compute Query", async () => {
    const query = (axiom.query as QueryV2).new();

    const blockNumber = 9610835;
    const txIdx = 6;
    const logIdx = 3;
    const eventSchema = "0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67";

    const txHash = await getTxHash(provider, blockNumber, txIdx);
    if (txHash === null) {
      throw new Error("txHash is null");
    }

    // Append a Receipt Subquery that gets the following event schema:
    // Swap(address,uint256,uint256,uint256,uint256,address)
    // 0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67
    let receiptSubquery = buildReceiptSubquery(txHash)
      .log(logIdx)
      .topic(0) // topic 0: event schema
      .eventSchema(eventSchema);
    query.appendDataSubquery(receiptSubquery);

    // Append a Receipt Subquery that checks the address recipient field
    receiptSubquery = buildReceiptSubquery(txHash)
      .log(logIdx)
      .topic(2) // topic 2: recipient
      .eventSchema(eventSchema);
    query.appendDataSubquery(receiptSubquery);

    // Append a Receipt Subquery that gets the block number of the transaction receipt
    receiptSubquery = buildReceiptSubquery(txHash).blockNumber(); // block number of the transaction
    query.appendDataSubquery(receiptSubquery);

    // Append a Transaction Subquery that gets the `to` field of the transaction
    let txSubquery = buildTxSubquery(txHash).field(TxField.To);
    query.appendDataSubquery(txSubquery);

    const computeQuery: AxiomV2ComputeQuery = {
      k: 13,
      resultLen: 4,
      vkey,
      computeProof,
    };
    query.setComputeQuery(computeQuery);

    const callback: AxiomV2Callback = {
      target: exampleClientAddr,
      extraData: bytes32(0),
    };
    query.setCallback(callback);

    const isValid = query.validate();
    expect(isValid).toBeTruthy();

    const builtQuery = await query.build();
    console.log(builtQuery);
    const paymentAmt = await query.calculateFee();
    const queryId = await query.sendOnchainQuery(paymentAmt, (receipt: ethers.ContractTransactionReceipt) => {
      console.log("receipt", receipt);
    });
    console.log("queryId", queryId);
  }, 100000);
});
