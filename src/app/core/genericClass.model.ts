import { Subscription } from 'rxjs';

export class GenericClass{
    
    private subscriptionList = new Subscription();

    set subscription(subscription:Subscription){
        this.subscriptionList.add(subscription);
    }
    
    unsubscription(){
        this.subscriptionList.unsubscribe();
    }
    
}