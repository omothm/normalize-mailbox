const ruleSets: Record<RuleSetName, RuleSet> = {

  gmail: {
    mxMatch: /google/,
    caseSensitive: false,
    replacements: [
      {
        match: /\./g,
        replaceBy: '',
      },
      {
        match: /\+.*$/,
        replaceBy: '',
      },
    ],
  },

  outlook: {
    mxMatch: /outlook/,
    caseSensitive: false,
  },

};

export const ruleSetNames = [
  'gmail',
  'outlook',
] as const;

export type RuleSetName = typeof ruleSetNames[number];

interface RuleSet {
  /** Used to find MX records of custom domains (e.g., domains using G Suite). */
  mxMatch: RegExp;
  /** Whether this rule set allows mixed case characters in the local part. */
  caseSensitive: boolean;
  /** Replacements to apply on the local part. */
  replacements?: {
    match: RegExp;
    replaceBy: string;
  }[];
}

export default ruleSets;
