const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const core = require('../src/core');

test('provides complete MySQL-backed course data shape', () => {
  const photographers = core.getPhotographers();
  const books = core.getPhotoBooks();
  const schema = core.getDatabaseSchema();

  assert.equal(photographers.length, 20);
  assert.equal(books.length, 20);
  assert.deepEqual(Object.keys(schema.tables), ['photographers', 'photo_books', 'favorites', 'history_records']);
});

test('generates local AI-style analysis without external API dependency', () => {
  const result = core.generateResearch('城市孤独');

  assert.equal(result.usesExternalApi, false);
  assert.match(result.title, /城市孤独|影像|计划|研究/);
  assert.ok(result.concept.length > 40);
  assert.equal(result.directions.length, 3);
  assert.ok(result.shootingAdvice.length >= 4);
  assert.ok(result.visualElements.length >= 5);
});

test('recommends relevant photographers and books from keyword matching', () => {
  const result = core.buildStudyResult('家庭记忆');

  assert.equal(result.photographers.length, 5);
  assert.equal(result.books.length, 5);
  assert.ok(result.photographers.some(item => /家庭|私人|纪实|记忆/.test(`${item.style}${item.keywords}${item.intro}`)));
  assert.ok(result.books.some(item => /家庭|记忆|叙事|私人/.test(`${item.theme}${item.intro}${item.title}`)));
});

test('uses real local photography assets and records sources', () => {
  const root = path.resolve(__dirname, '..');
  const assets = core.getVisualAssets();
  const sourcesPath = path.join(root, 'assets', 'image_sources.json');

  assert.ok(assets.length >= 8);
  assert.ok(fs.existsSync(sourcesPath));
  assert.ok(assets.every(asset => fs.existsSync(path.join(root, asset.file))));
});
