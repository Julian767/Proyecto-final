import fs from "fs";
import selfsigned from "selfsigned";

const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, { days: 365 });

fs.writeFileSync("key.pem", pems.private);
fs.writeFileSync("cert.pem", pems.cert);

console.log(" Certificados generados: key.pem y cert.pem");
