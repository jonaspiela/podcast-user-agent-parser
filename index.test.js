var parser;

beforeAll(async () => {
  const UserAgentParser = require("./index.js");
  parser = await new UserAgentParser();
});

test('Detects chrome browser', () => {
  const userAgent = 'Mozilla/5.0 (Linux; Android 10; CLT-L09) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.111 Mobile Safari/537.36';
  expect(parser.parse(userAgent)).toBeDefined()
});

test('Detects opera browser', () => {
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36 OPR/71.0.3770.148';
  expect(parser.parse(userAgent)).toBeDefined()
});

test('Apple Podcasts Player on iOS 14.1', () => {
  const userAgent = 'Podcasts/1500.45.2 CFNetwork/1197 Darwin/20.0.0';
  expect(parser.parse(userAgent)).toBeDefined()
});

test('AntennaPod 2.1 on Android', () => {
  const userAgent = 'AntennaPod/2.1.2';
  expect(parser.parse(userAgent)).toBeDefined()
});

test('AntennaPod 2.1 on Android behind Google Frontend', () => {
  const userAgent = 'AntennaPod/2.1.2,gzip(gfe)';
  expect(parser.parse(userAgent)).toBeDefined()
});