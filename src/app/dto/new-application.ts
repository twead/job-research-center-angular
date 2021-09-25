export class NewApplication {
    advertisementId: number;
    comment: string;
    pdfName: string;

    constructor(advertisementId: number, comment: string, pdfName: string) {
        this.advertisementId = advertisementId;
        this.comment = comment;
        this.pdfName = pdfName;
    }
}
