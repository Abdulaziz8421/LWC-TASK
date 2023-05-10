import { LightningElement,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import fetchAllObjectList from '@salesforce/apex/SobjectController.fetchAllObjectList';

export default class Main extends NavigationMixin(LightningElement) {
    
    @api objectname='';
    @track showButton=false;
    @track objectList = [];

    onObjectChange(event) {
       
        this.objectname = event.detail.value;
        this.showButton=true;
    }
   
   
    connectedCallback() {
        fetchAllObjectList()
            .then((result) => {
                if (result) {
                    this.objectList = [];
                    for (let key in result) {
                        this.objectList.push({ label: key, value: key });
                    }
                } else {
                    console.log('Objects are not found')
                }
            }).catch((error) => {
                console.log('Objects are not found')
            });
    }
    handleClick() {

        console.log('button record name ' + this.objectName);

        this[NavigationMixin.Navigate]({

            type: 'standard__objectPage',

            attributes: {

                objectApiName: this.objectName,

                actionName: 'new'

            }

        });



    }




}