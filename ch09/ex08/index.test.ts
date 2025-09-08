import { AlarmClock, NormalState } from "./index.ts";

describe("AlarmClock State Pattern", () => {
  let clock: AlarmClock;
  beforeEach(() => {
    clock = new AlarmClock();
  });
  it("initial NormalState", () => {
    expect(clock.getState()).toEqual(new NormalState(clock));
  });
  it("NormalState to AlarmSetState", () => {
    const action = clock.setAlarm();
    expect(action).toBe("none");
  });
  it("AlarmSetState to NormalState", () => {
    clock.setAlarm();
    const action = clock.cancelAlarm();
    expect(action).toBe("none");
  });
  it("AlarmSet to AlarmSoundingState", () => {
    clock.setAlarm();
    const action = clock.reachedToAlarmTime();
    expect(action).toBe("soundAlarm");
  });

  it("AlarmSoundingState to SnoozingState", () => {
    clock.setAlarm();
    clock.reachedToAlarmTime();
    const action = clock.snooze();
    expect(action).toBe("stopAlarm");
  });
  it("AlarmSoundingState to NormalState", () => {
    clock.setAlarm();
    clock.reachedToAlarmTime();
    const action = clock.cancelAlarm();
    expect(action).toBe("stopAlarm");
  });
  it("SnoozingState to AlarmSoundingState", () => {
    clock.setAlarm();
    clock.reachedToAlarmTime();
    clock.snooze();
    const action = clock.elapseSnoozeTime();
    expect(action).toBe("soundAlarm");
  });

  it("SnoozingState to NormalState", () => {
    clock.setAlarm();
    clock.reachedToAlarmTime();
    const action = clock.cancelAlarm();
    expect(action).toBe("stopAlarm");
  });
});
