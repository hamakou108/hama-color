type StorageData = {
  canViewFrame: boolean
  ruleString: string
}

type StorageKey = keyof StorageData

const defaults: StorageData = {
  canViewFrame: true,
  ruleString: '',
}

export const get = async <K extends StorageKey[]>(
  keys: K,
): Promise<Pick<StorageData, K[number]>> => {
  const result = await chrome.storage.sync.get(keys)

  return Object.fromEntries(
    keys.map((key) => [key, result[key] ?? defaults[key]]),
  ) as Pick<StorageData, K[number]>
}

export const set = async (values: Partial<StorageData>): Promise<void> => {
  await chrome.storage.sync.set(values)
}
