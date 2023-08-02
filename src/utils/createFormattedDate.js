import moment from "moment"

export const createFormattedDate = (date) => {
    return moment(date).fromNow()
}