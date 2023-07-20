import _sodium from 'libsodium-wrappers';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';






export const createKeyPair = async () => {
    await _sodium.ready;
    const sodium = _sodium;

    let { publicKey, privateKey } = sodium.crypto_sign_keypair();
    const publicKey_base64 = sodium.to_base64(publicKey, _sodium.base64_variants.ORIGINAL);
    const privateKey_base64 = sodium.to_base64(privateKey, _sodium.base64_variants.ORIGINAL);

    return { publicKey: publicKey_base64, privateKey: privateKey_base64 };
}

const transactionId = uuid();
// const gps = "19.124398,72.910208";
// const pincode = "400076";

const gps = "12.953085,77.5838393";
const pincode = "560001";

const cityCode = 'std:080';
// const cityCode = '*';

const createSigningString = async (message, created, expires) => {
    if (!created) created = Math.floor(new Date().getTime() / 1000).toString();
    if (!expires) expires = (parseInt(created) + (1 * 60 * 60)).toString();

    await _sodium.ready;

    const sodium = _sodium;
    // console.log('sodium.from_string(message)', sodium.from_string(message));
    const digest = sodium.crypto_generichash(64, sodium.from_string(message));
    // console.log('Blake digest: ', digest);
    const digest_base64 = sodium.to_base64(digest, _sodium.base64_variants.ORIGINAL);
    // console.log('Blake digest_base64: ', digest_base64);

    const signing_string =
        `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`
// console.log('Blake signing_string: ', signing_string);
    return { signing_string, created, expires };
}

const signMessage = async (signing_string, privateKey) => {
    await _sodium.ready;
    const sodium = _sodium;

    const signedMessage = sodium.crypto_sign_detached(
        signing_string,
        sodium.from_base64(privateKey, _sodium.base64_variants.ORIGINAL)
    );
    // console.log('Blake signedMessage: ', signedMessage);
    const signMessageBase64 = sodium.to_base64(signedMessage, _sodium.base64_variants.ORIGINAL);
    // console.log ('Blake signMessageBase64', signMessageBase64);
    return signMessageBase64;
}

const createAuthorizationHeader = async (message, type) => {
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

    const subscriber_id = '-test-money-website-3000a.stg.corp.-test-cabs.com';
    const unique_key_id = '643';
    const header = `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`
    console.log('Signature header', type, header);

    console.log('');
    console.log('');
    console.log('********* Creating Signature Ended : ***********');
    console.log('');
    console.log('');
    
    return header;
}

let searchObj = {
	"context": {
		"domain": "nic2004:52110",
		"country": "IND",
		"city": cityCode,
		"action": "search",
		"core_version": "1.1.0",
		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
		"transaction_id": transactionId,
		// "transaction_id": "e430cfc9-a2bb-4a78-8c1c-405376er45ty",
		"message_id": uuid(),
		// "message_id": "fdab890b-ffef-453b-a17c-dc1232dfr45t",
		"timestamp": new Date().toISOString(),
		"ttl": "PT60S"
	},
	"message": {
		"intent": {
			"fulfillment": {
				"type": "delivery",
				"end": {
					"location": {
						"gps": gps,
						"address": {
							"area_code": pincode
						}
					}
				}
			},
			"payment": {
				"@ondc/org/buyer_app_finder_fee_type": "percent",
				"@ondc/org/buyer_app_finder_fee_amount": "3"
			}
		}
	}
};
const searchObjParsed = JSON.parse(JSON.stringify(searchObj));
console.log('searchObj', JSON.stringify(searchObjParsed));

let headerSignature = createAuthorizationHeader(searchObj, 'SEARCH').then(sig => headerSignature = sig);





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
    // console.log('');
    // console.log('');
    // console.log('********* Validating signature started : header, body *******', header, body);
    // console.log('');
    // console.log('');
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
    // console.log('Signature valid: ', isSignatureValidRes);
    clearTimeout(tmOut);
}, 5000);




// ****************************************************************** Select starts ******************************************************************

