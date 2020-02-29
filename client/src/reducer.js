import { LOCALES } from './language';

let initial = {
    lang: LOCALES.ENGLISH
}

const reducer = (state = initial, action) => {
    switch (action.type) {
        case 'LANGUAGE':
            return {
                lang: action.payload
            }
        default:
            return state;
    }
}

export default reducer;