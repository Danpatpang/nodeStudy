const crypto = require(`crypto`);

// base64
console.log(crypto.createHash(`sha512`).update(`비밀번호`).digest(`base64`));
// hex
console.log(crypto.createHash(`sha512`).update(`비밀번호`).digest(`hex`));
// base64
console.log(crypto.createHash(`sha512`).update(`다른 비밀번호`).digest(`base64`));

/**
 * 충돌 발생의 위험이 있다.
 * pbkdf2 사용
 */