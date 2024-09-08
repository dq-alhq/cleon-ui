import React from 'react'

import { docs } from '#site/content'
import { IconLoader2 } from 'cleon-icons'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { MDXContent } from '@/components/mdx-components'
import { siteConfig } from '@/config/site'
import '@/styles/code.css'

export interface DocPageProps {
    params: {
        slug: string[]
    }
}

async function getPostFromParams(params: DocPageProps['params']) {
    const slug = params?.slug?.join('/')
    const doc = docs.find((doc) => doc.slugAsParams === slug)

    return doc
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
    const doc = await getPostFromParams(params)

    if (!doc) {
        return {}
    }

    const ogSearchParams = new URLSearchParams()
    ogSearchParams.set('title', doc.title)

    return {
        title: `Docs: ${doc.title} / ${siteConfig.name}`,
        description: doc.description,
        openGraph: {
            title: doc.title,
            description: doc.description,
            type: 'article',
            url: doc.slug,
            images: [
                {
                    url: `/api/og?${ogSearchParams.toString()}`,
                    width: 1200,
                    height: 630,
                    alt: doc.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: doc.title,
            description: doc.description,
            images: [`/api/og?${ogSearchParams.toString()}`]
        }
    }
}

export async function generateStaticParams(): Promise<DocPageProps['params'][]> {
    return docs.map((doc) => ({ slug: doc.slugAsParams.split('/') }))
}

export default async function PostPage({ params }: DocPageProps) {
    const doc = await getPostFromParams(params)

    if (!doc || !doc.published) {
        notFound()
    }

    return (
        <div className='w-full px-4 py-16 xl:px-16'>
            <h1 className='mb-2 text-2xl lg:text-3xl font-bold'>{doc.title}</h1>
            {doc.description ? (
                <p className='mt-0 text-xl text-foreground/70'>{doc.description}</p>
            ) : null}
            <React.Suspense
                fallback={
                    <div className='w-full min-h-[600px] flex items-center justify-center'>
                        <IconLoader2 className='size-8 animate-spin' />
                    </div>
                }
            >
                <MDXContent code={doc.body} />
            </React.Suspense>
        </div>
    )
}
