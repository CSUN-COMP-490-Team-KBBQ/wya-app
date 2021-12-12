import React from 'react';
<<<<<<< HEAD
import Page from '../../components/Page/Page';
=======
import Container from 'react-bootstrap/Container';
>>>>>>> edb7403 (Use Container in NotFoundPage)
import './NotFoundPage.css';

export default function NotFoundPage(): JSX.Element {
    return (
<<<<<<< HEAD
        <Page>
            <div className="not-found-page">
                <h1>404 Page Not Found</h1>
            </div>
        </Page>
=======
        <Container>
            <h1
                style={{
                    margin: 'auto',
                    marginTop: '250px',
                }}
            >
                404 Page Not Found
            </h1>
        </Container>
>>>>>>> edb7403 (Use Container in NotFoundPage)
    );
}
