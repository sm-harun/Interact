export function getPartsBeforeAndAfterLetter(input: string, letter: string) {
  const parts = input.split(letter);
  if (parts.length < 2) {
    return { before: parts[0] || '', after: '' }; // If no 'e', return all as 'before'.
  }
  return { before: parts[0], after: parts.slice(1).join(letter) };
}
