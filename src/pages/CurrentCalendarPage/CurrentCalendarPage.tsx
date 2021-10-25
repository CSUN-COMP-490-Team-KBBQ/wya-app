import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CurrentCalendarPage(): JSX.Element {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <header>
                <h1>CurrentCalendarPage</h1>
            </header>
            <div>
                <main>
                    <Calendar
                        onChange={onChange}
                        showWeekNumbers
                        value={value}
                    />
                </main>
            </div>
        </div>
    );
}
