import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';

export default class ButtonComponent extends LightningElement {
    
    @api objectName;
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