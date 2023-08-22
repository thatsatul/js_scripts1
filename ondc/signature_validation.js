import fetch from "node-fetch";
import _sodium from 'libsodium-wrappers';
import _ from 'lodash';

const createSigningString = async (message, created, expires) => {
  if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
  if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString();

  await _sodium.ready;

  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(digest, _sodium.base64_variants.ORIGINAL);
  console.log('Blake digest_base64: ', digest_base64);

  const signing_string =
      `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`
console.log('Blake signing_string: ', signing_string);
  return { signing_string, created, expires };
}

const getProviderPublicKey = async (providers, keyId) => {
  console.log('getProviderPublicKey providers', providers);
  try {

      const provider = _.find(providers, ['ukId', keyId]);
      console.log('getProviderPublicKey provider', provider);
      return provider?.signing_public_key || false;

  } catch (e) {
      return false;
  }
}

const lookupRegistry = async (subscriber_id, unique_key_id) => {
  try {

      let response = await fetch('https://pilot-gateway-1.beckn.nsdl.co.in/lookup', {
        method: 'POST',
        body: JSON.stringify({
          subscriber_id: subscriber_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      console.log('lookupRegistry response for subscriber_id', subscriber_id, response);

      if (!response) {
          return false;
      }

      const public_key = getProviderPublicKey(response, unique_key_id)
      console.log('lookupRegistry public_key', public_key);
      if (!public_key)
          return false;

      return public_key;

  } catch (e) {
        console.log('Error in lookupRegistry', e);
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
      const res = await sodium.crypto_sign_verify_detached(sodium.from_base64(signedString, _sodium.base64_variants.ORIGINAL), signingString, sodium.from_base64(publicKey, _sodium.base64_variants.ORIGINAL));
      console.log('res verifyMessage', res);
      return res;
  } catch (error) {
      console.log('err verifyMessage', error);
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
      // const public_key = await lookupRegistry(subscriber_id, keyId)
      const public_key = 'sIulTp0ISk5Dc8tGqfuug6lDJ+k1nEFQw23SO72thC0=';

      console.log('isSignatureValid public_key', public_key);

      const isValid = await verifyHeader(headerParts, body, public_key)
      return isValid
  } catch (e) {
      return false
  }
}

const sig = 'Signature keyId="-test-money-website-3000a.stg.corp.-test-cabs.com|643|ed25519",algorithm="ed25519",created="1692701922",expires="1692705522",headers="(created) (expires) digest",signature="BfDEgohpFcus3S/DcIADvqo7h+McmS+i87A/pCOiQdDJ2ZIw1QNg17WYffXDvz0GR4BSAfsxl6YeFGh/ROOFAQ=="';
const payload = {"context":{"domain":"nic2004:52110","country":"IND","city":"std:080","action":"search","core_version":"1.1.0","bap_id":"-test-money-website-3000a.stg.corp.-test-cabs.com","bap_uri":"https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc","transaction_id":"6326c35d-939e-40fd-8dc5-5954baef32d8","message_id":"9cc47415-f83f-42ac-aad5-ae8d7fc45a6e","timestamp":"2023-08-22T10:58:42.832Z","ttl":"PT30S"},"message":{"intent":{"item":{"descriptor":{"name":"chakki"}},"fulfillment":{"type":"Delivery","end":{"location":{"gps":"12.889864,77.64095"}}}}}};
const signatureRes = await isSignatureValid(sig, payload);

console.log('signatureRes', signatureRes);
