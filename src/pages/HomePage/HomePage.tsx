import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

export default function HomePage(): JSX.Element {
    return (
        <div>
            <img src="wya test 4.png" alt="logo" />
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
                stacking personal schedules so that your group will be able to
                clearly see who&apos;s doing what and when. The add-a-friend
                feature and overall simplicity of wya? removes the need for
                multiple apps and lets you chat, plan, and invite whomever
                you&apos;d like.
            </h2>
            <h1>Our app removes all the stress when planning all the fun!</h1>
        </div>
    );
}
