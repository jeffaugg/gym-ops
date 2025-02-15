import validator from "validator";

export function isBase64(str: string): boolean {
  return validator.isBase64(str);
}
