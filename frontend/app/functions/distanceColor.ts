export default (distance: number) => {
    if (distance <= 3000) return '#26a269'
    if (distance <= 5000) return '#1a5fb4'
    if (distance <= 7000) return '#f5c211'
    if (distance <= 10000) return '#cc4d02'
    else return '#e01b24'
}