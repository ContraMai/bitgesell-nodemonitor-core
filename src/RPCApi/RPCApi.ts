// query blockchain state
import axios from 'axios';

export type RpcConfiguration = {
  readonly rpcUrl: string;
  readonly username: string;
  readonly password: string;
};

export type MempoolInfo = {
  readonly loaded: boolean;
  readonly size: number;
  readonly usage: number;
  readonly maxmempool: number;
  readonly mempoolminfee: number;
  readonly minrelayfee: number;
  readonly unbroadcastcount: number;
};

export type PeerInfo = {
  id: number;
  addr: string;
  addrbind: string;
  network: string;
  mapped_as: string;
  services: string;
  servicenames: Array<string>;
  relaytxes: boolean;
  lastsend: number; // Unix epoch timestamp
  lastrecv: number; // Unix epoch timestamp
  last_transaction: number; // Unix epoch timestamp
  last_block: number;
  bytessent: number;
  bytesrecv: number;
  conntime: number;
  timeoffset: number;
  pingtime: number;
  minping: number;
  pingwait: number;
  version: number;
  subver: number;
  inbound: boolean;
  addnode: boolean;
  connection_type: string;
  startingheight: number;
  banscore: number;
  synced_headers: number;
  synced_blocks: number;
  inflight: Array<number>;
  whitelisted: boolean;
  permissions: Array<string>;
  minfeefilter: number;
  bytessent_per_msg: {
    msg: number;
  };
  bytesrecv_per_msg: {
    msg: number;
  };
};

export type Nodes = Array<PeerInfo>;

export type NetworkTraffic = {
  totalbytesrcv: number;
  totalbytessent: number;
  timemillis: number; // Unix epoch timestamp(ms)
  uploadtarget: {
    timeframe: number;
    target: number; // target in bytes
    target_reached: boolean;
    serve_historical_blocks: boolean;
    bytes_left_in_cycle: number;
    time_left_in_cycle: number;
  };
};

export type BlockchainInfo = {
  chain: string;
  blocks: number;
  headers: number;
  bestblockhash: string;
  difficulty: number;
  mediantime: number;
  verificationprogress: number;
  initialblockdownload: boolean;
  chainwork: string;
  size_on_disk: number;
  pruned: boolean;
  pruneheight: number;
  automatic_pruning: boolean;
  softforks: {
    [name: string]: {
      type: string;
      bip69: {
        status: string;
        bit: number;
        start_time: number;
        timeout: number;
        since: number;
        statistics: {
          period: number;
          threshold: number;
          elapsed: number;
          count: number;
          possible: boolean;
        };
      };
      height: number;
    };
  };
  warnings: string;
};

export type NetworkInfo = {
  version: number;
  subversion: number;
  protocolversion: number;
  localservices: string;
  localservicenames: Array<string>;
  localrelay: boolean;
  timeoffset: number;
  connections: number;
  connections_in: number;
  networks: Array<Network>;
  relayfee: number;
};

type Network = {
  name: string;
  limited: boolean;
  reachable: boolean;
  proxy: string;
  proxy_randomize_credentials: boolean;
};

/**
 * Main RPCAPI class for querying blockchain state
 *
 * @class RPCAPI
 */
export class RPCAPI {
  private readonly config: RpcConfiguration;
  /**
   * Creates an instance of RPCAPI.
   * @param {RpcConfiguration} _config
   * @memberof RPCAPI
   */
  constructor(readonly _config: RpcConfiguration) {
    this.config = _config;
  }

  /**
   * Fetch Mempool state
   *
   * @returns  {Promise<MempoolInfo>}
   * @memberof RPCAPI
   */
  public async getMempoolInfo(): Promise<MempoolInfo> {
    const payload = {
      jsonrpc: '1.0',
      method: 'getmempoolinfo',
      params: [],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const urlEndpoint = `http://${this.config.username}:${this.config.password}@${this.config.rpcUrl}`;

    const result = await axios.get(urlEndpoint, {
      headers,
      params: JSON.stringify(payload),
    });

    const { data } = result;
    return data as MempoolInfo;
  }

  /**
   * getPeerInfo fetches data about each connected network node.
   *
   * @returns  {Promise<Nodes>}
   * @memberof RPCAPI
   */
  public async getPeerInfo(): Promise<Nodes> {
    const payload = {
      jsonrpc: '1.0',
      method: 'getpeerinfo',
      params: [],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const urlEndpoint = `http://${this.config.username}:${this.config.password}@${this.config.rpcUrl}`;

    const result = await axios.get(urlEndpoint, {
      headers,
      params: JSON.stringify(payload),
    });

    const { data } = result;
    return data as Nodes;
  }

  /**
   *
   * getNetTotals returns information about network traffic in bytes out, bytes in, current time
   * @returns  {Promise<NetworkTraffic>}
   * @memberof RPCAPI
   */
  public async getNetTotals(): Promise<NetworkTraffic> {
    const payload = {
      jsonrpc: '1.0',
      method: 'getnettotals',
      params: [],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const urlEndpoint = `http://${this.config.username}:${this.config.password}@${this.config.rpcUrl}`;

    const result = await axios.get(urlEndpoint, {
      headers,
      params: JSON.stringify(payload),
    });

    const { data } = result;
    return data as NetworkTraffic;
  }

  /**
   * getBlockChainInfo fetches the current blockchain state
   *
   * @returns  {Promise<BlockchainInfo>}
   * @memberof RPCAPI
   */
  public async getBlockChainInfo(): Promise<BlockchainInfo> {
    const payload = {
      jsonrpc: '1.0',
      method: 'getblockchaininfo',
      params: [],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const urlEndpoint = `http://${this.config.username}:${this.config.password}@${this.config.rpcUrl}`;

    const result = await axios.get(urlEndpoint, {
      headers,
      params: JSON.stringify(payload),
    });

    const { data } = result;
    return data as BlockchainInfo;
  }

  /**
   * getnetworkinfo returns state of P2P networking
   *
   * @returns  {Promise<NetworkInfo>}
   * @memberof RPCAPI
   */
  public async getNetworkInfo(): Promise<NetworkInfo> {
    const payload = {
      jsonrpc: '1.0',
      method: 'getnetworkinfo',
      params: [],
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    const urlEndpoint = `http://${this.config.username}:${this.config.password}@${this.config.rpcUrl}`;

    const result = await axios.get(urlEndpoint, {
      headers,
      params: JSON.stringify(payload),
    });

    const { data } = result;
    return data as NetworkInfo;
  }
}
