/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
    const map=new Map()
    str1=str1.toLowerCase();
    str2=str2.toLowerCase();
    for(let i=0;i<str1.length;i++){
      const ch=str1.charAt(i);
      map.set(ch,(map.get(ch)||0)+1);
    }
    for(let i=0;i<str2.length;i++){
      const ch=str2.charAt(i);
      if(map.has(ch)){
        if(map.get(ch)===1){
          map.delete(ch);
        }else{
          map.set(ch,map.get(ch)-1);
        }
      }
      else{
        return false;
      }
    }
    return map.size===0;
}

module.exports = isAnagram;