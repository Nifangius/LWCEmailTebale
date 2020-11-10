import { LightningElement, wire, api, track } from 'lwc';
import getEmails from '@salesforce/apex/ContactController.getEmails';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' }
];


const COLS = [
    {type: "button-icon", initialWidth: 10, label:'View',typeAttributes: {  
        iconName: 'utility:preview',
        label: 'View',  
        name: 'view',  
        variant: 'bare',
        alternativeText: 'view',        
        disabled: false
    }},
    { label: 'Subject', fieldName: 'Subject', type: 'Text'},
    { label: 'To', fieldName: 'ToAddress', type: 'email'},
    { label: 'From', fieldName: 'FromAddress', type: 'email' },
    { label: 'Message', fieldName: 'TextBody'}
];

export default class EmailTableComponent extends NavigationMixin(LightningElement) {

    @api recordId;
    @track columns = COLS;
    @track record = {};
    @track isOpen = false;

    @wire(getEmails, { conId: '$recordId' })
    email;

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'view':
                const rowIndex = this.email.data.findIndex(row => row.Id === event.detail.row.Id) +1;
                this.isOpen = true;
                this.showRowDetails(row);
                console.log(rowIndex);
                break;                      
            default:
        }
    }

    showNext(event){
        const recordId = event.target.value;
        const rowIndex = this.email.data.findIndex(row => row.Id === recordId);
        const nextRow = this.email.data[rowIndex+1];
        this.showRowDetails(nextRow);
    }

    showPrev(event){
        const recordId = event.target.value;
        const rowIndex = this.email.data.findIndex(row => row.Id === recordId);
        const nextRow = this.email.data[rowIndex-1];
        this.showRowDetails(nextRow);
    }

    showRowDetails(row) {
        this.record = row;
    }

    viewRecord(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": event.target.value,
                "objectApiName": "EmailMessage",
                "actionName": "view"
            },
        });
    }
    
    openmodal() {
        this.isOpen = true
    }
    closeModal() {
        this.isOpen = false
    } 
}

