import NavbarBlock from '@/components/navbar-block'

export default function BlockLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NavbarBlock />
            {children}
        </>
    )
}
