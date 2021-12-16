import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { useUserRecordContext } from '../../contexts/UserRecordContext';
import PageSpinner from '../../components/PageSpinner/PageSpinner';
import Page from '../../components/Page/Page';

export default function HomePage(): JSX.Element {
    const { pending, userRecord } = useUserRecordContext();

    if (pending) {
        return (
            <Page>
                <PageSpinner />
            </Page>
        );
    }

    if (userRecord) {
        return (
            <Page>
                <div className="home-page-content">
                    <h1 className="f-header">Main Menu</h1>
                    <pre className="s-header">
                        Welcome: {`${userRecord.firstName}!`}
                    </pre>
                    <div className="text-center">
                        <Link
                            to="/create-event"
                            className="btn-links btn btn-info btn-lg"
                        >
                            Create Event
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            to="/calendar"
                            className="btn-links btn btn-info btn-lg"
                        >
                            Current Calendar
                        </Link>{' '}
                    </div>
                </div>
            </Page>
        );
    }

    return (
        <Page>
            <div className="home-page-content">
                <h1>
                    Welcome!{' '}
                    <Link to="/login" className="loginLink">
                        Login
                    </Link>{' '}
                    to get started.{' '}
                </h1>
                <h2>
                    wya? is a web-based application that will help you, your
                    friends, or your family meet up without the headache of
                    planning. We are creating a system to easily make plans by
                    stacking personal schedules so that your group will be able
                    to clearly see who&apos;s doing what and when. The
                    add-a-friend feature and overall simplicity of wya? removes
                    the need for multiple apps and lets you chat, plan, and
                    invite whomever you&apos;d like.
                </h2>
                <h1>
                    Our app removes all the stress when planning all the fun!
                </h1>
            </div>
        </Page>
    );
}
