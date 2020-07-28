import observer from './observer';
import compile from './compile';
import {Options} from './config/interface';
import {Vm} from './config/interface';


export default class Mvvm {
	public $options:Options;
	public _vm:any;
	
	constructor(options:Options){		
		let {el,data,methods} = options;
		this.$options = options;
		this.init();
		
		return this._vm //返回_vm属性
	
	}
	init(){
		let {data,el} = this.$options;
		new observer(data,this)  //参数data递归属性代理
		this.proxyVmData(data) //实例属性代理到实例的$data属性
		
		new compile(el)
		
	}
	proxyVmData(data:any){  //属性代理 用vm.property 代替 vm.$data.property
		let _this:Vm = this
		
		_this._vm = new Proxy(_this,{ //代理data,挂在到实例到_vm属性上面
			get(target,key){
				return  Reflect.get(target,key) || Reflect.get(_this.$data,key)
			},
			set(target,key,value){
				let res = Reflect.set(_this.$data, key, value);
				return res
			}
		})
	}
}