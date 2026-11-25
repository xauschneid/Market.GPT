// SPDX-License-Identifier: Apache-2.0
import {createHash} from 'node:crypto';
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const hash=b=>createHash('sha256').update(b).digest('hex');
const paths=['LICENSE','NOTICE','package.json','assets/vaelis-logo.svg'];
for(const dir of ['src','scripts','examples','test']){
 for(const e of await readdir(join(root,dir),{withFileTypes:true})) if(e.isFile()) paths.push(dir+'/'+e.name);
}
const entries={};
for(const p of paths.sort()) entries[p]=hash(await readFile(join(root,p)));
const manifest={project:'MarketGPT',algorithm:'SHA-256',files:entries,fingerprint:hash(JSON.stringify(entries))};
const output=JSON.stringify(manifest,null,2)+'\n';
const target=join(root,'fingerprint.json');
if(process.argv.includes('--verify')){
 if(await readFile(target,'utf8')!==output){console.error('Fingerprint mismatch');process.exitCode=1;}else console.log('Fingerprint matches supplied manifest');
}else {await writeFile(target,output);console.log(manifest.fingerprint);}
