import React from 'react';
import './AvailabilityMap.css';
import HeatMap from 'react-heatmap-grid';
import { EventDataAvailability } from '../../interfaces/Event';

interface AvailabilityMapProps {
    forModal: boolean;
    availability: EventDataAvailability;
    handleClicks: (x: number, y: number, avail: number[][]) => void;
}

export default function AvailabilityMap(
    props: AvailabilityMapProps
): JSX.Element {
    const { forModal, availability, handleClicks } = props;
    const yTimes = Object.keys(availability).sort();
    const xDays = Object.keys(availability[yTimes[0]]).sort();
    const xDaysFormated = xDays.map((timeStamp) =>
        new Date(Number(timeStamp)).toDateString().slice(0, 15)
    );
    const [availabilityData] = React.useState<number[][]>(
        forModal
            ? new Array(yTimes.length)
                  .fill(0)
                  .map(() => new Array(xDays.length).fill(0).map(() => 0))
            : new Array(yTimes.length).fill(0).map((_j, y) => {
                  return new Array(xDays.length).fill(0).map((_k, x) => {
                      return availability[yTimes[y]][xDays[x]].length;
                  });
              })
    );
    // eslint-disable-next-line
    console.log(availabilityData);

    return (
        <div>
            <div
                style={{
                    fontSize: '13px',
                    width: 'auto',
                    // backgroundColor: 'lightyellow',
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
                    onClick={(x: number, y: number) =>
                        handleClicks(x, y, availabilityData)
                    }
                    cellStyle={(
                        // eslint-disable-next-line
                        _background: any,
                        value: number,
                        min: number,
                        max: number
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
