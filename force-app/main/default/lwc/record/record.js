import { LightningElement, api, wire, track } from 'lwc';
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/SobjectController.fetchAllRecordsOfSelectedObject';
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { deleteRecord } from "lightning/uiRecordApi";

export default class Record extends NavigationMixin(LightningElement) {
    @api selectedFields = [];
    @api arrayForgrand = [];
    @api objectNamegrand = '';
    @track allRecordsOfSelectedObject = [];
    @track columnsMap = [];
    @track tempName = [];

    @track actions =
        [
            { label: 'Edit', name: 'edit' },
            { label: 'View', name: 'view' },
            { label: 'Delete', name: 'delete' },
            // { label: 'Delete', name: 'delete' }
        ];



    @api recordlist() {
        const selectedFields = this.arrayForgrand;
        this.columnsMap = [
            ...selectedFields.map(fieldName => ({
                label: fieldName,
                fieldName: fieldName === 'Name' ? 'TempName' : fieldName,
                type: fieldName === 'Name' ? 'url' : 'text',
                typeAttributes: {
                    label: {
                        fieldName: 'Name',
                        target: '_blank',
                    },
                    target: fieldName === "Name" ? "_blank" : null,
                }
            })),
            {
                type: 'action',
                typeAttributes: {
                    target: '_blank',
                    rowActions: this.actions
                }
            }
        ];

    }
    @wire(fetchAllRecordsOfSelectedObject, { strObjectName: "$objectNamegrand" })
    wiredObjectRecords({ data, error }) {
        if (data) {
            let tempRecs = [];

            data.forEach((record) => {
                let tempRec = Object.assign({}, record);

                tempRec.TempName = "/" + tempRec.Id;

                tempRecs.push(tempRec);

                console.log(tempRec);
            });

            this.allRecordsOfSelectedObject = tempRecs;

            this.error = undefined;
        } else if (error) {
            this.error = error;

            this.allRecordsOfSelectedObject = undefined;
        }
    }
    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: this.objectName,
                        actionName: 'edit'
                    }
                });
                break;

            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: this.objectName,
                        actionName: 'view'
                    }
                });
                break;
            case 'delete':

                const recordId = row.Id;

                deleteRecord(recordId)

                    .then(() => {

                        const toastEvent = new ShowToastEvent({

                            title: 'Success!',

                            message: 'Record has been deleted.',

                            variant: 'success'

                        });

                        this.dispatchEvent(toastEvent);

                    })

                    .catch(error => {

                        console.log(error);

                    });

                break;
            default:
                break;
        }
    }






}



