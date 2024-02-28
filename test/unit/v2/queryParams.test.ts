import {
  AxiomSdkCore,
  AxiomSdkCoreConfig,
  AxiomV2Callback,
  AxiomV2ComputeQuery,
  AxiomV2DataQuery,
  HeaderField,
  QueryV2,
  bytes32,
} from "../../../src";

// Test coverage areas:
// - QueryID
// - QuerySchema

describe("Query ID and Schema calculation", () => {
  const config: AxiomSdkCoreConfig = {
    providerUri: process.env.PROVIDER_URI as string,
    privateKey: process.env.PRIVATE_KEY as string,
    chainId: 1,
    version: "v2",
  };
  const axiom = new AxiomSdkCore(config);

  const callback: AxiomV2Callback = {
    target: "0x41a7a901ef58d383801272d2408276d96973550d",
    extraData: bytes32("0xbbd0d3671093a36d6e3b608a7e3b1fdc96da1116"),
  };

  test("get query ID and querySchema for simple computeQuery with dataQuery", async () => {
    const computeQuery: AxiomV2ComputeQuery = {
      k: 13,
      resultLen: 1,
      vkey: [
        "0x83b88c6080be442679432e6c5634a3e3a7a26051a3b2581fba85dba0973fca20",
        "0xc04b25057d0bddf35d4542077516abb76445b8e745a457e3ccc1bf9aac2ba406",
        "0xa471542dc1c798279c6e094f7fae5174d83d5bd4f419d39f38a18a6aadadef23",
        "0xa17889e08418a09cecdac9afac9ddb4d839a56cc50205cd8df90ab459f53e900",
        "0x0000000000000000000000000000000000000000000000000000000000000080",
        "0x0000000000000000000000000000000000000000000000000000000000000080",
        "0x0000000000000000000000000000000000000000000000000000000000000080",
        "0xdaa121f99b66245770900bec7f7df67ba081c1ea1ec4e85de531e5efcb05dc2b",
        "0x72e95e6a67298de4d3da26492ee511e5b88295db678f739edb226e7947d38d0b",
        "0x22e4c62aacfc240ed0553bfad00122ba8c7627c870c739f3f818584e066a8b1f",
        "0x841485e0a9f109688bdc4f5ff851d9e2e44833ae573456742c1237322e938542",
        "0x79a62f1cc2f1440cc9fdcd534b612a49da4b6139bbed8cf53a26f4568ac3f567",
        "0x1c5846bb7c78a94b984ed2e0296334dd93085bdb3cbe3e69f89772ba64fa102c",
        "0xb9681242289c63756173eed28ce8ff44a71fe1fcf683bd07fcd70fdaede5b769",
      ],
      computeProof:
        "0x0000000000000000000000000000000000000000000000008713ff58e11eda2c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b742e3f91720ab2f43ece6b297314a246a28e8a37718433aee65e2452a1ebc57f4ca1a1e173855eaa5a9fbb74f96343f20e26d3d3ead44407e2e762f51ec4d0ed9b0aef7e5779df902223b4830ed0d12a02b950758107e35e5518d878cbff12da8658a104bf75f18aa7e3addaa8f4eaed64a353795f6e79b5faa6a633c3af06c2fb71ba568306ab02ca08f5a3a781b41f88696d30919d6bb1f849332d89f180065d76a0f0cbd417968fec77aee71be48054fcb4e6558be00fdce9a27a94aad593889074e456d9c1604b89eace24329a1e70091eaa7de84f0b5003719d5f4a7426599d89656cc63b4fe5889cbef9822b8bc72b13f5c17ce053168c479122de0024d54935ef42eacea4bcd71212dd3df7915258bb6b7e10b4fcba0cda608359a60e25ce4db9a4781e37fd89aa45b72b837bfedf2270abe6a71e39eb8a35bdbad1e967b1bc90fa8acee63c07191105168642f1d8b155342f1e0496ce9da38eade6bf41ba260e495de52802e49fa3cdc8df28a35b17c9d70420952e37034abfac36d7ab7dd54e0eccab23dcc53c12d0477046f6232c6e2b969eb38d432277ec24270e971c3d634f961848bbc9ae1a2e3c240056d3cd6f05cce571a417eeaf01c446fd30244b86c099a4c33d65f7b584152a3af87506b76c7ca75d4c1026becbf293003fbf082a70a5f59c8e04d4ff7ff6765c15881ece1da60dfd929e32c755239230bf43fc4550991af513d27dd6d6eaaf6722815574f6dfda59d2ccacf21f366037c7d3e718e28bc938f2f0bcc531106a6c080b1668af4cd43a1e78b6be2826b084788029be51d8e6a2c28aa3ff6a40a8cfad83258c9de474b927e9ab690760d159d29f54bcd509d436a9b5f9b823210ebc7270ed35a847e6a69a2c0144cb34d22cb4188b51dd1f066e2b81a8ca6b0eb71a63d70dc58cd6d6052c399afc220bd211595f31aa97ff14841347122e0339220f5d54e53fbf1637c9e06623279d27f11f855dc69c96c75d5c6eae7405d2818a9c3d23d278a98370d051cc807998374170c6b334eec536d0908e778e05f09dad697e6600b65664d452d95eccb96cfc1056dba89a96e878acf151abe100ba0bb9b5d312f78f71593b3362439beca96fb04d9e81ddf083b8d8d27761815149917c987b2f20d33fac83382bc3bbb06429c2c0fecd6ce7dc5dec284247b52df9c40eeda443cd2251f03dd7c273861a3416a102b62251dc9e7c2e5a31af17cf61e42ca536353041ff1e5c8250de0e4e3abbf268b59c095f2ac631d4d8096372bca388ab6d8a0fb65dede8377c79e8b7f7d900740e401f41adcbc17099e7aa8d460a5b83c4fad9778e47962049c22fdb3aaf51cff60d8b2f8f334918a30decf3e037a7a8c0e82f59164bdb64e39adfa8a63db052c82399a620c80d95bafcb87979a4de501948c0f1d3484f10c1a5ec4062e7f034043b6bc02b2e3b8827173e885cb1acbd835742c7cd7efcb96e4eddbf7831d1c1a7db7eb87c2949a9fdeccca48a072dcad163472f202312772eee02a1c3fd012d6b993f8a9f3f0948057f2cde182945fbf1c953fb6413a099180312c78da471289c0fa64c7c0228d79d7e432cfd00ef50973db40566a71221c1a0b89e6084526000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000de97f1ddfb2158546e5e03072fecbbe020f0dbd3de37507743e2fa0ebad01f1c90dabcf0e87726d1c855b8740ba4bd58e976a816d798c06a76eca992b5694f2e340984db397c67b1cff836cfe8511334d80b313b5b167849ac88bf68c7f9f11126a1dd52e4a44dbc34111734e572e47a6fcf395f1af6bc1ecd4513588038f51a5bdfc30a8b7eeb2bad8c6d353f405b65ca3644935ee6ce7b451420f6d7821c15c026098859e9e7ef0802201bb1d18cec3628d18858e307d8fc450cc487c3ed0e2ea995450e7d315de27bbe2dc3c984de54c4124fc5bfa316bab6782119610327f30bea752bc651ef7566c0a0b63019f80bba217203c82c9c81d9acb0ea60c01efddb1b4256395523642a5bc7d1b26a39326b7ae354a60bea41b514e8f1282312d26a6f35c969fa352d94a336118edd4cf01d9b84abdc817814d57cea99ac322ba025020705565ef4e356580bcaef735b1012bca412100c3a635d78a92683a12bfe47f0e03a21b89394bfb6a871da24eac0d61c38c7f3a0bb9dd80e2785065b157561e9f1c36d3f8002913bc37b2cda34d988af0154ce83536ba9b65093e61522927bc3c36119ca9d7cea8b57fda0957121358965c20f317ce227d816a411cd1daf43d3e16180dab1536b66944e96640f45b5583d4c351f72c126a02b995b102f1e4bc4a2d03b064cc6fdf6d8b0a919387002f22acfd6b6abb8676de7f4c8a607848a771aa2bea3f4d01d740a111e86282be89c83bf3ab7723fad017a453e6b07ac92550f2773027a09daf2c71030dce29042b7fa9d0e79a634b2990e49121510653a0d3a6939258ea5727164cc3ac9c8056391c0f3dae76a8eb6af86ee0c022a6abaf06d576ec79280cf5fdab040eb85b0bf89b0201b7cc39661671fe6f17b23b07a252e1da57576842a4c751ba7ed0a1e353e42acc64d97be8207ce9257d00ec9735011e00a5edba5dbbd8d7124911639526b0563911179c7bb6765745c6b0a10f7e06499deb91e71b5d52213b973cd761105e5950009e8a96b75c721f89c2f0e7e87d280431249edbaabe885198349651032396cb30bb20942d700abb8da2c0df5c2d5361dc487452cd3d7d5ea5da9a6b2fcceb8b49a4b84be63caf4fdce0e4e13218cbcdca3bc55a05981a169890efc7c8906500140c9c51aa75490d7c41e",
    };
    const dataQuery: AxiomV2DataQuery = {
      sourceChainId: "5",
      subqueries: [
        {
          subqueryData: { blockNumber: 9900000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9899000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9898000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9897000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9896000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9895000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9894000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9893000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9892000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9891000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9890000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9889000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9888000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9887000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9886000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9885000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9884000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9883000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9882000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9881000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9880000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9879000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9878000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9877000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
        {
          subqueryData: { blockNumber: 9876000, addr: "0xb392448932f6ef430555631f765df0dfae34eff3", fieldIdx: 1 },
          type: 2,
        },
      ],
    };
    const query = (axiom.query as QueryV2).new();
    query.setBuiltDataQuery(dataQuery);
    query.setComputeQuery(computeQuery);
    query.setCallback(callback);
    const builtQuery = await query.build();
    if (builtQuery === undefined) {
      throw new Error("builtQuery is undefined");
    }
    builtQuery.userSalt = bytes32(1); // lock the salt value for consistent results

    const querySchema = builtQuery.querySchema;
    expect(querySchema).toEqual("0x412efc8f4184ff6cb59c65113d3e64ddfdc521b3dd083bd076aecec735fb6e98");

    const queryId = await query.getQueryId();
    expect(queryId).toEqual("26331238880531630939427649691123836670567064478799277856427570787260492145586");
  });

  test("queryId should change with different caller", async () => {
    const blockNumber = 18400000;
    const dataQueryReq = [
      {
        blockNumber: blockNumber,
        fieldIdx: HeaderField.GasUsed,
      },
      {
        blockNumber: blockNumber + 1000,
        fieldIdx: HeaderField.GasUsed,
      },
    ];
    const query = (axiom.query as QueryV2).new();
    query.append(dataQueryReq);
    query.setCallback(callback);

    await query.build();
    const builtQuery = query.getBuiltQuery();
    if (builtQuery === undefined) {
      throw new Error("builtQuery is undefined");
    }
    builtQuery.userSalt = bytes32(1); // lock the salt value for consistent results

    let queryId = await query.getQueryId();
    expect(queryId).toEqual("34105472793833197573956594097263260213057846125309585781735597677991434057572");

    queryId = await query.getQueryId("0x41a7a901ef58d383801272d2408276d96973550d");
    expect(queryId).toEqual("7120525174168517755499793234294755392835908142367641295038978869119154112223");
  });
});
