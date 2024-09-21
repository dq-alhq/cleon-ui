import localFont from 'next/font/local'

const fontGeist = localFont({
    src: '../../../fonts/GeistVF.woff',
    variable: '--font-geist'
})
const fontInter = localFont({
    src: '../../../fonts/Inter.woff2',
    variable: '--font-inter'
})
const fontFigtree = localFont({
    src: '../../../fonts/Figtree.woff2',
    variable: '--font-figtree'
})
const fontNunito = localFont({
    src: '../../../fonts/Nunito.woff2',
    variable: '--font-nunito'
})
const fontSatoshi = localFont({
    src: '../../../fonts/Satoshi.woff2',
    variable: '--font-satoshi'
})
const fontRoboto = localFont({
    src: '../../../fonts/Roboto.woff2',
    variable: '--font-roboto'
})
const fontRaleway = localFont({
    src: '../../../fonts/Raleway.woff2',
    variable: '--font-raleway'
})

export type FontNamesProps =
    | 'figtree'
    | 'satoshi'
    | 'nunito'
    | 'raleway'
    | 'roboto'
    | 'inter'
    | 'geist'

export const FontNames: Record<FontNamesProps, string> = {
    figtree: fontFigtree.className,
    satoshi: fontSatoshi.className,
    nunito: fontNunito.className,
    raleway: fontRaleway.className,
    roboto: fontRoboto.className,
    inter: fontInter.className,
    geist: fontGeist.className
}
