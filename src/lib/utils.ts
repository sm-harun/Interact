export function getPartsBeforeAndAfterLetter(input: string, letter: string) {
  const parts = input.split(letter);
  if (parts.length < 2) {
    return { before: parts[0] || '', after: '' }; // If no 'e', return all as 'before'.
  }
  return { before: parts[0], after: parts.slice(1).join(letter) };
}

export function getCurrentThemeColor(
  type: 'primary' | 'secondary' | 'teritiary' | 'surface' | 'success' | 'error' = 'primary',
  tone: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' = '500',
  opacity: string = '1'
) {
  let style = getComputedStyle(document.body).getPropertyValue(`--color-${type}-${tone}`);
  if (opacity) {
    style = "rgba(" + style.split(" ").join(", ") + ", " + opacity + ")";
  } else {
    style = "rgb(" + style.split(" ").join(", ") + ")";
  }

  return style;
}

export function easeInOut(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function loopEase(t) {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

export function infiniteLoopEase(t) {
  return (Math.sin(t * Math.PI * 2) + 1) / 2;
}
