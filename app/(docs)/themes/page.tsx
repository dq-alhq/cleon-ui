import ThemeCustomizer from './controller/theme-customizer'
import { Hero } from './hero'

export default function ThemesPage() {
    return (
        <main className='min-h-screen flex flex-col'>
            <Hero />
            <ThemeCustomizer />
        </main>
    )
}
