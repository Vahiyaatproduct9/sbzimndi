import { Appearance } from "react-native"
const heme = Appearance.getColorScheme()
export const dark = heme === 'dark' ? true : false
function check() {
    if (heme === 'dark') {
        return {
            backgroundColor: '#1E1E1B',   // deep matte charcoal, not pure black
            text: '#D3D0CB',              // warm grayish-beige, easy on eyes
            tint: '#6D9773',              // muted forest moss green
            extra: '#A67B5B'              // earthy copper-brown accent
        }
    }
    else return {
        backgroundColor: '#F5F3EE',   // soft off-white like paper or clay
        text: '#3E4E46',              // muted olive/charcoal blend
        tint: '#A3B18A',              // soft sage green
        extra: '#DDBEA9'              // gentle clay-pink for accents
    }
}
const theme = check()
export default theme