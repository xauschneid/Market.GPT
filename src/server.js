import http from 'node:http';
import {evaluate,analyze} from './index.js';
const host=process.env.HOST||'127.0.0.1';
const token=process.env.MARKETGPT_API_KEY;
if(host!=='127.0.0.1' && host!=='localhost' && !token) throw new Error('API key required for non-local binding');
http.createServer(async(req,res)=>{
 const send=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 if(token && req.headers.authorization!=='Bearer '+token) return send(401,{error:'Unauthorized'});
 if(req.method==='GET' && req.url==='/health') return send(200,{ok:true});
 if(req.method!=='POST'||!['/v1/evaluate','/v1/analyze'].includes(req.url)) return send(404,{error:'Not found'});
 let raw='';try{for await(const part of req){raw+=part;if(Buffer.byteLength(raw)>65536)return send(413,{error:'Request too large'});}
 const input=JSON.parse(raw); let metrics;try{metrics=evaluate(input);}catch{return send(400,{error:'Invalid analysis'});}
 if(req.url==='/v1/evaluate')return send(200,metrics);
 try{return send(200,await analyze(input));}catch{return send(502,{error:'Model unavailable'});}
 }catch{return send(400,{error:'Invalid JSON'});}
}).listen(Number(process.env.PORT||8080),host);
