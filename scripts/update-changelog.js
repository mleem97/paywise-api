#!/usr/bin/env node
/**
 * Updates CHANGELOG.md to Keep a Changelog format
 * Used by semantic-release via @semantic-release/exec
 */
/* eslint-env node */

import fs from 'fs';
import path from 'path';

const version = process.argv[2];
const notes = process.argv[3] || '';

if (!version) {
  console.error('Usage: update-changelog.js <version> [notes]');
  process.exit(1);
}

const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
const today = new Date().toISOString().split('T')[0];

// Parse conventional commit notes into Keep a Changelog categories
function parseNotes(notes) {
  const categories = {
    added: [],
    changed: [],
    deprecated: [],
    removed: [],
    fixed: [],
    security: []
  };

  const lines = notes.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    // Match conventional commit patterns
    if (/^\*\s*\*\*feat/i.test(trimmed) || /^[-*]\s*feat/i.test(trimmed)) {
      categories.added.push(trimmed.replace(/^\*\s*\*\*feat.*?:\*\*\s*/i, '- ').replace(/^[-*]\s*feat.*?:\s*/i, '- '));
    } else if (/^\*\s*\*\*fix/i.test(trimmed) || /^[-*]\s*fix/i.test(trimmed)) {
      categories.fixed.push(trimmed.replace(/^\*\s*\*\*fix.*?:\*\*\s*/i, '- ').replace(/^[-*]\s*fix.*?:\s*/i, '- '));
    } else if (/^\*\s*\*\*breaking/i.test(trimmed) || /BREAKING CHANGE/i.test(trimmed)) {
      categories.changed.push(trimmed.replace(/^\*\s*\*\*.*?:\*\*\s*/i, '- **BREAKING:** '));
    } else if (/^\*\s*\*\*deprecate/i.test(trimmed) || /^[-*]\s*deprecate/i.test(trimmed)) {
      categories.deprecated.push(trimmed.replace(/^\*\s*\*\*.*?:\*\*\s*/i, '- '));
    } else if (/^\*\s*\*\*remove/i.test(trimmed) || /^[-*]\s*remove/i.test(trimmed)) {
      categories.removed.push(trimmed.replace(/^\*\s*\*\*.*?:\*\*\s*/i, '- '));
    } else if (/^\*\s*\*\*security/i.test(trimmed) || /^[-*]\s*security/i.test(trimmed)) {
      categories.security.push(trimmed.replace(/^\*\s*\*\*.*?:\*\*\s*/i, '- '));
    } else if (/^\*\s+/.test(trimmed)) {
      // Generic bullet point - try to categorize
      const text = trimmed.replace(/^\*\s+/, '- ');
      if (/add|new|implement|create|introduce/i.test(text)) {
        categories.added.push(text);
      } else if (/fix|correct|resolve|patch/i.test(text)) {
        categories.fixed.push(text);
      } else if (/update|change|modify|refactor|improve/i.test(text)) {
        categories.changed.push(text);
      } else {
        categories.changed.push(text);
      }
    }
  }

  return categories;
}

// Build the new version section
function buildVersionSection(version, date, categories) {
  let section = `## [${version}] - ${date}\n`;
  
  const categoryOrder = [
    ['added', 'Added'],
    ['changed', 'Changed'],
    ['deprecated', 'Deprecated'],
    ['removed', 'Removed'],
    ['fixed', 'Fixed'],
    ['security', 'Security']
  ];

  for (const [key, title] of categoryOrder) {
    if (categories[key] && categories[key].length > 0) {
      section += `\n### ${title}\n\n`;
      section += categories[key].join('\n') + '\n';
    }
  }

  return section;
}

// Read existing changelog
let changelog = '';
if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf8');
}

// Parse notes
const categories = parseNotes(notes);

// Check if any categories have content
const hasContent = Object.values(categories).some(arr => arr.length > 0);

if (!hasContent) {
  // Default to Changed if no parsed content
  categories.changed.push(`- Release version ${version}`);
}

// Build new version section
const newSection = buildVersionSection(version, today, categories);

// Insert after [Unreleased] section
const unreleasedMatch = changelog.match(/## \[Unreleased\]\n*/);
if (unreleasedMatch) {
  const insertPos = unreleasedMatch.index + unreleasedMatch[0].length;
  changelog = changelog.slice(0, insertPos) + '\n' + newSection + changelog.slice(insertPos);
} else {
  // Insert after header
  const headerMatch = changelog.match(/^# Changelog[\s\S]*?(?=\n## |\n$)/);
  if (headerMatch) {
    const insertPos = headerMatch.index + headerMatch[0].length;
    changelog = changelog.slice(0, insertPos) + '\n\n## [Unreleased]\n\n' + newSection + changelog.slice(insertPos);
  } else {
    // Create new changelog
    changelog = `# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

${newSection}`;
  }
}

fs.writeFileSync(changelogPath, changelog);
console.log(`Updated CHANGELOG.md with version ${version}`);
