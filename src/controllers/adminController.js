import { resignations } from "../models/resignationModel.js";
import { exitResponses } from "../models/exitResponseModel.js";
import { MailService } from "../services/mailService.js";

export const getAllResignations = (req, res) => {
  if (req.user.role !== "HR") return res.status(403).json({ message: "Forbidden" });
  res.json({ data: resignations });
};

export const concludeResignation = async (req, res) => {
  if (req.user.role !== "HR") return res.status(403).json({ message: "Forbidden" });
  const { resignationId, approved, lwd } = req.body;
  const resignation = resignations.find(r => r._id === resignationId);
  if (!resignation) return res.status(404).json({ message: "Not found" });

  resignation.status = approved ? "approved" : "rejected";
  resignation.lwd = lwd;

  await MailService.sendNotification(
    `${resignation.employeeId}@example.com`,
    approved ? "Resignation Approved" : "Resignation Rejected",
    approved ? `Your resignation has been approved. Exit date: ${lwd}` : "Your resignation has been rejected."
  );

  res.json({ message: "Resignation concluded" });
};

export const getExitResponses = (req, res) => {
  if (req.user.role !== "HR") return res.status(403).json({ message: "Forbidden" });
  res.json({ data: exitResponses });
};
