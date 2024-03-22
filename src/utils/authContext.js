import crypto from 'crypto';

const customSerialize = (value) => {
  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return `[${value.map(customSerialize).join(', ')}]`
    } else {
      let nestedParts = []
      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        nestedParts.push(`${nestedKey}: ${customSerialize(nestedValue)}`)
      }
      return `{${nestedParts.join(', ')}}`
    }
  }
  return JSON.stringify(value)
}

const serializePayload = (payload) => {
  let parts = []
  for (const [key, value] of Object.entries(payload)) {
    parts.push(`${key}:${customSerialize(value)}`)
  }
  return parts.join(',')
}

const createSignature = (secret, payload, timestamp) => {
  let payloadStr = `timestamp:${timestamp},${serializePayload(payload)}`
  console.log('Payload string:', payloadStr)

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payloadStr)
  return hmac.digest('base64')
}

const dt = new Date()
const utcSeconds = Math.floor(dt.getTime() / 1000)
const timestampMillisecond = utcSeconds * 1000
const requestPayload = {}
const clientSecret = ''

const signature = createSignature(
  clientSecret,
  requestPayload,
  timestampMillisecond
)
console.log(signature)

const headers = {
  'X-VERYFI-REQUEST-TIMESTAMP': timestampMillisecond.toString(),
  'X-VERYFI-REQUEST-SIGNATURE': signature,
  'CLIENT-ID': 'vrfWxnyNHLND0bWymAZBlTbWp6gzlfoPEdddlaj',
  AUTHORIZATION: 'apikey chonthicha.pc:f3da01f277e17bc6bec576c280d1452f',
}

console.log(headers)
