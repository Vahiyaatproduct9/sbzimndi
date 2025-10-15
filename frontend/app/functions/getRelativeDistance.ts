/**
 * Returns a human-friendly distance string based on meters.
 * Example: "just nearby", "345 m away", "about 3 km away — too far"
 */
export default function (distance: number): string {
    if (distance < 0) return "invalid distance";

    if (distance < 50) return "just nearby";
    if (distance < 200) return `${Math.round(distance)} m away`;
    if (distance < 1000) return `about ${Math.round(distance)} m away`;
    if (distance < 5000) return `about ${(distance / 1000).toFixed(1)} km away`;
    if (distance < 20000) return `around ${(distance / 1000).toFixed(1)} km away`;
    if (distance < 50000) return `${(distance / 1000).toFixed(1)} km away, kinda far`;
    return `${(distance / 1000).toFixed(1)} km away, too far`;
}
