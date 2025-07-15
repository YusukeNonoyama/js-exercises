// Stateパターン
// Stateパターンでは、「状態」自身が次の遷移先を知っている。
type Action = "none" | "soundAlarm" | "stopAlarm";

// 全ての状態が持つメソッドのインターフェースを定義
interface AlarmState {
    setAlarm(): Action;
    cancelAlarm(): Action;
    reachedToAlarmTime(): Action;
    snooze(): Action;
    elapseSnoozeTime(): Action;
}

// 目覚まし時計クラス
// インターフェースで定義したメソッドを持ち、各メソッド内で各状態クラスで定義されたメソッドを呼び出す
export class AlarmClock {
    private state: AlarmState;
    constructor() {
        this.state = new NormalState(this);
    }
    public getState() {
        return this.state;
    }
    public setState(state: AlarmState) {
        this.state = state;
    }
    public setAlarm(): Action {
        return this.state.setAlarm();
    }
    public cancelAlarm(): Action {
        return this.state.cancelAlarm();
    }
    public reachedToAlarmTime(): Action {
        return this.state.reachedToAlarmTime();
    }
    public snooze(): Action {
        return this.state.snooze();
    }
    public elapseSnoozeTime(): Action {
        return this.state.elapseSnoozeTime();
    }
}

export class NormalState implements AlarmState {
    constructor(private clock: AlarmClock) { }
    setAlarm(): Action {
        // 状態遷移
        // clockを受け取った状態クラスのインスタンスを渡す
        this.clock.setState(new AlarmSetState(this.clock));
        return "none";
    }
    cancelAlarm(): Action {
        return "none";
    }
    reachedToAlarmTime(): Action {
        return "none";
    }
    snooze(): Action {
        return "none";
    }
    elapseSnoozeTime(): Action {
        return "none";
    }
}

// 以下同様に状態クラスを図に従って定義
class AlarmSetState implements AlarmState {
    constructor(private clock: AlarmClock) { }
    setAlarm(): Action {
        return "none";
    }
    cancelAlarm(): Action {
        this.clock.setState(new NormalState(this.clock));
        return "none";
    }
    reachedToAlarmTime(): Action {
        this.clock.setState(new AlarmSoundingState(this.clock));
        return "soundAlarm";
    }
    snooze(): Action {
        return "none";
    }
    elapseSnoozeTime(): Action {
        return "none";
    }
}

class AlarmSoundingState implements AlarmState {
    constructor(private clock: AlarmClock) { }
    setAlarm(): Action {
        return "none";
    }
    cancelAlarm(): Action {
        this.clock.setState(new NormalState(this.clock));
        return "stopAlarm";
    }
    reachedToAlarmTime(): Action {
        return "none";
    }
    snooze(): Action {
        this.clock.setState(new SnoozingState(this.clock));
        return "stopAlarm";
    }
    elapseSnoozeTime(): Action {
        return "none";
    }
}

class SnoozingState implements AlarmState {
    constructor(private clock: AlarmClock) { }
    setAlarm(): Action {
        return "none";
    }
    cancelAlarm(): Action {
        this.clock.setState(new NormalState(this.clock));
        return "none";
    }
    reachedToAlarmTime(): Action {
        return "none";
    }
    snooze(): Action {
        return "none";
    }
    elapseSnoozeTime(): Action {
        this.clock.setState(new AlarmSoundingState(this.clock));
        return "soundAlarm";
    }
}
