import ruleSets, { RuleSetName } from './ruleSets';
import { findRuleSetByMx, splitEmailAddress } from './util';

/**
 * Normalizes an email address according to client-specific rules.
 *
 * If any step in the normalization process fails, the address is returned as-is.
 *
 * **NOTE**: The domain name is not altered by this function. Domain names that contain invalid
 * characters (this includes uppercase letters) will return exactly as given. If you need to change
 * the case of the domain part, you need to do that manually.
 *
 * **NOTE**: The returned email address may no longer be valid. This most probably means that the
 * initial email address was not valid either. You may want to recheck for validity after
 * normalization.
 *
 * @param address             The email address to normalize. It is assumed to be in a valid form.
 * @param optionalRuleSetName If defined, the given rule set is directly used. Otherwise, an MX
 *                            resolution is applied on the domain to find the appropriate rule set.
 * @returns                   The normalized email address, or the same email address if any
 *                            normalization step failed or rule set was not found.
 */
export async function normalize(address: string, optionalRuleSetName?: RuleSetName)
  : Promise<string> {
  let splitAddress;
  try {
    splitAddress = splitEmailAddress(address);
  } catch (err) {
    return address;
  }
  const localPart = splitAddress.localPart;
  const domain = splitAddress.domain;

  const ruleSetName = optionalRuleSetName || await findRuleSetByMx(domain);
  if (!ruleSetName) {
    return address;
  }

  const ruleSet = ruleSets[ruleSetName];
  let normalizedLocalPart = localPart;

  // Case normalization
  if (!ruleSet.caseSensitive) {
    normalizedLocalPart = normalizedLocalPart.toLocaleLowerCase('en-US');
  }

  // Replacements
  ruleSet.replacements?.forEach((replacement) => {
    normalizedLocalPart = normalizedLocalPart.replace(replacement.match, replacement.replaceBy);
  });

  return normalizedLocalPart + '@' + domain;
}
