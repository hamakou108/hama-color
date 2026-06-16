type StorageData = {
  canViewFrame: boolean
  ruleString: string
}

type StorageKey = keyof StorageData

const defaults: StorageData = {
  canViewFrame: true,
  ruleString: '',
}

export const getStorageData = async <K extends StorageKey[]>(
  keys: K,
): Promise<Pick<StorageData, K[number]>> => {
  const result = await browser.storage.sync.get(keys)

  return Object.fromEntries(
    keys.map((key) => [key, result[key] ?? defaults[key]]),
  ) as Pick<StorageData, K[number]>
}

export const setStorageData = async (
  values: Partial<StorageData>,
): Promise<void> => {
  await browser.storage.sync.set(values)
}
