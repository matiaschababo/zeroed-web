import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title = "Zeroed | Matías Chababo",
    description = "Zeroed es el espacio de Matías Chababo para compartir conocimientos, proyectos y aprendizajes sobre marketing, IA, medios, streaming y negocios.",
    image = "https://zeroedgrowth.com/og-image.png",
    url = "https://zeroedgrowth.com",
    type = "website"
}) => {
    const siteTitle = title === "Zeroed | Matías Chababo" ? title : `${title} | ZEROED`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Zeroed",
                    "inLanguage": "es",
                    "creator": { "@type": "Person", "name": "Matías Chababo" },
                    "url": "https://zeroedgrowth.com",
                    "logo": "https://zeroedgrowth.com/og-image.png",
                    "description": "Conocimientos y proyectos de Matías Chababo sobre marketing, sistemas, automatización con IA, medios y negocios.",
                    "sameAs": [
                        "https://twitter.com/zeroedgrowth",
                        "https://instagram.com/zeroedgrowth"
                    ]
                })}
            </script>
        </Helmet>
    );
};
