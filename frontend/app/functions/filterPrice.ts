const numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export default function ({ price, setPrice, setMess, setShowNote }: {
    price: string,
    setPrice: (price: string) => void,
    setMess: (mess: string) => void,
    setShowNote: (note: string) => void
}) {
    if (price.length > 60) {
        setMess('Stop Breaking my App 🙏🏻')
    }
    if (price.length > 5) {
        setPrice(price.slice(0, 5))
    }
    else {
        try {
            if (price.length > 0) {
                for (const num of price) {
                    if (!numList.includes(num)) {
                        setPrice(price.slice(0, -1))
                    }
                }
                if (parseInt(price) > 100) {
                    setShowNote('Careful, High Prices might not attract Customers.')
                } else {
                    setShowNote('')
                }
            }
        }
        catch (e) {
            setShowNote(`Invalid Number... ${e}`)
        }
    }
}