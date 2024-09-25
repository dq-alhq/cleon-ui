import localFont from 'next/font/local'

const fontGeist = localFont({
    src: '../../../fonts/sans/GeistVF.woff',
    variable: '--font-sans'
})
const fontInter = localFont({
    src: '../../../fonts/sans/Inter.woff2',
    variable: '--font-sans'
})
const fontFigtree = localFont({
    src: '../../../fonts/sans/Figtree.woff2',
    variable: '--font-sans'
})
const fontNunito = localFont({
    src: '../../../fonts/sans/Nunito.woff2',
    variable: '--font-sans'
})
const fontSatoshi = localFont({
    src: '../../../fonts/sans/Satoshi.woff2',
    variable: '--font-sans'
})
const fontRoboto = localFont({
    src: '../../../fonts/sans/Roboto.woff2',
    variable: '--font-sans'
})
const fontRaleway = localFont({
    src: '../../../fonts/sans/Raleway.woff2',
    variable: '--font-sans'
})

const fontGeistMono = localFont({
    src: '../../../fonts/mono/GeistMonoVF.woff',
    variable: '--font-mono'
})
const fontFiraCode = localFont({
    src: '../../../fonts/mono/FiraCode.woff2',
    variable: '--font-mono'
})
const fontJetBrainsMono = localFont({
    src: '../../../fonts/mono/JetBrainsMono.woff2',
    variable: '--font-mono'
})
const fontCousine = localFont({
    src: '../../../fonts/mono/Cousine.woff',
    variable: '--font-mono'
})
const fontCascadiaCode = localFont({
    src: '../../../fonts/mono/CascadiaCode.woff2',
    variable: '--font-mono'
})
const fontIBMPlexMono = localFont({
    src: '../../../fonts/mono/IBMPlexMono.woff2',
    variable: '--font-mono'
})
const fontSourceCodePro = localFont({
    src: '../../../fonts/mono/SourceCodePro.woff2',
    variable: '--font-mono'
})
const fontVictorMono = localFont({
    src: '../../../fonts/mono/VictorMono.woff2',
    variable: '--font-mono'
})

export type FontsSansName =
    | 'Figtree'
    | 'Satoshi'
    | 'Nunito'
    | 'Raleway'
    | 'Roboto'
    | 'Inter'
    | 'Geist'

export type FontsMonoName =
    | 'Geist Mono'
    | 'Fira Code'
    | 'JetBrains Mono'
    | 'Cousine'
    | 'Cascadia Code'
    | 'IBM Plex Mono'
    | 'Source Code Pro'
    | 'Victor Mono'

export const FontsSans: Record<FontsSansName, string> = {
    Figtree: fontFigtree.className,
    Satoshi: fontSatoshi.className,
    Nunito: fontNunito.className,
    Raleway: fontRaleway.className,
    Roboto: fontRoboto.className,
    Inter: fontInter.className,
    Geist: fontGeist.className
}

export const FontsMono: Record<FontsMonoName, string> = {
    'Geist Mono': fontGeistMono.className,
    'Fira Code': fontFiraCode.className,
    'JetBrains Mono': fontJetBrainsMono.className,
    Cousine: fontCousine.className,
    'Cascadia Code': fontCascadiaCode.className,
    'IBM Plex Mono': fontIBMPlexMono.className,
    'Source Code Pro': fontSourceCodePro.className,
    'Victor Mono': fontVictorMono.className
}
