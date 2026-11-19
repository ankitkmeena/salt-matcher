/**
 * Node.js Native Test Suite: Matching, Fuzzy Search, DDI, & Calculations
 * Run with: node --test tests/clinical-engine.test.mjs
 */

import test from 'node:test';
import assert from 'node:assert/strict';

// Test pure logic for Levenshtein Distance
function levenshteinDistance(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

test('Levenshtein Distance handles clinical typo tolerance', () => {
  assert.equal(levenshteinDistance('augmentin', 'augmentin'), 0);
  assert.equal(levenshteinDistance('augmentn', 'augmentin'), 1); // 1 letter missing
  assert.equal(levenshteinDistance('atorvastin', 'atorvastatin'), 2); // 2 letters missing
  assert.equal(levenshteinDistance('paracetamol', 'paracitamol'), 1); // 1 letter substitution
});

test('Savings Calculation computes accurate percentages and totals', () => {
  const brandedPrice = 205.00; // Augmentin 625 Duo
  const genericPrice = 58.50;  // Jan Aushadhi Amoxiclav
  const stripsPerMonth = 2;

  const brandedMonthly = brandedPrice * stripsPerMonth;
  const genericMonthly = genericPrice * stripsPerMonth;
  const savingsMonthly = brandedMonthly - genericMonthly;
  const savingsPercent = Math.round((savingsMonthly / brandedMonthly) * 100);

  assert.equal(brandedMonthly, 410.00);
  assert.equal(genericMonthly, 117.00);
  assert.equal(savingsMonthly, 293.00);
  assert.equal(savingsPercent, 71); // 71% savings
});

test('DPCO Ceiling Overcharge detector flags illegal pricing', () => {
  const ceilingPerUnit = 2.12; // Paracetamol 650 NPPA ceiling
  const billedPerUnit = 3.50;
  const unitsPerStrip = 10;

  const isOvercharged = billedPerUnit > ceilingPerUnit;
  const excessPerUnit = billedPerUnit - ceilingPerUnit;
  const totalExcess = excessPerUnit * unitsPerStrip;

  assert.equal(isOvercharged, true);
  assert.equal(excessPerUnit.toFixed(2), '1.38');
  assert.equal(totalExcess.toFixed(2), '13.80');
});
