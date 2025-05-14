
export class ListItem {
  
  id :string ; 
  text: string;
  subItems: ListItem[];

  constructor(id:string , text:string , subItems:ListItem[]){
    this.text = text ; 
    this.subItems = subItems ;  
    this.id = id
  }
  
}