const selectPayload = {
	"context": {
		"domain": "nic2004:52110",
		"action": "select",
		"core_version": "1.1.0",
		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
		"bpp_id": "staging-ondc-seller.viranc.com",
		"bpp_uri": "https://staging-ondc-seller.viranc.com/protocol/v1/retail",
		"transaction_id": transactionId,
		"message_id": uuid(),
		"city": cityCode,
		"country": "IND",
		"timestamp": new Date().toISOString(),
		"ttl": "PT60S"
	},
	"message": {
		"order": {
			"provider": {
				"id": "d04c6a6c-7601-11ed-b223-0242ac120003",
				"locations": [{
					"id": "d04c6a6c-7601-11ed-b223-0242ac120003-location"
				}]
			},
			"items": [
				{
					"id": "d05a195a-7601-11ed-b223-0242ac120003",
					"location_id": "d04c6a6c-7601-11ed-b223-0242ac120003-location",
					"quantity": {
						"count": 1
					}
				},
				{
					"id": "d9086493-f5b9-434e-ac0f-08131a31c5dc",
					"location_id": "d04c6a6c-7601-11ed-b223-0242ac120003-location",
					"quantity": {
						"count": 2
					}
				},
			],
			"fulfillments": [{
				"end": {
					"location": {
						"gps": gps,
						"address": {
							"area_code": pincode
						}
					}
				}
			}]
		}
	}
};

// const selectPayload = {
// 	"context": {
// 		"domain": "nic2004:52110",
// 		"action": "select",
// 		"core_version": "1.1.0",
// 		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
// 		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
// 		"bpp_id": "staging-ondc-seller.viranc.com",
// 		"bpp_uri": "https://staging-ondc-seller.viranc.com/protocol/v1/retail",
// 		"transaction_id": transactionId,
// 		"message_id": uuid(),
// 		"city": "*",
// 		"country": "IND",
// 		"timestamp": new Date().toISOString(),
// 		"ttl": "PT60S"
// 	},
// 	"message": {
// 		"order": {
// 			"provider": {
// 				"id": "d04c6a6c-7601-11ed-b223-0242ac120003",
// 				"locations": [{
// 					"id": "d04c6a6c-7601-11ed-b223-0242ac120003-location"
// 				}]
// 			},
// 			"items": [{
// 				"id": "d05a195a-7601-11ed-b223-0242ac120003",
// 				"location_id": "d04c6a6c-7601-11ed-b223-0242ac120003-location",
// 				"quantity": {
// 					"count": 1
// 				}
// 			}],
// 			"fulfillments": [{
// 				"end": {
// 					"location": {
// 						"gps": gps,
// 						"address": {
// 							"area_code": pincode
// 						}
// 					}
// 				}
// 			}]
// 		}
// 	}
// };

// const selectPayload = {"context":{"domain":"nic2004:52110","action":"select","core_version":"1.1.0","bap_id":"-test-money-website-3000a.stg.corp.-test-cabs.com","bap_uri":"https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc","bpp_id":"staging-ondc-seller.viranc.com","bpp_uri":"https://staging-ondc-seller.viranc.com/protocol/v1/retail","transaction_id":"16018b5c-96fe-472e-ab64-92ac9c7b0060","message_id":"184a20fd-7442-47e2-ab18-ff73d48a2aee","city":cityCode,"country":"IND","timestamp":"2023-06-16T07:51:52.992Z","ttl":"PT60S"},"message":{"order":{"provider":{"id":"d04c6a6c-7601-11ed-b223-0242ac120003","locations":[{"id":"d04c6a6c-7601-11ed-b223-0242ac120003-location"}]},"items":[{"id":"d05a195a-7601-11ed-b223-0242ac120003","location_id":"d04c6a6c-7601-11ed-b223-0242ac120003-location","quantity":{"count":1}}],"fulfillments":[{"end":{"location":{"gps":gps,"address":{"area_code":"560068"}}}}]}}}const selectPayloadStr = JSON.stringify(selectPayload);
const selectPayloadStr = JSON.stringify(selectPayload);
console.log('selectPayloadStr', selectPayloadStr);

let selectSignature = createAuthorizationHeader(selectPayloadStr, 'SELECT').then(sig => selectSignature = sig);




// ****************************************************************** Select ends ******************************************************************

