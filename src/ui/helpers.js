export function getPriorityColor(priority) {
  switch (priority) {
    case "High":   return "red";
    case "Medium": return "orange";
    case "Low":    return "green";
    default:       return "gray";
  }
}