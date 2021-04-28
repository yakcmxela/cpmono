export const validateEmail = (rules, string = "", callback) =>
  callback(
    !string.includes("@") && !string.includes(".") ? rules.message : undefined
  );

export const validateURL = (rules, string = "", callback) => {
  const { parse } = require("url");
  try {
    new URL(string);
    const allowed = ["https:", "http:"];
    const parsed = parse(string);
    if (!allowed.includes(parsed.protocol.toLowerCase()) || !parsed.slashes) {
      throw new Error("Invalid protocol");
    }
    callback();
  } catch (error) {
    callback(rules.message);
  }
};

export const validateForm = (required, data) => {
  const validation = { missingRequiredFields: [], locationRequired: false };
  const pushKey = (key, arr) => {
    arr.push(`Missing required ${key}.`);
  };
  required.forEach((key) => {
    if (key === "location") {
      if (data[key].address === "") {
        pushKey(key, validation.missingRequiredFields);
      }
      if (
        typeof data[key].longitude === "undefined" ||
        typeof data[key].latitude === "undefined"
      ) {
        validation.locationRequired = true;
      }
    } else {
      if (data[key] === "") {
        pushKey(key, validation.missingRequiredFields);
      }
    }
  });
  return validation;
};
