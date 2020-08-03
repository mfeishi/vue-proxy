

export default class Dep{
	private subs:any[] = [];
	private watcherIds:any = new Map();
	static target:any = null;

	constructor(){
	
	}
	addSub(watcher:any){	
		let wid = watcher.wid;
		if(!this.watcherIds.has(wid)){
			this.watcherIds.set(wid,watcher)
			this.subs.push(watcher)
		}
	}
	depend(){
	
		Dep.target.addDep(this);
	}
	notify(){
		let subs = this.subs;
		subs.forEach(item=>{
			item&&item.update()
		})
	}
	
	
	
}