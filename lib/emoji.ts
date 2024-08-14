const category_icons: Record<string, string> = {
    'Smileys & People': '😃',
    'Animals & Nature': '🐻',
    'Travel & Places': '🏠',
    Activities: '⚽',
    Objects: '💡',
    Symbols: '❤️',
    Flags: '🚩'
}

export function getCategoryIcon(name: string) {
    return category_icons[name]
}

export function unicodeToEmoji(unicode: string): string {
    const codes = unicode.split(' ')
    return String.fromCodePoint(
        ...codes.map((code) => parseInt(code.replace('U+', ''), 16))
    )
}
