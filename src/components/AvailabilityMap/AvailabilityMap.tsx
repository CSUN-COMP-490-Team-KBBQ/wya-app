import React from 'react';
import './AvailabilityMap.css';
import HeatMap from 'react-heatmap-grid';

interface AvailabilityMapProps {
    days: Array<string>;
    handleClicks: (x: any, y: any) => void;
    // availabilities: ?,
}

/**
 *  Mock data for availability
 *
 *  Once, proper data structure becomes finialized this will
 *  need to be updated
 *
 * */
const yTimes = [
    '8am',
    '8:15am',
    '8:30am',
    '8:45am',
    '9am',
    '9:15am',
    '9:30am',
    '9:45am',
    '10am',
    '10:15am',
    '10:30am',
    '10:45am',
    '11am',
    '11:15am',
    '11:30am',
    '11:45am',
    '12pm',
    '12:15pm',
    '12:30pm',
    '12:45pm',
    '1pm',
    '1:15pm',
    '1:30pm',
    '1:45pm',
    '2am',
    '2:15pm',
    '2:30pm',
    '2:45pm',
    '3pm',
    '3:15pm',
    '3:30pm',
    '3:45pm',
    '4pm',
    '4:15pm',
    '4:30pm',
    '4:45pm',
    '5pm',
];

export default function AvailabilityMap(
    props: AvailabilityMapProps
): JSX.Element {
    const { days, handleClicks } = props;
    const xDays = days;

    /**
     * Flow of data:
     *    times => days => fill with ppl
     * */
    const availabiltyData = new Array(yTimes.length)
        .fill(0)
        .map(() =>
            new Array(xDays.length)
                .fill(0)
                .map(() => Math.floor(Math.random() * 100))
        );

    return (
        <div>
            <div
                style={{
                    fontSize: '13px',
                    width: 'auto',
                    backgroundColor: 'lightyellow',
                    margin: '10px',
                    // temp set width for mock data
                    maxWidth: '1024px',
                }}
            >
                <HeatMap
                    xLabels={xDays}
                    yLabels={yTimes}
                    xLabelsLocation="top"
                    xLabelWidth={60}
                    yLabelWidth={60}
                    data={availabiltyData}
                    squares={false}
                    height={30}
                    onClick={(x: any, y: any) => handleClicks(x, y)}
                    cellStyle={(
                        _background: any,
                        value: any,
                        min: any,
                        max: any
                    ) => ({
                        background: `rgb(0, 151, 230, ${
                            1 - (max - value) / (max - min)
                        })`,
                        fontSize: '11.5px',
                        color: '#444',
                    })}
                />
            </div>
        </div>
    );
}
