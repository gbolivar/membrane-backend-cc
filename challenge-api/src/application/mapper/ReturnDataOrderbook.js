export const ReturnDataOrderbook = {
    async main(dataBidDeltas, dataAskDeltas) {
        return {
            "bidDelta": dataBidDeltas,
            "askDelta": dataAskDeltas
        }
    }

}