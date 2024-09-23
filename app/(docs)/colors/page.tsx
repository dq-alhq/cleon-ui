import ColorCustomizer from './controller/color-customizer'
import { Hero } from './hero'

export default function ThemesPage() {
    return (
        <main className='min-h-screen flex flex-col'>
            <Hero />
            <ColorCustomizer />
        </main>
    )
}
