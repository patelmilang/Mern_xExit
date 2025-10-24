import axios from "axios";

export const CalendarService = {
  async isHolidayOrWeekend(lwd) {
    const date = new Date(lwd);
    const day = date.getUTCDay();
    if (day === 0 || day === 6) return true;

    const API_KEY = process.env.CALENDARIFIC_API_KEY;
    if (!API_KEY) return false;

    try {
      const year = date.getUTCFullYear();
      const res = await axios.get("https://calendarific.com/api/v2/holidays", {
        params: { api_key: API_KEY, country: "IN", year }
      });
      const holidays = res.data.response.holidays;
      const formatted = date.toISOString().split("T")[0];
      return holidays.some(h => h.date.iso === formatted);
    } catch {
      return false;
    }
  }
};
