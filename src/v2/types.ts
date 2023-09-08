import {
  AccountSubquery,
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  AxiomV2DataQuery,
  BeaconValidatorSubquery,
  HeaderSubquery,
  ReceiptSubquery,
  SolidityNestedMappingSubquery,
  StorageSubquery,
  TxSubquery,
} from "@axiom-crypto/codec";

export type { QueryV2 } from "./query/queryV2";
export type { QueryBuilderV2 } from "./query/queryBuilderV2";
export { 
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  HeaderSubquery,
  AccountSubquery,
  StorageSubquery,
  TxSubquery,
  ReceiptSubquery,
  SolidityNestedMappingSubquery,
  BeaconValidatorSubquery,
} from '@axiom-crypto/codec';

export interface DataQueryRequestV2 {
  headerSubqueries?: HeaderSubquery[];
  accountSubqueries?: AccountSubquery[];
  storageSubqueries?: StorageSubquery[];
  txSubqueries?: TxSubquery[];
  receiptSubqueries?: ReceiptSubquery[];
  solidityNestedMappingSubqueries?: SolidityNestedMappingSubquery[];
  beaconSubqueries?: BeaconValidatorSubquery[];
}

export interface QueryBuilderV2Options {
  maxFeePerGas?: string;
  callbackGasLimit?: number;
}

export interface BuiltQueryV2 {
  sourceChainId: number;
  dataQueryEncoded: string;
  dataQueryHash: string;
  dataQuery: AxiomV2DataQuery;
  computeQuery: AxiomV2ComputeQuery;
  querySchema: string;
  callback: AxiomV2Callback;
  maxFeePerGas: string;
  callbackGasLimit: number,
}
