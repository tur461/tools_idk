const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } = require('@polkadot/keyring');
const {cryptoWaitReady} = require('@polkadot/util-crypto');

const hash = "0x4cfd9d8e94c056eb06b691e09f00eb72adba85c5eac473e3d20732cedd8fe7a7";

const jdo = v => JSON.parse(JSON.stringify(v));

async function main(){
    // Construct
    const wsProvider = new WsProvider('ws://127.0.0.1:40000');
    console.log(jdo(wsProvider))
    const keyring = new Keyring({ type: 'sr25519' });
    await cryptoWaitReady()
    const alice = keyring.addFromUri('//ALICE');
    await cryptoWaitReady()
    const api = await ApiPromise.create({ provider: wsProvider });
    
    await cryptoWaitReady()


    try{
        //const nonSudoCall = api.tx.esgScore.add_oracle(15, 30);
        //const sudoTx = await api.tx.sudo.sudo(nonSudoCall)
        //.signAndSend(alice);
        //console.log("Result:", sudoTx.toHuman());
        const block = await api.rpc.chain.getBlock(hash);
        console.log('block:', jdo(block));
        const det = api.rpc.payment.queryFeeDetails(block.extrensics[1].toHex(), hash);
        await cryptoWaitReady()
        console.log("query details:", jdo(det.toHuman()));
        const qInfo = api.rpc.payment.queryInfo(block.extrensics[1].toHex(), hash);
        await cryptoWaitReady()
        console.log("query info:", jdo(qInfo.toHuman()));
    }
    catch(error){
        console.log(error);
    }  
}   
main().then(() => console.log('completed'));
