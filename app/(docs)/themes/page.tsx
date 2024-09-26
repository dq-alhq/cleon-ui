import ThemeCustomizer from './controller/themes'
import { Hero } from './hero'

export default function ThemesPage() {
    return (
        <main className='min-h-screen flex flex-col'>
            <Hero />
            <ThemeCustomizer />
        </main>
    )
}
