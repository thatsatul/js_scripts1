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
      const public_key = PUBLIC_KEY_GLOBAL;

      console.log('isSignatureValid public_key', public_key);

      const isValid = await verifyHeader(headerParts, body, public_key)
      return isValid
  } catch (e) {
      return false
  }
}

const PUBLIC_KEY_GLOBAL = "IB/nqGyzfZStw4pizbgdIXP6rsibqAurg0ibSJH7vE8=";
const sig = 'Signature keyId="staging-ondc-seller.viranc.com|475|ed25519",algorithm="ed25519",created="1692703775",expires="1692707375",headers="(created) (expires) digest",signature="fkH0i+gekN8Df2Rv42IkxtgUVckTrdy/sy9Vu+uVM7ihMuayJ6cr36ZEm5VMEhF31VGGInuQW0wQIRYK9FecBw=="';
const payload = {"context":{"domain":"nic2004:52110","country":"IND","city":"std:080","action":"on_select","core_version":"1.1.0","bap_id":"-test-money-website-3000a.stg.corp.-test-cabs.com","bap_uri":"https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc","bpp_id":"staging-ondc-seller.viranc.com","bpp_uri":"https://staging-ondc-seller.viranc.com/protocol/v1/retail","transaction_id":"1c7fc9a1-dcdf-4379-a0c4-6b1bbc916f10","message_id":"f013262f-9f20-4785-b03b-aa2051c12274","timestamp":"2023-08-22T11:29:35.718Z"},"message":{"order":{"items":[{"id":"d05a195a-7601-11ed-b223-0242ac120003","fulfillment_id":"93e79127-7c0a-5eff-9c2a-792252d18f61"}],"quote":{"price":{"currency":"INR","value":"450.11"},"breakup":[{"@ondc/org/item_id":"d05a195a-7601-11ed-b223-0242ac120003","@ondc/org/item_quantity":{"count":1},"title":"Aashirvaad Shudh Chakki Atta, 10kg Pack","@ondc/org/title_type":"item","price":{"currency":"INR","value":"437.00"},"item":{"price":{"currency":"INR","value":"437.00"},"quantity":{"available":{"count":"676"},"maximum":{"count":"676"}}}},{"@ondc/org/item_id":"93e79127-7c0a-5eff-9c2a-792252d18f61","title":"Delivery charges","@ondc/org/title_type":"delivery","price":{"currency":"INR","value":"0.00"}},{"@ondc/org/item_id":"93e79127-7c0a-5eff-9c2a-792252d18f61","title":"Convenience Fee","@ondc/org/title_type":"misc","price":{"currency":"INR","value":"13.11"}}],"ttl":"P1D"},"provider":{"id":"d04c6a6c-7601-11ed-b223-0242ac120003","descriptor":{"name":"ONDC Test Seller Store","short_desc":"ONDC Test Seller Store","long_desc":"ONDC Test Seller Store","images":["https://viranc.com/placeholder.jpg"],"symbol":"https://viranc.com/placeholder.jpg"}},"fulfillments":[{"id":"93e79127-7c0a-5eff-9c2a-792252d18f61","@ondc/org/provider_name":"ONDC Test Seller Store","tracking":false,"state":{"descriptor":{"code":"Serviceable"}},"@ondc/org/category":"Standard Delivery","@ondc/org/TAT":"P1DT2M"}]}}};
const signatureRes = await isSignatureValid(sig, JSON.parse(JSON.stringify(payload)));

console.log('signatureRes', signatureRes);
