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
    | 'Figtree'
    | 'Satoshi'
    | 'Nunito'
    | 'Raleway'
    | 'Roboto'
    | 'Inter'
    | 'Geist'

export const FontNames: Record<FontNamesProps, string> = {
    Figtree: fontFigtree.className,
    Satoshi: fontSatoshi.className,
    Nunito: fontNunito.className,
    Raleway: fontRaleway.className,
    Roboto: fontRoboto.className,
    Inter: fontInter.className,
    Geist: fontGeist.className
}
