export default {
  sliceString(str: string | null) {
    if (!str) {
      return "None";
    }
    return str.length > 15 ? str.substring(0, 15) + "..." : str;
  },
};
