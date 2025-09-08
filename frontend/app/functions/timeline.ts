export default function getRelativeDay(dateString: string) {
  const inputDate = new Date(dateString);
  const today = new Date();
  
  // Reset time to midnight for accurate day comparison
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  
  const diffTime = inputDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  // Today/Yesterday/Tomorrow
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  if (diffDays === -1) return "yesterday";
  
  // This week (future)
  if (diffDays > 1 && diffDays <= 6) {
    return `${diffDays} days from now`;
  }
  
  // Last week (past)
  if (diffDays < -1 && diffDays >= -6) {
    return `${Math.abs(diffDays)} days ago`;
  }
  
  // Next week
  if (diffDays >= 7 && diffDays <= 13) {
    return "next week";
  }
  
  // Last week
  if (diffDays <= -7 && diffDays >= -13) {
    return "last week";
  }
  
  // Weeks (future)
  if (diffDays > 13 && diffDays <= 30) {
    const weeks = Math.ceil(diffDays / 7);
    return weeks === 2 ? "in 2 weeks" : `in ${weeks} weeks`;
  }
  
  // Weeks (past)
  if (diffDays < -13 && diffDays >= -30) {
    const weeks = Math.ceil(Math.abs(diffDays) / 7);
    return weeks === 2 ? "2 weeks ago" : `${weeks} weeks ago`;
  }
  
  // Months (future)
  if (diffDays > 30 && diffDays <= 365) {
    const months = Math.ceil(diffDays / 30);
    return months === 1 ? "next month" : `in ${months} months`;
  }
  
  // Months (past)
  if (diffDays < -30 && diffDays >= -365) {
    const months = Math.ceil(Math.abs(diffDays) / 30);
    return months === 1 ? "last month" : `${months} months ago`;
  }
  
  // Years (future)
  if (diffDays > 365) {
    const years = Math.ceil(diffDays / 365);
    return years === 1 ? "next year" : `in ${years} years`;
  }
  
  // Years (past)
  const years = Math.ceil(Math.abs(diffDays) / 365);
  return years === 1 ? "last year" : `${years} years ago`;
}