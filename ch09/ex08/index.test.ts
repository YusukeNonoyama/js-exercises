import { AlarmClock, Normal, AlarmSet, AlarmSounding, Snoozing } from "./index.ts"

describe("alarm clock class", () => {
    test("create alarm clock", () => {
        let clock = new AlarmClock();
        expect(clock.getState()).toBe("normal");
    });
    test('"normal" => "alarmSet"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        expect(clock.getState()).toBe("alarmSet");
        expect(() => Normal.setAlarm(clock)).toThrow(Error);
    });
    test('"alarmSet" => "normal"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.cancelAlarm(clock);
        expect(clock.getState()).toBe("normal");
        expect(() => AlarmSet.cancelAlarm(clock)).toThrow(Error);
    });
    test('"alarmSet" => "alarmSounding"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.reachedToAlarmTime(clock);
        expect(clock.getState()).toBe("alarmSounding");
        expect(() => AlarmSet.reachedToAlarmTime(clock)).toThrow(Error);

    });
    test('"alarmSounding" => "snoozing"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.reachedToAlarmTime(clock);
        AlarmSounding.snooze(clock);
        expect(clock.getState()).toBe("snoozing");
        expect(() => AlarmSounding.snooze(clock)).toThrow(Error);
    });
    test('"alarmSounding" => "normal"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.reachedToAlarmTime(clock);
        AlarmSounding.cancelAlarm(clock);
        expect(clock.getState()).toBe("normal");
        expect(() => AlarmSounding.cancelAlarm(clock)).toThrow(Error);
    });
    test('"snoozing" => "alarmSounding"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.reachedToAlarmTime(clock);
        AlarmSounding.snooze(clock);
        Snoozing.elapseSnoozeTime(clock);
        expect(clock.getState()).toBe("alarmSounding");
        expect(() => Snoozing.elapseSnoozeTime(clock)).toThrow(Error);

    });
    test('"snoozing" => "normal"', () => {
        let clock = new AlarmClock();
        Normal.setAlarm(clock);
        AlarmSet.reachedToAlarmTime(clock);
        AlarmSounding.snooze(clock);
        Snoozing.cancelAlarm(clock);
        expect(clock.getState()).toBe("normal");
        expect(() => Snoozing.cancelAlarm(clock)).toThrow(Error);
    });
});
