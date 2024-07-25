import CryptoJS from 'crypto-js';

interface TokenPayload {
  [key: string]: any;
  exp?: number | undefined;
  iat?: number | undefined;
}

interface TokenHeader {
  alg: string | Algorithm;
  typ?: string | undefined;
}

const header: TokenHeader = {
  alg: 'HS256',
  typ: 'JWT',
};

function base64UrlEncode(str: string) {
  return window
    .btoa(str)
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(base64Url: string) {
  return window.atob(
    base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '='),
  );
}

function sha256(message: string, key: string) {
  return CryptoJS
    .HmacSHA256(message, key)
    .toString(CryptoJS.enc.Base64url);
}

export function sign(data: object, secret: string, options: { expiredIn: number }) {
  const payload = Object.assign({}, data, {
    iat: Math.floor(Date.now() / 1000),
    exp: options.expiredIn,
  });

  const encodeHeader = base64UrlEncode(JSON.stringify(header));
  const encodePayload = base64UrlEncode(JSON.stringify(payload));

  const encodeSignature = sha256(`${encodeHeader}.${encodePayload}`, secret);

  return `${encodeHeader}.${encodePayload}.${encodeSignature}`;
}

export function verify(encode: string, secret: string): TokenPayload {
  const [encodeHeader, encodePayload, encodeSignature] = encode.split('.');

  const decodeHeader: TokenHeader = JSON.parse(base64UrlDecode(encodeHeader));
  const decodePayload: TokenPayload = JSON.parse(base64UrlDecode(encodePayload));
  const reEncodeSignature = sha256(`${encodeHeader}.${encodePayload}`, secret);

  // 无效token
  if (
    reEncodeSignature !== encodeSignature
    || encode.split('.').length !== 3
    || decodeHeader.alg !== 'HS256'
    || decodeHeader.typ !== 'JWT'
  ) {
    throw new TokenInvalidError('Token Invalid');
  }

  // token 过期
  if (decodePayload.exp && decodePayload.exp < Math.floor(Date.now() / 1000)) {
    throw new TokenExpiredError('Token Expired');
  }

  return decodePayload;
}

/**
 * 无效token错误
 */
export class TokenInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenInvalidError';
  }
}

/**
 * Token 过期错误
 */
export class TokenExpiredError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TokenExpiredError';
  }
}
