/*eslint-disable */
enum EnumLanguage {
  SPANISH = "Español",
  ENGLISH = "English",
}

// Will try to get a EnumLanguage from a str. Returns undefined  if it couldn't parse the string.
export function parseLanguage(str: string): EnumLanguage | undefined {
  if (str) {
    switch (str.toLowerCase()) {
      case "ingles":
      case "en":
      case "english":
      case "inglés":
        return EnumLanguage.ENGLISH;
      case "es":
      case "spanish":
      case "español":
      case "espanol":
      case "espaniol":
        return EnumLanguage.SPANISH;
      default:
        return undefined;
    }
  }
  return undefined;
}

export default EnumLanguage;
