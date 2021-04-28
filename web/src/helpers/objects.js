export const dynamicallyNest = (name, value, previous = {}) => {
  const keys = Object.keys(previous);
  const parts = name.split(".");
  return {
    ...(keys.length && { ...previous }),
    ...(parts.length > 1
      ? {
          [parts[0]]: dynamicallyNest(
            parts.slice(1).join("."),
            value,
            previous[parts[0]]
          ),
        }
      : { [name]: value }),
  };
};
