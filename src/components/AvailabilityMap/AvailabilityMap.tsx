import React from 'react';
import './AvailabilityMap.css';
import HeatMap from 'react-heatmap-grid';
import { EventDataAvailability } from '../../interfaces/Event';

interface AvailabilityMapProps {
    availability: EventDataAvailability;
    // eslint-disable-next-line
    handleClicks: (x: any, y: any) => void;
}

export default function AvailabilityMap(
    props: AvailabilityMapProps
): JSX.Element {
    const { availability, handleClicks } = props;
    const yTimes = Object.keys(availability).sort();
    const xDays = Object.keys(availability[yTimes[0]]).sort();

    const xDaysFormated = xDays.map((timeStamp) =>
        new Date(Number(timeStamp)).toDateString().slice(0, 15)
    );

    const availabilityData = new Array(yTimes.length).fill(0).map((_j, y) => {
        return new Array(xDays.length).fill(0).map((_k, x) => {
            return availability[yTimes[y]][xDays[x]].length;
        });
    });

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
                    xLabels={xDaysFormated}
                    yLabels={yTimes}
                    xLabelsLocation="top"
                    xLabelWidth={60}
                    yLabelWidth={60}
                    data={availabilityData}
                    squares={false}
                    height={30}
                    // eslint-disable-next-line
                    onClick={(x: any, y: any) => handleClicks(x, y)}
                    cellStyle={(
                        // eslint-disable-next-line
                        _background: any,
                        // eslint-disable-next-line
                        value: any,
                        // eslint-disable-next-line
                        min: any,
                        // eslint-disable-next-line
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
