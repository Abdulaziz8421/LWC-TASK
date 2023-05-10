import { LightningElement,api,track,wire} from 'lwc';
import fetchAllFieldsForSelectedObject from '@salesforce/apex/SobjectController.fetchAllFieldsForSelectedObject';
import fetchAllRecordsOfSelectedObject from '@salesforce/apex/SobjectController.fetchAllRecordsOfSelectedObject';


export default class FieldComponent extends LightningElement {
   @api objectChildName = '';
   @track lstFields = [];
   @track arrayToSend=[];
   @api showButton=false;
     
   
        @wire(fetchAllFieldsForSelectedObject,{strObjectName:'$objectChildName'})
           fieldlist({data,error})
           {
            console.log(this.objectChildName);
           if (data){

            this.lstFields = [];
                for (let key in data) {
                    this.lstFields.push({ label: key, value: key, type: 'action' });
                }
            }
            else if(error){
                console.log(error);
            }
           }
        
    
    handleCheckBoxClick(event) { // getting proxy in event.detail.value
        this.arrayToSend = [];
        for (let index in event.detail.value) {
            this.arrayToSend.push(event.detail.value[index])
        }
       

}
handleShowData(event) {
    this.template.querySelector("c-record").recordlist();  
}
}



