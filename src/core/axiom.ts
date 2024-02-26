import { InternalConfig } from './internalConfig';
import { AxiomSdkCoreConfig } from '../shared/types';
import { Block } from './block';
import { getAxiomQueryAbiForVersion } from './lib/abi';
import { Query } from './query';
import { QueryV2 } from '../v2/query/queryV2';

export class AxiomSdkCore {
  /**
   * Axiom configuration parameters 
   */
  readonly config: InternalConfig;

  /**
   * Functions that relate to calculating various aspects of blocks
   */
  readonly block: Block;

  /**
   * Functions that handle querying the Axiom Query database
   */
  readonly query: Query;

  constructor(config: AxiomSdkCoreConfig, overrides?: any) {
    this.config = new InternalConfig(config, overrides);

    switch (this.config.version) {
      case "v2":
        this.block = new Block(this.config);
        this.query = new QueryV2(this.config);
        break;
      default:
        throw new Error(`Invalid version detected: ${this.config.version}`)
    }
  }

  getAxiomQueryAbi(): any {
    return getAxiomQueryAbiForVersion(this.config.version);
  }

  getAxiomQueryAddress(): string | undefined {
    return this.config.getConstants().Addresses.AxiomQuery;
  }
}
