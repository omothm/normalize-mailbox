import dns from 'dns/promises';
import ruleSets, { RuleSetName, ruleSetNames } from './ruleSets';

export function splitEmailAddress(address: string): { localPart: string; domain: string } {
  const splitIndex = address.lastIndexOf('@');
  if (splitIndex === -1) {
    throw new Error('At-sign not found');
  }
  const localPart = address.substring(0, splitIndex);
  const domain = address.substring(splitIndex + 1);
  return { localPart, domain };
}

export async function findRuleSetByMx(domain: string): Promise<RuleSetName | null> {
  const mxRecords = await dns.resolveMx(domain);
  const exchanges = mxRecords.map((record) => record.exchange);
  for (let i = 0; i < ruleSetNames.length; i++) {
    const ruleSetName = ruleSetNames[i];
    if (exchanges.some((exchange) => ruleSets[ruleSetName].mxMatch.test(exchange))) {
      return ruleSetName;
    }
  }
  return null;
}
