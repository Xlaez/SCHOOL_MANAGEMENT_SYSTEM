
const cleanseData = (content, prob) => {
    if (content.match(prob)) {
        return true
    }
}

module.exports = {
    cleanseData
}