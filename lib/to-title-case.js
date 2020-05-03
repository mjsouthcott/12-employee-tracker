module.exports = {
  toTitleCase: (string) => {
    const wordArr = [];
    for (const word of string.toLowerCase().split(" ")) {
      wordArr.push(word.charAt(0).toUpperCase() + word.slice(1));
    }
    return wordArr.join(" ");
  }
};