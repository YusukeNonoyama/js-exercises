export type State = "normal" | "alarmSet" | "alarmSounding" | "snoozing";

function validateState(clock: AlarmClock, state: State) {
    if (clock.getState() !== state) {
        throw Error(`State should be ${state}: ${clock.getState()}`);
    };
}

export class AlarmClock {
    #state: State;
    constructor() {
        this.#state = "normal";
    }
    getState() {
        return this.#state;
    }
    setState(state: State) {
        this.#state = state;
    }
}

export class Normal {
    static setAlarm(clock: AlarmClock) {
        validateState(clock, "normal");
        clock.setState("alarmSet");
    }
}

export class AlarmSet {
    static cancelAlarm(clock: AlarmClock) {
        validateState(clock, "alarmSet");
        clock.setState("normal");
    }
    static reachedToAlarmTime(clock: AlarmClock) {
        validateState(clock, "alarmSet");
        clock.setState("alarmSounding");
    }
}

export class AlarmSounding {
    static cancelAlarm(clock: AlarmClock) {
        validateState(clock, "alarmSounding");
        clock.setState("normal");
    }
    static snooze(clock: AlarmClock) {
        validateState(clock, "alarmSounding");
        clock.setState("snoozing");
    }
}

export class Snoozing {
    static cancelAlarm(clock: AlarmClock) {
        validateState(clock, "snoozing");
        clock.setState("normal");
    }
    static elapseSnoozeTime(clock: AlarmClock) {
        validateState(clock, "snoozing");
        clock.setState("alarmSounding");
    }
}
