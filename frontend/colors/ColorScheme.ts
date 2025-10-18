import { Appearance } from "react-native"
const heme = Appearance.getColorScheme()
export const dark = heme === 'dark' ? true : false
function check() {
    if (heme === 'dark') {
        return {
            backgroundColor: '#1f1f19ff',   // deep matte charcoal, not pure black
            text: '#D3D0CB',              // warm grayish-beige, easy on eyes
            tint: '#54795aff',              // muted forest moss green
            extra: '#8a664aff'              // earthy copper-brown accent
        }
    }
    else return {
        backgroundColor: '#F5F3EE',   // soft off-white like paper or clay
        text: '#3E4E46',              // muted olive/charcoal blend
        tint: '#A3B18A',              // soft sage green
        extra: '#df9b6eff'              // gentle clay-pink for accents
    }
}
const theme = check()
export default theme