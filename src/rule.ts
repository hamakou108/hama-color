type Rule = {
  pattern: string
  effect: Effect
}

export type Effect = {
  color: string
}

export const useRule = (ruleString: string) => {
  const _parse = (): Rule[] => {
    return ruleString
      .split(/\r?\n/)
      .filter((ruleString: string) => {
        const [pattern, color] = ruleString.split(',')
        return pattern && color
      })
      .map((ruleString: string) => {
        const [rawPattern, color] = ruleString.split(',')

        return {
          // escape special characters
          pattern: rawPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'),
          effect: {
            color,
          },
        }
      })
  }

  const _ruleList = _parse()

  const getEffect = (url: URL): Effect | undefined => {
    const matchedRule = _ruleList.find((rule) => {
      return url.href.search(rule.pattern) !== -1
    })

    return matchedRule?.effect
  }

  return {
    getEffect,
  }
}
