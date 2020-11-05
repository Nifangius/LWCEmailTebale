import { LightningElement, wire, api, track } from 'lwc';
import getEmails from '@salesforce/apex/ContactController.getEmails';

const COLS = [
    { label: 'Subject', fieldName: 'Subject'},
    { label: 'To', fieldName: 'ToAddress'},
    { label: 'From', fieldName: 'FromAddress', type: 'email' },
    { label: 'Message', fieldName: 'TextBody'}
];
export default class EmailTableComponent extends LightningElement {

    @api recordId;
    columns = COLS;

    @wire(getEmails, { conId: '$recordId' })
    email;

    @track showEmailComponent = false;

    handleRowAction(event) {
        this.showEmailComponent = true;
        console.log(event.target.dataset.recordId);
    }
}
