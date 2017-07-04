import { SEARCH } from '../constants/SearchConst'

const initialState = {
    filter: null
}

export default function user(state = initialState, action) {

    switch (action.type) {
        case SEARCH: {
            return { filter: action.searchString }
        }
        default:
            return (state)
    }
}