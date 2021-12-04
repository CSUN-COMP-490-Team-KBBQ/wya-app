import React from 'react';
import ScheduleSelector from 'react-schedule-selector';

import './AvailabilityScheduleSelector.css';

type AvailabilityScheduleSelectorProps = {
    startTime: number;
    endTime: number;
    scheduleData: Date[];
    days: number;
    startDate: Date;
    handleChange: (newSchedule: Date[]) => void;
};

function AvailabilityScheduleSelector(
    props: AvailabilityScheduleSelectorProps
): JSX.Element {
    const { startTime, endTime, scheduleData, days, startDate, handleChange } =
        props;

    return (
        <ScheduleSelector
            selection={scheduleData}
            numDays={days}
            startDate={startDate}
            dateFormat="dddd"
            timeFormat="h:mm a"
            minTime={startTime}
            maxTime={endTime}
            hourlyChunks={4}
            onChange={handleChange}
            renderDateCell={(
                time: Date,
                selected: boolean,
                refSetter: (dateCell: HTMLElement | null) => void
            ) => {
                const currentTime = time.getHours() + time.getMinutes() / 60;

                if (startTime === 0) {
                    if (currentTime < endTime) {
                        return selected ? (
                            <div id="trueTest" ref={refSetter} />
                        ) : (
                            <div id="falseTest" ref={refSetter} />
                        );
                    }

                    return <div />;
                }

                if (currentTime < endTime && Math.floor(currentTime) !== 0) {
                    return selected ? (
                        <div id="trueTest" ref={refSetter} />
                    ) : (
                        <div id="falseTest" ref={refSetter} />
                    );
                }
                return <div />;
            }}
            renderTimeLabel={(time: Date) => {
                const timeLabel = time.toTimeString().slice(0, 5);
                const currentTime = time.getHours() + time.getMinutes() / 60;
                const timeHoursNum = Number(timeLabel.slice(0, 2));
                let timeMinutesNum = Number(timeLabel.slice(3, 5)).toString();

                if (timeMinutesNum === '0') {
                    timeMinutesNum = '00';
                }

                if (startTime === 0) {
                    if (currentTime < endTime) {
                        if (timeHoursNum < 12) {
                            return timeHoursNum === 0 ? (
                                <div>{`${
                                    timeHoursNum + 12
                                }:${timeMinutesNum} am`}</div>
                            ) : (
                                <div>{`${timeHoursNum}:${timeMinutesNum} am`}</div>
                            );
                        }

                        return timeHoursNum === 12 ? (
                            <div>{`${timeHoursNum}:${timeMinutesNum} pm`}</div>
                        ) : (
                            <div>{`${
                                timeHoursNum - 12
                            }:${timeMinutesNum} pm`}</div>
                        );
                    }

                    return <div />;
                }

                if (currentTime < endTime && Math.floor(currentTime) !== 0) {
                    if (timeHoursNum < 12) {
                        return (
                            <div>{`${timeHoursNum}:${timeMinutesNum} am`}</div>
                        );
                    }

                    return timeHoursNum === 12 ? (
                        <div>{`${timeHoursNum}:${timeMinutesNum} pm`}</div>
                    ) : (
                        <div>{`${timeHoursNum - 12}:${timeMinutesNum} pm`}</div>
                    );
                    // return <div>{`${timeLabel} pm`}</div>;
                }

                return <div />;
            }}
        />
    );
}

export default AvailabilityScheduleSelector;