// Same code as above
const initPayload = {
	"context": {
		"domain": "nic2004:52110",
		"action": "init",
		"core_version": "1.1.0",
		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
		"bpp_id": "seller.instastack.io",
		"bpp_uri": "https://seller.instastack.io/api/",
		"transaction_id": transactionId,
		"message_id": uuid(),
		"city": "*",
		"country": "IND",
		"timestamp": new Date().toISOString(),
		"ttl": "PT60S"
	},
	"message": {
		"order": {
			"provider": {
				"id": "e649c7a6-7cce-48bb-82bb-8d5341a0a9c7",
				"locations": [{
					"id": "f5f41af3-30ec-41be-bace-880c96e5f59e"
				}]
			},
			"items": [{
				"id": "143141",
				"fulfillment_id": "1",
				"quantity": {
					"count": 1
				}
			}],
			"billing": {
				"name": "Ekansh Katiyar",
				"address": {
					"door": "B005 aaspire heights",
					"name": "33rd Cross Road, Vinayaka Layout",
					"locality": "33rd Cross Road, Vinayaka Layout",
					"city": "Mumbai",
					"state": "Maharashtra",
					"country": "IND",
					"area_code": pincode
				},
				"email": "ekansh@gmail.com",
				"phone": "9886098860",
				"created_at": new Date().toISOString(),
				"updated_at": new Date().toISOString()
			},
			"fulfillments": [{
				"id": "1",
				"type": "delivery",
				"provider_id": "e649c7a6-7cce-48bb-82bb-8d5341a0a9c7",
				"tracking": false,
				"end": {
					"location": {
						"gps": gps,
						"address": {
							"door": "B005 aaspire heights",
							"name": "3rd Cross Road, Vinayaka Layout",
							"locality": "3rd Cross Road, Vinayaka Layout",
							"city": "Mumbai",
							"state": "Maharashtra",
							"country": "IND",
							"area_code": pincode
						}
					},
					"contact": {
						"phone": "9886098860"
					}
				}
			}],
			"tags": [{
				"code": "bap_terms_fee",
				"list": [{
						"code": "finder_fee_type",
						"value": "percent"
					},
					{
						"code": "finder_fee_amount",
						"value": "3"
					}
				]
			}]
		}
	}
};

const initPayloadParsed = JSON.parse(JSON.stringify(initPayload));
console.log('initPayload', JSON.stringify(initPayloadParsed));

let initPayloadSign = createAuthorizationHeader(selectPayloadStr, 'INIT').then(sig => selectSignature = sig);

// ******************************* Confirm starts *******************************


