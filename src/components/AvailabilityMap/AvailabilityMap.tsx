import React from 'react';
import './AvailabilityMap.css';
import HeatMap from 'react-heatmap-grid';
import { EventDataAvailability } from '../../interfaces/Event';

type AvailabilityMapProps = {
    forModal: boolean;
    availability: EventDataAvailability;
};

function AvailabilityMap(props: AvailabilityMapProps): JSX.Element {
    const { forModal, availability } = props;
    const yTimes = Object.keys(availability).sort();
    const xDays = Object.keys(availability[yTimes[0]]).sort();
    const xDaysFormated = xDays.map((timeStamp) =>
        new Date(Number(timeStamp)).toDateString().slice(0, 15)
    );
    const [availabilityData, setAvailabilityData] = React.useState<number[][]>(
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
    const handleClicks = (x: number, y: number) => {
        if (forModal) {
            const avail = JSON.parse(JSON.stringify(availabilityData));
            if (avail[y][x] === 0) {
                avail[y][x] = 1;
            } else {
                avail[y][x] = 0;
            }
            setAvailabilityData(avail);
        }
    };

    const getOpacity = (value: number, min: number, max: number) => {
        if (max - min !== 0) {
            return 1 - (max - value) / (max - min);
        }
        if (max === min && max !== 0) {
            return 1;
        }
        return 0;
    };

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
                    // cellRender={value => null}
                    data={availabilityData}
                    squares={false}
                    height={30}
                    onClick={(x: number, y: number) => handleClicks(x, y)}
                    cellStyle={(
                        // eslint-disable-next-line
                        _background: any,
                        value: number,
                        min: number,
                        max: number
                    ) => ({
                        background: `rgb(0, 151, 230, ${getOpacity(
                            value,
                            min,
                            max
                        )})`,
                        fontSize: '11.5px',
                        color: '#444',
                        border: '2px solid gray',
                    })}
                />
            </div>
        </div>
    );
}

export default AvailabilityMap;
