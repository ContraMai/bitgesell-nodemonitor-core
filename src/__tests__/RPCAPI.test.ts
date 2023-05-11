// @ts-ignore
import * as matchers from 'jest-extended';

expect.extend(matchers);
import { RPCAPI, RpcConfiguration } from '../RPCApi';

describe('RPCAPI tests', function () {
  const config: RpcConfiguration = {
    username: process.env.username,
    password: process.env.password,
    rpcUrl: process.env.rpcUrl,
  };

  let rpcApi: RPCAPI;

  beforeAll(() => {
    rpcApi = new RPCAPI(config);
  });

  // getmempoolinfo state
  it('should getmempoolinfo state from the RPC', async () => {
    const res = await rpcApi.getMempoolInfo();
    expect(res).toHaveProperty('loaded');
    expect(res).toHaveProperty('size');
    expect(res).toHaveProperty('usage');
    expect(res).toHaveProperty('maxmempool');
    expect(res).toHaveProperty('mempoolminfee');
    expect(res).toHaveProperty('minrelayfee');
    expect(res).toHaveProperty('unbroadcastcount');
  });

  // getpeerinfo state
  it('should getpeerinfo state from the RPC', async () => {
    const res = await rpcApi.getPeerInfo();
    expect(res).toBeArray();
  });

  // getnetworkinfo - state of P2P Networking
  it('should getnetworkinfo from RPC', async () => {
    const res = await rpcApi.getNetworkInfo();
    expect(res).toHaveProperty('version');
    expect(res).toHaveProperty('subversion');
    expect(res).toHaveProperty('protocolversion');
    expect(res).toHaveProperty('localservices');
    expect(res).toHaveProperty('localrelay');
    expect(res).toHaveProperty('timeoffset');
    expect(res).toHaveProperty('connections');
    expect(res).toHaveProperty('connections_api');
    expect(res.networks).toHaveProperty('');
  });

  it('should getblockchaininfo state from the RPC', async () => {
    const res = await rpcApi.getBlockChainInfo();
    expect(res.chain).toBeDefined();
    expect(res.blocks).toBeDefined();
  });

  it('should getblockchaininfo state from the RPC', async () => {
    const res = await rpcApi.getNetTotals();
    expect(res.timemillis).toBeDefined();
    expect(res.totalbytessent).toBeDefined();
  });
});
