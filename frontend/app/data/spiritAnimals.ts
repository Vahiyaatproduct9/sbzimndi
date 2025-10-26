import { spiritType } from "../../types/types"

const sparrow = require(`../../assets/images/sparrow.png`)
const orca = require(`../../assets/images/orca.png`)
const cheetah = require(`../../assets/images/cheetah.png`)
const elephant = require(`../../assets/images/elephant.png`)
const brown_bear = require(`../../assets/images/brown_bear.png`)
const flying_sparrow = require(`../../assets/images/flying_sparrow.png`)
const kingfisher = require(`../../assets/images/kingfisher.png`)
const owl = require(`../../assets/images/owl.png`)
const polar_bear = require(`../../assets/images/polar_bear.png`)
const snow_leopard = require(`../../assets/images/snow_leopard.png`)

export default [
    { id: 1, label: "Brown Bear", value: "brown_bear", },
    { id: 2, label: "Cheetah", value: "cheetah", },
    { id: 3, label: "Elephant", value: "elephant", },
    { id: 4, label: "Sparrow", value: "sparrow", },
    { id: 5, label: "Kingfisher", value: "kingfisher", },
    { id: 6, label: "Orca", value: "orca", },
    { id: 7, label: "Barn Owl", value: "owl", },
    { id: 8, label: "Polar Bear", value: "polar_bear", },
    { id: 9, label: "Snow Leopard", value: "snow_leopard", },
    { id: 10, label: "Sparrow 2", value: "sparrow2", },
]
export const spirit = (spirit_animal: spiritType | null) => {
    switch (spirit_animal) {
        case null:
            return cheetah
        case 'sparrow2':
            return sparrow
        case 'orca':
            return orca
        case 'cheetah':
            return cheetah
        case 'elephant':
            return elephant
        case 'brown_bear':
            return brown_bear
        case 'sparrow':
            return flying_sparrow
        case 'kingfisher':
            return kingfisher
        case 'owl':
            return owl
        case 'polar_bear':
            return polar_bear
        case 'snow_leopard':
            return snow_leopard
        default:
            return cheetah
    }
}