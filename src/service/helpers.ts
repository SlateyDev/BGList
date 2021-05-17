export const formSerialize = (
  serializeObject: object,
  prefix: string = '',
): string => {
  const str = [];
  for (let property in serializeObject) {
    if (serializeObject.hasOwnProperty(property)) {
      const key = prefix
        ? prefix +
          `[${Array.isArray(serializeObject) ? property + 1 : property}]`
        : property;
      // @ts-ignore
      const value = serializeObject[property];
      if (value === undefined) {
        continue;
      }
      str.push(
        value !== null && typeof value === 'object'
          ? formSerialize(value, key)
          : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
  }
  return str.join('&');
};
