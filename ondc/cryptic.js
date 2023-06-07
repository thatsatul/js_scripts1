import _sodium from 'libsodium-wrappers';
import _ from 'lodash';

const createSigningString = async (message, created, expires) => {
    if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
    if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString();

    await _sodium.ready;

    const sodium = _sodium;
    console.log('sodium.from_string(message)', sodium.from_string(message));
    const digest = sodium.crypto_generichash(64, sodium.from_string(message));
    console.log('Blake digest: ', digest);
    const digest_base64 = sodium.to_base64(digest, _sodium.base64_variants.ORIGINAL);
    console.log('Blake digest_base64: ', digest_base64);

    const signing_string =
        `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`
console.log('Blake signing_string: ', signing_string);
    return { signing_string, created, expires };
}

const signMessage = async (signing_string, privateKey) => {
    await _sodium.ready;
    const sodium = _sodium;

    const signedMessage = sodium.crypto_sign_detached(
        signing_string,
        sodium.from_base64(privateKey, _sodium.base64_variants.ORIGINAL)
    );
    console.log('Blake signedMessage: ', signedMessage);
    const signMessageBase64 = sodium.to_base64(signedMessage, _sodium.base64_variants.ORIGINAL);
    console.log ('Blake signMessageBase64', signMessageBase64);
    return signMessageBase64;
}

const createAuthorizationHeader = async (message) => {
    const {
        signing_string,
        expires,
        created
    } = await createSigningString(JSON.stringify(message));

    const signature = await signMessage(signing_string, 'SPHSGdE7O2PAsTqlHe2TlBuaRuvGd5PwcikI2Enl20Swi6VOnQhKTkNzy0ap+66DqUMn6TWcQVDDbdI7va2ELQ==' || "");

    const subscriber_id = 'OM-website-3000a.stg.corp.OC.com';
    const unique_key_id = '643';
    const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
    console.log('Signature header', header);
    return header;
}

let obj = {"context":{"domain":"nic2004:52110","country":"IND","city":"*","action":"search","core_version":"1.1.0","bap_id":"OM-website-3000a.stg.corp.OC.com","bap_uri":"https://OM-website-3000a.stg.corp.OC.com/ondc","transaction_id":"asdasdasdasda-asdasd","message_id":"1","timestamp":new Date().toISOString(),"ttl":"P30M"},"message":{"intent":{"item":{"descriptor":{"name":"coffee"}},"fulfillment":{"type":"Delivery"},"payment":{"@ondc/org/buyer_app_finder_fee_type":"percent","@ondc/org/buyer_app_finder_fee_amount":"3"}}}};
// obj = JSON.stringify(obj);
console.log('obj', obj);

createAuthorizationHeader(obj);
