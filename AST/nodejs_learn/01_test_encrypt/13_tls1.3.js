
const http2 = require("http2");

function get(host, path) {
    return new Promise((resolve, reject) => {
        const session = http2.connect(`https://${host}`, {
            minVersion: "TLSv1.3",
            maxVersion: "TLSv1.3",
        });

        session.on("error", (err) => {
            reject(err);
        });

        const req = session.request({
            [http2.constants.HTTP2_HEADER_AUTHORITY]: host,
            [http2.constants.HTTP2_HEADER_METHOD]: http2.constants.HTTP2_METHOD_GET,
            [http2.constants.HTTP2_HEADER_PATH]: path,
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 Edg/100.0.1185.50",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "zh-CN,zh;q=0.9",
        });

        req.setEncoding("utf8");
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            session.close();
            if (data) {
                try {
                    resolve(data);
                } catch (e) {
                    reject(e);
                }
            }
        });
        req.on("error", (err) => {
            reject(err);
        });
        req.end();
    });
}

(async function () {
    const data = await get("pixabay.com", "/");
    console.log(data);
})();
