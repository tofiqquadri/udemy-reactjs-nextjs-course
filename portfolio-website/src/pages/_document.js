import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <Script
                    src="https://use.fontawesome.com/releases/v6.3.0/js/all.js"
                    crossOrigin="anonymous"
                    strategy="lazyOnload"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
