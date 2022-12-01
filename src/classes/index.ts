import classes from './data.json';

export function getCurrentHour() {
    const now = new Date();
    return classes.hours.findIndex((t) => {
        const start = new Date();
        start.setHours(parseInt(t[0].split(':')[0]));
        start.setMinutes(parseInt(t[0].split(':')[1]));

        const end = new Date();
        end.setHours(parseInt(t[1].split(':')[0]));
        end.setMinutes(parseInt(t[1].split(':')[1]));

        return now >= start && now <= end;
    });
}

export function getCurrentClass() {
    const todayClasses = classes.schedule[new Date().getDay()];
    const currentHour = todayClasses[getCurrentHour()];
    const previousHour = todayClasses[getCurrentHour() - 1];
    const nextHour = todayClasses[getCurrentHour() + 1];
    if (typeof currentHour !== "string") return null;
    const lesson = (classes.lessons as Lessons)[currentHour];
    return {
        ...lesson,
        from: classes.hours[getCurrentHour() - (currentHour === previousHour ? 1 : 0)]?.[0],
        to: classes.hours[getCurrentHour() + (currentHour === nextHour ? 1 : 0)]?.[1],
    };
}

export function getBusyDays() {
    return classes.schedule.map((_, i) => i).filter((d) => classes.schedule[d].length > 0);
}

export function getLesson(id: string) {
    return (classes.lessons as Lessons)[id];
}

export function getTotalHours() {
    return classes.hours.length;
}

export function getSchedule() {
    return classes.schedule;
}

export function getHours() {
    return classes.hours;
}