const ru = require('../util/read-util');

function isAnagram(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }

  const cmp = (char1, char2) => (char1 > char2 ? 1 : -1);
  let string1Array = string1.split('').sort(cmp);
  let string2Array = string2.split('').sort(cmp);

  for (let i = 0; i < string1Array.length; i++) {
    if (string1Array[i] !== string2Array[i]) {
      return false;
    }
  }
  return true;
}

function isAnagram2(string1, string2) {
  if (string1.length !== string2.length) {
    return false;
  }

  let occurenceMap = {};

  for (let i = 0; i < string1.length; i++) {
    let str1Char = string1.charAt(i);
    occurenceMap[str1Char]
      ? (occurenceMap[str1Char] += 1)
      : (occurenceMap[str1Char] = 1);
    let str2Char = string2.charAt(i);
    occurenceMap[str2Char]
      ? (occurenceMap[str2Char] -= 1)
      : (occurenceMap[str2Char] = -1);
  }

  for (let c in occurenceMap) {
    if (occurenceMap[c] !== 0) {
      return false;
    }
  }
  return true;
}

(async () => {
  console.log("enter two strings and i'll tell you if they are anagrams: ");
  const string1 = await ru.question('enter the first string: ');
  const string2 = await ru.question('enter the second string: ');

  console.log(
    `"${string1}" and "${string2}" are ${
      isAnagram2(string1, string2) ? '' : 'not '
    }anagrams.`
  );
})();
