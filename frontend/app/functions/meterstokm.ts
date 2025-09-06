export default function MtoKm(number: number) {
    const numberk = number / 1000
    if (numberk < 1000) {
        return number.toFixed(0).toString() + ' m'
    }
    if (numberk <= 10) {
        return `${numberk.toFixed(1).toString()} km`
    }
    else if (numberk > 10 && numberk < 100) {
        return '10+ km'
    }
    else {
        return 'Too far'
    }
}