import { ethers } from "ethers";
import {
  bytes32,
  getBlockNumberAndTxIdx,
} from '@axiom-crypto/tools';
import { 
  DataSubquery,
  DataSubqueryType,
  UnbuiltAccountSubquery,
  UnbuiltHeaderSubquery,
  UnbuiltReceiptSubquery,
  UnbuiltSolidityNestedMappingSubquery,
  UnbuiltStorageSubquery,
  UnbuiltSubquery,
  UnbuiltTxSubquery,
} from "../../types";

export async function buildDataSubquery(
  provider: ethers.JsonRpcProvider,
  subquery: UnbuiltSubquery,
  type: DataSubqueryType
): Promise<DataSubquery> {
  switch (type) {
    case DataSubqueryType.Header:
      return buildDataSubqueryHeader(subquery as UnbuiltHeaderSubquery);
    case DataSubqueryType.Account:
      return buildDataSubqueryAccount(subquery as UnbuiltAccountSubquery);
    case DataSubqueryType.Storage:
      return buildDataSubqueryStorage(subquery as UnbuiltStorageSubquery);
    case DataSubqueryType.Transaction:
      return buildDataSubqueryTx(provider, subquery as UnbuiltTxSubquery);
    case DataSubqueryType.Receipt:
      return buildDataSubqueryReceipt(provider, subquery as UnbuiltReceiptSubquery);
    case DataSubqueryType.SolidityNestedMapping:
      return buildDataSubquerySolidityNestedMapping(subquery as UnbuiltSolidityNestedMappingSubquery);
    default:
      throw new Error(`Invalid data subquery type: ${type}`);
  }
}

async function buildDataSubqueryHeader(
  subquery: UnbuiltHeaderSubquery
): Promise<DataSubquery> {
  return {
    type: DataSubqueryType.Header,
    subqueryData: {
      blockNumber: subquery.blockNumber,
      fieldIdx: subquery.fieldIdx,
    },
  }
}

async function buildDataSubqueryAccount(
  subquery: UnbuiltAccountSubquery
): Promise<DataSubquery> {
  return {
    type: DataSubqueryType.Account,
    subqueryData: {
      blockNumber: subquery.blockNumber,
      addr: subquery.addr.toLowerCase(),
      fieldIdx: subquery.fieldIdx,
    },
  }
}

async function buildDataSubqueryStorage(
  subquery: UnbuiltStorageSubquery
): Promise<DataSubquery> {
  return {
    type: DataSubqueryType.Storage,
    subqueryData: {
      blockNumber: subquery.blockNumber,
      addr: subquery.addr.toLowerCase(),
      slot: subquery.slot,
    },
  }
}

async function buildDataSubqueryTx(
  provider: ethers.JsonRpcProvider,
  subquery: UnbuiltTxSubquery
): Promise<DataSubquery> {
  const { blockNumber, txIdx } = await getBlockNumberAndTxIdx(provider, subquery.txHash);
  return {
    type: DataSubqueryType.Transaction,
    subqueryData: {
      blockNumber,
      txIdx,
      fieldOrCalldataIdx: subquery.fieldOrCalldataIdx,
    },
  }
}

async function buildDataSubqueryReceipt(
  provider: ethers.JsonRpcProvider,
  subquery: UnbuiltReceiptSubquery
): Promise<DataSubquery> {
  const { blockNumber, txIdx } = await getBlockNumberAndTxIdx(provider, subquery.txHash);
  return {
    type: DataSubqueryType.Receipt,
    subqueryData: {
      blockNumber,
      txIdx,
      fieldOrLogIdx: subquery.fieldOrLogIdx,
      topicOrDataOrAddressIdx: subquery.topicOrDataOrAddressIdx,
      eventSchema: subquery.eventSchema.toLowerCase(),
    },
  }
}

async function buildDataSubquerySolidityNestedMapping(
  subquery: UnbuiltSolidityNestedMappingSubquery
): Promise<DataSubquery> {
  return {
    type: DataSubqueryType.SolidityNestedMapping,
    subqueryData: {
      blockNumber: subquery.blockNumber,
      addr: subquery.addr.toLowerCase(),
      mappingSlot: subquery.mappingSlot,
      mappingDepth: subquery.mappingDepth,
      keys: subquery.keys.map((key) => bytes32(key.toLowerCase())),
    },
  }
}