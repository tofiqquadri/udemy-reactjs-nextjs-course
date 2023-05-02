import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {

    const router = useRouter();
    const currentPathName = router.pathname;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">AI Tools</span>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link href={'/'} passHref={true}>
                            <span
                                className={`nav-link` + (currentPathName === '/'? ' active' : '')}
                                aria-current="page">
                                Home
                            </span>
                        </Link>

                        <Link href={'/tweet-generator'} passHref={true}>
                            <span
                                className={`nav-link` + (currentPathName === '/tweet-generator'? ' active' : '')}
                                aria-current="page">
                                Tweet Generator
                            </span>
                        </Link>

                        <Link href={'/image-generator'} passHref={true}>
                            <span
                                className={`nav-link` + (currentPathName === '/image-generator'? ' active' : '')}
                                aria-current="page">
                                Image Generator
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
