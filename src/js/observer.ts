import Dep from './dep';

export default class observer{

	constructor(data:any={},vm:any){		
		this.proxyData(data)
		
	}
	
	proxyData(data:any={}){
		var dep = new Dep()
		let p = new Proxy(data,{
			get(target,key){
				console.error(dep,'gettt')
			
				return Reflect.get(target,key)
			},
			set(target,key,value){
				console.error(target,key,value,'setttt')
				target[key] = value
				return true;
			}
		})
	
	}
	
	
	
}