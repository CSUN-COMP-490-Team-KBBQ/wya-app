import React from 'react';
import Page from '../../components/Page/Page';
import './NotFoundPage.css';

export default function NotFoundPage(): JSX.Element {
    return (
        <Page>
            <div className="not-found-page">
                <h1>404 Page Not Found</h1>
            </div>
        </Page>
    );
}
