export const getCurrentYear = (): number => new Date().getFullYear();

interface WeekdayObject {
  day: number;
  weekday: string;
}

export function getWeekdaysOfCurrentWeek(today = new Date()): WeekdayObject[] {
  const currentDay = today.getDate();
  const currentWeekday = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

  const monday = new Date(today);
  monday.setDate(currentDay - currentWeekday + (currentWeekday === 0 ? -6 : 1)); // Adjust for Sunday
  const weekdays: WeekdayObject[] = [];

  for (let i = 0; i < 5; i++) {
    // Monday to Friday
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + i);

    const weekdayObject: WeekdayObject = {
      day: currentDate.getDate(),
      weekday: getWeekdayString(currentDate.getDay()),
    };

    weekdays.push(weekdayObject);
  }

  return weekdays;
}

function getWeekdayString(dayIndex: number): string {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekdays[dayIndex];
}

export function getCurrentTimeInGMT(): string {
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',

    hour12: true,
  };

  return now.toLocaleTimeString('en-GB', options).toUpperCase();
}

export const maxDate = (ageLimit = 18): string => {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - ageLimit, today.getMonth(), today.getDate());
  return maxDate.toISOString().split('T')[0];
};

export function getGreeting(): string {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function getFormattedDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
