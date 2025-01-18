export function getPartsBeforeAndAfterLetter(input: string, letter: string) {
  const parts = input.split(letter);
  if (parts.length < 2) {
    return { before: parts[0] || '', after: '' }; // If no 'e', return all as 'before'.
  }
  return { before: parts[0], after: parts.slice(1).join(letter) };
}

export function getCurrentThemeColor(
  type: 'primary' | 'secondary' | 'teritiary' | 'surface' | 'success' | 'error' = 'primary',
  tone: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' = '500'
) {
  const newElement = document.createElement('span');
  newElement.classList.add(`bg-${type}-${tone}`);
  document.body.append(newElement);

  const color = getComputedStyle(newElement).backgroundColor;
  newElement.remove();

  return color;
}
