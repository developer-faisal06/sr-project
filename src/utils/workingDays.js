/**
 * Working Days Calculation Utility (CRITICAL ALGORITHM)
 * 
 * Rules:
 * - Start a while-loop from startDate, incrementing day-by-day.
 * - DEFAULT WEEKEND CONDITION: If the current day is FRIDAY (5) or SATURDAY (6),
 *   DO NOT increment the working days counter.
 * - CUSTOM HOLIDAY CONDITION: Check against holidaysArray.
 *   - Specific date check (YYYY-MM-DD format).
 *   - Recurring day of week check (e.g. Every Wednesday = 3, day_of_week check).
 *   - If matching, DO NOT increment the counter.
 * - Return the exact future date when working days counter === requiredWorkingDays.
 */

export function toDateStringISO(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Checks if a specific Date instance is considered a non-working day.
 * Friday = 5, Saturday = 6 (Default Weekends)
 * Plus any specific or recurring holiday in holidaysArray.
 */
export function isNonWorkingDay(date, holidaysArray = []) {
  const d = new Date(date);
  const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat

  // DEFAULT WEEKEND CONDITION: Friday (5) or Saturday (6)
  if (dayOfWeek === 5 || dayOfWeek === 6) {
    return {
      isNonWorking: true,
      reason: dayOfWeek === 5 ? 'Friday Weekend' : 'Saturday Weekend'
    };
  }

  const isoDate = toDateStringISO(d);

  // CUSTOM HOLIDAY CONDITION
  if (Array.isArray(holidaysArray) && holidaysArray.length > 0) {
    for (const h of holidaysArray) {
      // Check recurring day of week (e.g. admin marks every Wednesday as holiday)
      if (h.is_recurring_day && Number(h.day_of_week) === dayOfWeek) {
        return {
          isNonWorking: true,
          reason: h.title || 'Recurring Weekly Holiday',
          holiday: h
        };
      }

      // Check specific date match
      if (h.date) {
        const hIso = typeof h.date === 'string' ? h.date.split('T')[0] : toDateStringISO(h.date);
        if (hIso === isoDate) {
          return {
            isNonWorking: true,
            reason: h.title || 'Scheduled Holiday',
            holiday: h
          };
        }
      }
    }
  }

  return { isNonWorking: false, reason: null };
}

/**
 * Calculates the exact future Date when required working days have completed.
 * 
 * @param {Date|string|number} startDate - Starting date (e.g. user.first_deposit_approved_at)
 * @param {number} requiredWorkingDays - Number of working days needed (e.g. 30 or 45)
 * @param {Array} holidaysArray - Array of holiday objects from DB
 * @returns {{
 *   unlockDate: Date,
 *   unlockDateISO: string,
 *   calendarDaysTotal: number,
 *   workingDaysCompleted: number,
 *   isUnlocked: boolean,
 *   daysRemaining: number,
 *   workingDaysRemaining: number
 * }}
 */
export function calculateUnlockDate(startDate, requiredWorkingDays, holidaysArray = []) {
  const reqDays = Number(requiredWorkingDays || 0);
  if (!startDate || reqDays <= 0) {
    const fallback = new Date();
    return {
      unlockDate: fallback,
      unlockDateISO: toDateStringISO(fallback),
      calendarDaysTotal: 0,
      workingDaysCompleted: reqDays,
      isUnlocked: true,
      daysRemaining: 0,
      workingDaysRemaining: 0
    };
  }

  const cursor = new Date(startDate);
  cursor.setHours(0, 0, 0, 0);

  let workingDaysCounter = 0;
  let calendarDaysTotal = 0;

  // While-loop starts from startDate and increments day by 1
  while (workingDaysCounter < reqDays) {
    cursor.setDate(cursor.getDate() + 1);
    calendarDaysTotal += 1;

    const check = isNonWorkingDay(cursor, holidaysArray);
    if (!check.isNonWorking) {
      workingDaysCounter += 1;
    }
  }

  const unlockDate = new Date(cursor);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Calculate current progress from startDate to now
  const progressCursor = new Date(startDate);
  progressCursor.setHours(0, 0, 0, 0);
  let completedSoFar = 0;

  while (progressCursor < now && completedSoFar < reqDays) {
    progressCursor.setDate(progressCursor.getDate() + 1);
    if (progressCursor <= now) {
      const check = isNonWorkingDay(progressCursor, holidaysArray);
      if (!check.isNonWorking) {
        completedSoFar += 1;
      }
    }
  }

  const isUnlocked = now.getTime() >= unlockDate.getTime() || completedSoFar >= reqDays;
  const msRemaining = Math.max(0, unlockDate.getTime() - now.getTime());
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
  const workingDaysRemaining = Math.max(0, reqDays - completedSoFar);

  return {
    unlockDate,
    unlockDateISO: toDateStringISO(unlockDate),
    calendarDaysTotal,
    workingDaysCompleted: completedSoFar,
    isUnlocked,
    daysRemaining,
    workingDaysRemaining
  };
}