const confirmPayload = {
	"context": {
		"domain": "nic2004:52110",
		"action": "confirm",
		"core_version": "1.1.0",
		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
		"bpp_id": "seller.instastack.io",
		"bpp_uri": "https://seller.instastack.io/api/",
		"transaction_id": transactionId,
		"message_id": uuid(),
		"city": cityCode,
		"country": "IND",
		"timestamp": new Date().toISOString(),
		"ttl": "PT60S"
	},
	"message": {
		"order": {
			"id": uuid(),
			"state": "Created",
			"provider": {
				"id": "e649c7a6-7cce-48bb-82bb-8d5341a0a9c7",
				"locations": [{
					"id": "f5f41af3-30ec-41be-bace-880c96e5f59e"
				}]
			},
			"items": [{
				"id": "143141",
				"fulfillment_id": "1",
				"quantity": {
					"count": 1
				}
			}],
			"billing": {
				"name": "Ekansh Katiyar",
				"address": {
					"door": "B005 aaspire heights",
					"name": "3rd Cross Road, Vinayaka Layout",
					"locality": "3rd Cross Road, Vinayaka Layout",
					"city": "Mumbai",
					"state": "Maharashtra",
					"country": "IND",
					"area_code": pincode
				},
				"phone": "9886098860",
				"email": "ekansh.katiyar@gmail.com"
			},
			"fulfillments": [{
				"id": "1",
				"type": "Delivery",
				"tracking": false,
				"provider_id": "e649c7a6-7cce-48bb-82bb-8d5341a0a9c7",
				"end": {
					"person": {
						"name": "Ramu"
					},
					"contact": {
						"email": "aditya@dataorc.in",
						"phone": "8793771717"
					},
					"location": {
						"gps": gps,
						"address": {
							"door": "B005 aaspire heights",
							"name": "33rd Cross Road, Vinayaka Layout",
							"locality": "33rd Cross Road, Vinayaka Layout",
							"city": "Mumbai",
							"state": "Maharashtra",
							"country": "IND",
							"area_code": pincode
						}
					}
				}
			}],
			"quote": {
				"price": {
					"currency": "INR",
					"value": "20"
				},
				"breakup": [{
						"@ondc/org/item_id": "143141",
						"@ondc/org/item_quantity": {
							"count": 1
						},
						"title": "Maggi 2 Minute Chicken Noodles, 76 g",
						"@ondc/org/title_type": "item",
						"price": {
							"currency": "INR",
							"value": "20"
						}
					},
					{
						"@ondc/org/item_id": "143141",
						"title": "Delivery charges",
						"@ondc/org/title_type": "delivery",
						"price": {
							"currency": "INR",
							"value": "0.0"
						}
					},
					{
						"@ondc/org/item_id": "143141",
						"title": "Packing charges",
						"@ondc/org/title_type": "packing",
						"price": {
							"currency": "INR",
							"value": "0.0"
						}
					},
					{
						"@ondc/org/item_id": "143141",
						"title": "Tax",
						"@ondc/org/title_type": "tax",
						"price": {
							"currency": "INR",
							"value": "0.0"
						}
					}
				]
			},
			"payment": {
				"uri": "https://ondc.transaction.com/payment",
				"tl_method": "http/get",
				"params": {
					"currency": "INR",
					"transaction_id": transactionId,
					"amount": "20"
				},
				"status": "PAID",
				"type": "ON-ORDER",
				"collected_by": "BAP",
				"@ondc/org/buyer_app_finder_fee_type": "Percent",
				"@ondc/org/buyer_app_finder_fee_amount": "0.0",
				"@ondc/org/withholding_amount": "0.0",
				"@ondc/org/return_window": "0",
				"@ondc/org/settlement_basis": "Collection",
				"@ondc/org/settlement_window": "P2D",
				"@ondc/org/settlement_details": [{
					"settlement_counterparty": "seller-app",
					"settlement_phase": "sale-amount",
					"settlement_type": "upi",
					"upi_address": "gft@oksbi",
					"settlement_bank_account_no": "XXXXXXXXXX",
					"settlement_ifsc_code": "XXXXXXXXX",
					"beneficiary_name": "xxxxx",
					"bank_name": "xxxx",
					"branch_name": "xxxx"
				}]
			},
			"tags": [{
					"code": "bap_terms_fee",
					"list": [{
							"code": "finder_fee_type",
							"value": "percent"
						},
						{
							"code": "finder_fee_amount",
							"value": "3"
						},
						{
							"code": "accept",
							"value": "Y"
						}
					]
				},
				{
					"code": "bpp_terms_liability",
					"list": [{
							"code": "max_liability_cap",
							"value": "10000"
						},
						{
							"code": "max_liability",
							"value": "2"
						},
						{
							"code": "accept",
							"value": "Y"
						}
					]
				},
				{
					"code": "bpp_terms_arbitration",
					"list": [{
							"code": "mandatory_arbitration",
							"value": "false"
						},
						{
							"code": "court_jurisdiction",
							"value": "KA"
						},
						{
							"code": "accept",
							"value": "Y"
						}
					]
				},
				{
					"code": "bpp_terms_charges",
					"list": [{
							"code": "delay_interest",
							"value": "1000"
						},
						{
							"code": "accept",
							"value": "Y"
						}
					]
				},
				{
					"code": "bpp_seller_gst",
					"list": [{
						"code": "GST",
						"value": "XXXXXXXXXXXXXXX"
					}]
				}
			],
			"created_at": "2022-05-10T18:01:53.000Z",
			"updated_at": "2022-05-10T18:02:19.000Z"
		}
	}
};

const confirmPayloadParsed = JSON.parse(JSON.stringify(confirmPayload));
console.log('confirmPayload', JSON.stringify(confirmPayloadParsed));
createAuthorizationHeader(JSON.stringify(confirmPayloadParsed), 'INIT');



// ******************* STATUS *******************

const statusPayload = {
	"context": {
		"domain": "nic2004:52110",
		"action": "confirm",
		"core_version": "1.1.0",
		"bap_id": "-test-money-website-3000a.stg.corp.-test-cabs.com",
		"bap_uri": "https://-test-money-website-3000a.stg.corp.-test-cabs.com/ondc",
		"bpp_id": "seller.instastack.io",
		"bpp_uri": "https://seller.instastack.io/api/",
		"transaction_id": "f799383c-24a6-4dba-8a84-3d5406c8ae2e",
		"message_id": "ed1974e0-0c29-4dd8-91a3-94ac1970800f",
		"city": cityCode,
		"country": "IND",
		"timestamp": new Date().toISOString(),
		"ttl": "PT60S"
	},
	"message": {
		"order_id": "4a9d9373-3c34-47e6-a38f-251b02265656"
	}
};

const statusPayloadParsed = JSON.parse(JSON.stringify(statusPayload));
console.log('statusPayload', JSON.stringify(statusPayloadParsed));
createAuthorizationHeader(JSON.stringify(confirmPayloadParsed), 'CONFIRM');