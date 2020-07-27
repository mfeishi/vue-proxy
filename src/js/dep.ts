

export default class Dep{
	private subs:any[] = [];
	
	constructor(){
		
	}
	
	addSub(watcher:any){
		this.subs.push(watcher)
	}
	
	notify(){
		let subs = this.subs;
		subs.forEach(item=>{
			item.update()
		})
	}
	
	
	
}