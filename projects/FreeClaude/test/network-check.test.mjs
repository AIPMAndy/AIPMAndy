import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ipVersion, maskIP, readIpify, readIpwho, readCloudflare, readRisk, environmentScore, statusValue, createReport } from '../site/check/core.mjs';

test('IPv4/IPv6 identifiers distinguish malformed addresses', () => {
  assert.equal(ipVersion('192.168.1.1'), 4);
  assert.equal(ipVersion('999.168.1.1'), null);
  assert.equal(ipVersion('2001:db8::1'), 6);
  assert.equal(ipVersion('hello-world'), null);
});

test('IP privacy display masks both address families', () => {
  assert.equal(maskIP('203.0.113.123', true), '203.0.•••.•••');
  assert.equal(maskIP('203.0.113.123', false), '203.0.113.123');
  assert.match(maskIP('2001:db8::1', true), /••••/);
});

test('IP sources produce consistent data from documented schemas', () => {
  assert.equal(readIpify({ ip: '203.0.113.7' }).ip, '203.0.113.7');
  const geo = readIpwho({ ip: '203.0.113.7', success: true, country: 'Exampleland', city: 'Example City', connection: { asn: 64500, org: 'Example ISP' }, timezone: {id: 'UTC'} });
  assert.equal(geo.asn, 'AS64500');
  assert.equal(geo.timezone, 'UTC');
  assert.equal(readCloudflare({clientIp:'2001:db8::1',colo:'SJC'}).colo,'SJC');
});

test('malformed remote responses never masquerade as real IPs', () => {
  assert.throws(() => readIpify({ip: 'not-an-IP'}));
  assert.throws(() => readIpwho({success:false}), /不可用/);
  assert.throws(() => readCloudflare({clientIp:null}));
});

test('score refuses fabricated precision without two sources', () => {
  assert.equal(environmentScore({ regular: {ip:'203.0.113.1'} }).value, null);
});

test('transparent heuristic reports only source consistency', () => {
  const args = { regular: {ip:'203.0.113.1'}, geo: {ip:'203.0.113.1',timezone:'UTC'}, timezone:'UTC' };
  assert.equal(environmentScore(args).value, 100);
  assert.equal(environmentScore({...args, cloudflare: {ip:'203.0.113.2'}}).value, 90);
  assert.equal(environmentScore({...args,geo:{...args.geo,ip:'203.0.113.9'}}).value, 60);
});

test('unknown threat indicators remain unknown, not safe', () => {
  assert.equal(statusValue(null), '未检测');
  assert.equal(statusValue(false), '未检测到');
  assert.equal(statusValue(true), '检测到');
});

test('exported report states Claudes real observed IP cannot be determined', () => {
  const report = createReport({ regular: {ip:'203.0.113.9'}, geo: null, score: {value:null}, hide:true });
  assert.match(report, /目标服务侧配合/);
  assert.doesNotMatch(report, /203\.0\.113\.9/);
  assert.match(report, /非 Anthropic 官方/);
});

test('optional reputation flags preserve unknown instead of inventing safe', () => {
  const data = readRisk({ success:true, ip:'203.0.113.8', data:{is_vpn:false,is_tor:true,is_datacenter:true,risk_score:32}});
  assert.equal(data.vpn,false);
  assert.equal(data.tor,true);
  assert.equal(data.proxy,null);
  assert.equal(data.riskScore,32);
  assert.throws(() => readRisk({success:false}),/风险情报/);
});
