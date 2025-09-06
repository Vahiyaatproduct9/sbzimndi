export default function ({ date, setShowNote }: { date: Date, setShowNote: (note: string) => void }) {
    if (new Date(date).getTime() <= new Date().getTime()) {
        setShowNote('Expiry date has to be atleast 1 day from today.')
    } else {
        setShowNote('')
    }
}