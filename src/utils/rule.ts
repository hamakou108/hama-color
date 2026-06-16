type Rule = {
  pattern: string
  effect: Effect
}

export type Effect = {
  color: string
}

const parseRules = (ruleString: string): Rule[] => {
  return ruleString
    .split(/\r?\n/)
    .filter((line: string) => {
      const [pattern, color] = line.split(',')
      return pattern && color
    })
    .map((line: string) => {
      const [rawPattern, color] = line.split(',')

      return {
        // escape special characters
        pattern: rawPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
        effect: {
          color,
        },
      }
    })
}

export const getEffect = (ruleString: string, url: URL): Effect | undefined => {
  const ruleList = parseRules(ruleString)
  const matchedRule = ruleList.find((rule) => {
    return url.href.search(rule.pattern) !== -1
  })

  return matchedRule?.effect
}
