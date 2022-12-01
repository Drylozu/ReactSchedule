import {
  getBusyDays,
  getHours,
  getLesson,
  getSchedule,
  getTotalHours,
} from '../classes';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export default function Table() {
  const busyDays = getBusyDays();
  const schedule = getSchedule();
  const hours = getHours();

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {busyDays.map((d) => (
            <th key={days[d]}>{days[d]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(getTotalHours())
          .fill(null)
          .map((_, i) => (
            <tr>
              <th>{hours[i].join(' - ')}</th>
              {busyDays.map((d) => (
                <td>
                  {schedule[d][i] !== null
                    ? getLesson(schedule[d][i]!).name
                    : ''}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
