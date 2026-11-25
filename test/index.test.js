// SPDX-License-Identifier: Apache-2.0
// MarketGPT Community Edition — developed by Vaelis contributors.
import test from 'node:test';import assert from 'node:assert/strict';import {evaluate,analyze} from '../src/index.js';
const input={analysis:{asset:{id:'DEMO'},price:105,market:{open:true},kosten:{spread:1},setups:{long:{entry:100,sl:95,tp1:110}}}};
test('risk geometry',()=>{const x=evaluate(input).candidates[0];assert.equal(x.rewardRisk,2);assert.equal(x.spreadInR,.2);});
test('invalid input',()=>assert.throws(()=>evaluate({})));
test('invalid stop excluded',()=>assert.equal(evaluate({analysis:{...input.analysis,setups:{long:{entry:100,sl:101,tp1:110}}}}).candidates.length,0));
test('Kolibri adapter mock',async()=>{const out=await analyze(input,{fetchImpl:async(url,opts)=>{assert.match(url,/chat\/completions$/);assert.equal(JSON.parse(opts.body).model,'Aleph-Alpha/Kolibri-1.1');return new Response(JSON.stringify({choices:[{message:{content:'Example'}}]}));}});assert.equal(out.reply,'Example');});
