import _sodium from 'libsodium-wrappers';
import _ from 'lodash';
import { uuid } from 'uuidv4';

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
    console.log('');
    console.log('');
    console.log('********* Creating Signature started : ***********');
    console.log('');
    console.log('');
    const {
        signing_string,
        expires,
        created
    } = await createSigningString(JSON.stringify(message));

    const signature = await signMessage(signing_string, 'SPHSGdE7O2PAsTqlHe2TlBuaRuvGd5PwcikI2Enl20Swi6VOnQhKTkNzy0ap+66DqUMn6TWcQVDDbdI7va2ELQ==' || "");

    const subscriber_id = 'olamoney-website-3000a.stg.corp.olacabs.com';
    const unique_key_id = '643';
    const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
    console.log('Signature header', header);

    console.log('');
    console.log('');
    console.log('********* Creating Signature Ended : ***********');
    console.log('');
    console.log('');
    
    return header;
}

let searchObj = {"context":{"domain":"nic2004:52110","country":"IND","city":"*","action":"search","core_version":"1.1.0","bap_id":"olamoney-website-3000a.stg.corp.olacabs.com","bap_uri":"https://olamoney-website-3000a.stg.corp.olacabs.com/ondc","transaction_id":uuid(),"message_id":uuid(),"timestamp":new Date().toISOString(),"ttl":"PT60S"},"message":{"intent":{"item":{"descriptor":{"name":"atta"}},"payment":{"@ondc/org/buyer_app_finder_fee_type":"percent","@ondc/org/buyer_app_finder_fee_amount":"3"}}}};
// Fixed obj
// let searchObj = {"context":{"domain":"nic2004:52110","country":"IND","city":"*","action":"search","core_version":"1.1.0","bap_id":"olamoney-website-3000a.stg.corp.olacabs.com","bap_uri":"https://olamoney-website-3000a.stg.corp.olacabs.com/ondc","transaction_id":"1f7bcc26-c0b4-4ba2-b69b-d4ce8a63d040","message_id":"ac9b8cb5-76ef-4965-928e-29fc668c8b99","timestamp":"2023-06-07T07:54:49.821Z","ttl":"P30M"},"message":{"intent":{"item":{"descriptor":{"name":"atta"}},"payment":{"@ondc/org/buyer_app_finder_fee_type":"percent","@ondc/org/buyer_app_finder_fee_amount":"3"}}}};
console.log('searchObj', searchObj);

let headerSignature = createAuthorizationHeader(searchObj).then(sig => headerSignature = sig);









export const createKeyPair = async () => {
    await _sodium.ready;
    const sodium = _sodium;

    let { publicKey, privateKey } = sodium.crypto_sign_keypair();
    const publicKey_base64 = sodium.to_base64(publicKey, _sodium.base64_variants.ORIGINAL);
    const privateKey_base64 = sodium.to_base64(privateKey, _sodium.base64_variants.ORIGINAL);

    return { publicKey: publicKey_base64, privateKey: privateKey_base64 };
}








const getProviderPublicKey = async (providers, keyId) => {
    try {

        const provider = _.find(providers, ['ukId', keyId]);
        return provider?.signing_public_key || false;

    } catch (e) {
        return false;
    }
}

const lookupRegistry = async (subscriber_id, unique_key_id) => {
    try {

        const response = await lookupBppById({
            type: getSubscriberType(SUBSCRIBER_TYPE.BAP),
            subscriber_id: subscriber_id
        });

        if (!response) {
            return false;
        }

        const public_key = await getProviderPublicKey(response, unique_key_id)

        if (!public_key)
            return false;

        return public_key;

    } catch (e) {
        return false;
    }
}

const remove_quotes = (a) => {
    return a.replace(/^["'](.+(?=["']$))["']$/, '$1');
}

const split_auth_header = (auth_header) => {
    const header = auth_header.replace('Signature ', '');
    let re = /\s*([^=]+)=([^,]+)[,]?/g;
    let m;
    let parts = {}
    while ((m = re.exec(header)) !== null) {
        if (m) {
            parts[m[1]] = remove_quotes(m[2]);
        }
    }
    return parts;
}

const verifyMessage = async (signedString, signingString, publicKey) => {
    try {
        await _sodium.ready;
        const sodium = _sodium;
        return sodium.crypto_sign_verify_detached(sodium.from_base64(signedString, _sodium.base64_variants.ORIGINAL), signingString, sodium.from_base64(publicKey, _sodium.base64_variants.ORIGINAL));
    } catch (error) {
        return false
    }
}

const verifyHeader = async (headerParts, body, public_key) => {
    const { signing_string } = await createSigningString(JSON.stringify(body), headerParts['created'], headerParts['expires']);
    const verified = await verifyMessage(headerParts['signature'], signing_string, public_key);
    return verified;
}

export const isSignatureValid = async (header, body) => {
    console.log('');
    console.log('');
    console.log('********* Validating signature started : header, body *******', header, body);
    console.log('');
    console.log('');
    try {
        const headerParts = split_auth_header(header);
        const keyIdSplit = headerParts['keyId'].split('|')
        const subscriber_id = keyIdSplit[0]
        const keyId = keyIdSplit[1]
        const public_key = await lookupRegistry(subscriber_id, keyId)
        // const public_key = 'sIulTp0ISk5Dc8tGqfuug6lDJ+k1nEFQw23SO72thC0=';

        const isValid = await verifyHeader(headerParts, body, public_key)
        return isValid
    } catch (e) {
        return false
    }
}

export const signRegistryRequest = async (request) => {
    
    let reqObj = [];

    if(request.country)
        reqObj.push(request.country);
    if(request.domain)
        reqObj.push(request.domain);
    if(request.type)
        reqObj.push(request.type);
    if(request.city)
        reqObj.push(request.city);
    if(request.subscriber_id)
        reqObj.push(request.subscriber_id);

    const signingString = reqObj.join("|");
    return await signMessage(signingString, process.env.BAP_PRIVATE_KEY || "");
}

export const formatRegistryRequest = async (request) => {
    const signature = await signRegistryRequest(request);

    return {
        sender_subscriber_id: process.env.BAP_ID,
        request_id: uuidv4(),
        timestamp: new Date().toISOString(),
        search_parameters: {
            ...request
        },
        signature: signature
    }
}

const tmOut = setTimeout(async () => {
    // Just checking if signature is valid
    const isSignatureValidRes = await isSignatureValid(headerSignature, searchObj);
    console.log('Signature valid: ', isSignatureValidRes);
    clearTimeout(tmOut);
}, 5000);
