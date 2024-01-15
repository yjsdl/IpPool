const NodeRsa = require('node-rsa')

function rsaEncrypt(text, publicKey) {
    var pubkey = new NodeRsa(publicKey, 'pkcs8-public');
    var result = pubkey.encrypt(text, 'base64');
    return result
    
}

function rsaDecrypt(text, privatekey) {
    var prikey = new NodeRsa(privatekey, 'pkcs8-private');
    var result = prikey.decrypt(text, 'utf8');
    return result
    
}


var key = new NodeRsa({b:512})
var publickey = key.exportKey('pkcs8-public');
var privatekey = key.exportKey('pkcs8-private');
var text = '123456';
var result = rsaEncrypt(text, publickey);
console.log(result);
var res1 = rsaDecrypt(result, privatekey)
console.log(res1);