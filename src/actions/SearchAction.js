import { SEARCH } from '../constants/SearchConst'

export function changeFilter(searchString) {
    return {
        type: SEARCH,
        searchString
    }
}