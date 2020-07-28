import Dep from './dep';
import {Vm} from './config/interface';


export default class Observer{
	private $vm:Vm;
	constructor(data:any={},vm:Vm){		
		this.$vm = vm;
		this.observe(data)
	}
	observe(data:any={}){ //递归监听对象所有属性，属性的属性。。。。
		if(typeof data !== 'object'){
			return data
		}
		Object.keys(data).forEach(key=>{			
			data[key] = this.observe(data[key])
		})
		
		return this.defineReactive(data)
	}
	defineReactive(data:any={}){	
		this.$vm.$data =  new Proxy(data,{
			get(target,key){
				console.error(target,key,'gettt')
				return Reflect.get(target,key)
			},
			set(target,key,value){
				console.error(target,key,value,'setttt')
				let res = Reflect.set(target, key, value);
				return res;
			}
		})
		return this.$vm.$data
	}
	
	
	
	// proxyData(data:any={},vm:Vm){ //拦截data代理到vm的$data属性上
	// 	var dep = new Dep()
	// 	vm.$data = new Proxy(data,{
	// 		get(target,key){
	// 			console.error(dep,'gettt')
	// 			return Reflect.get(target,key)
	// 		},
	// 		set(target,key,value){
	// 			console.error(target,key,value,'setttt')
	// 			let res = Reflect.set(target, key, value);
	// 			return res;
	// 		}
	// 	})
	
	// }
	
	
	
}