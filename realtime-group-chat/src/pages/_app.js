import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import 'styles/globals.css';
import Layout from 'Components/Layout/Layout';

export default function App({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle');
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"></meta>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
