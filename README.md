Changes

  1. The "c" argument does not seem to be used. Removed it
  2. The contents of the loop through the parameters is self-contained and does not depend of aother parts of function. Also it provides a determined functional and calculates a concrete value. Moved it to a separate function getValueFormated.
  3. The "chunk" variable is defined without "var" keyword. Redefined
  4. The "text" variable is undefined. It seems, that author wanted to use "chunk". Replacing
  5. The "len" variable is defined without "var" keyword. It is not needed. Removed
  6. A condition in the cycle is "lower then or equals". It's incorrect for this case. Used "lower then"
  7. The "wrapperText" variable is not used. It consists the result of the transformation. So, I saved it to a "chunk" variable.
  8. The condition "chunk.length > 5" does not make any effect. Removed id
  9. this.domElement is undefined. Used document instead
  9. Is "ample" an external component? There is written in the taks that function has no dependencies...
  10. I don't think that name "calculatevalueandaddtohtmlobject" is optimal. I changed the signature of the function and saved an old one for compatibility and marked it as deprecated.