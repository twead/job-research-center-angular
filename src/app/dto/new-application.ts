export class NewApplication {
    advertisementId: number;
    comment: string;
    pdfName: string;
    key: string;

    constructor(advertisementId: number, comment: string, pdfName: string, key: string) {
        this.advertisementId = advertisementId;
        this.comment = comment;
        this.pdfName = pdfName;
        this.key = key;
    }
}
