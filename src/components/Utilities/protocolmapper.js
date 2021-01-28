export default class protocolmapper {
    static convertToText(protocol) {
        let value;
        switch (protocol) {
            case 0:
                value = "None"
                break;
            case 1:
                value = "Http://"
                break;
            case 2:
                value = "Https://"
                break;
        }
        return value;
    }
}