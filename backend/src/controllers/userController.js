import { resignations } from "../models/resignationModel.js";
import { exitResponses } from "../models/exitResponseModel.js";
import { CalendarService } from "../services/calendarService.js";

export const submitResignation = async (req, res) => {
  try {
    console.log("User submitting resignation:", req.user);
    if (req.user.role !== "Employee") return res.status(403).json({ message: "Forbidden" });
    const { lwd, reason } = req.body;
    if (!lwd) return res.status(400).json({ message: "LWD required" });

    const invalid = await CalendarService.isHolidayOrWeekend(lwd);
    if (invalid) return res.status(400).json({ message: "LWD cannot be weekend/holiday" });

    const resignation = { _id: Date.now().toString(), employeeId: req.user.username, lwd, reason, status: "pending" };
    resignations.push(resignation);

    res.json({ data: { resignation } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const submitExitResponses = (req, res) => {
  if (req.user.role !== "Employee") return res.status(403).json({ message: "Forbidden" });
  const { responses } = req.body;
  if (!responses || !Array.isArray(responses)) return res.status(400).json({ message: "Invalid responses" });

  exitResponses.push({ employeeId: req.user.username, responses });
  res.json({ message: "Responses submitted" });
};
