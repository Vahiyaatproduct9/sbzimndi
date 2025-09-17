export function normalizeUpi(vpa: string): string | null {
if (!vpa) return null;
// trim and lowercase (UPI is case-insensitive in practice)
return vpa.trim().toLowerCase();
}
export default function (upi: string){
const UPI_REGEX = /^[A-Za-z0-9]+[A-Za-z0-9._-]{0,255}@[A-Za-z0-9]+[A-Za-z0-9.-]{0,63}$/;

function isValidUpi(vpa: string): boolean {
  const normalized = normalizeUpi(vpa);
  if (!normalized) return false;
  return UPI_REGEX.test(normalized);
}
return isValidUpi(upi)
}