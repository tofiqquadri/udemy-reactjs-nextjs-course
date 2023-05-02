import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from 'react';
import 'styles/globals.css';
import Layout from 'src/Container/Layout/Layout';

export default function App({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle');
    }, []);

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
