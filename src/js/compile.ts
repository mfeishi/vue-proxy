import {Vm,Utils} from './config/interface';
import Watcher from './watcher';
export default class Compile{  
	private $el:any;
	private $fragment:any;
	private $vm:Vm;
	constructor(el:string,vm:Vm){		
		this.$el = document.querySelector(el);
		this.$vm = vm;
		this.$fragment = this.copyDomToFragment(); //将DOM放入fragment中
		this.compileFragment(this.$fragment); //在fragment中编译模板
		this.$el.appendChild(this.$fragment)
	}
	copyDomToFragment(){
		let fragment = document.createDocumentFragment();
		let el = this.$el;
		let child;
		while(child = el.firstChild ){
			fragment.appendChild(child)
		}
		return fragment
	}
	compileFragment(el:any){ 
		let childNodes = el.childNodes;
		[...childNodes].forEach(node=>{
			const nodeType = node.nodeType
			const nodeText = node.textContent
			const reg = /\{\{(.*)\}\}/; // 表达式文本
			if(nodeType === 1){ //如果是元素节点
				this.compileElementNode(node)
				
			}else if(nodeType === 3&&reg.test(nodeText)){ //文本节点
				// console.error(node,node.nodeType,RegExp.$1)
				this.compileTextNode(node,RegExp.$1)
			}
			if(node.childNodes && node.childNodes.length){
				this.compileFragment(node)
			}
			
		})
	}
	compileElementNode(node:HTMLElement){ //解析元素节点
		// console.error(node,node.attributes,'noddd')
		let nodeAttrs = node.attributes;
		[...nodeAttrs].forEach(attr=>{	
			const attrName = attr.name
			const attrValue = attr.value
			if(attrName.includes('v-')){ //如果是指令
				const directiveName = attrName.substring(2);
				if(directiveName.includes('on')){ //如果是事件指令
					utils.eventHandler(directiveName,attrValue,node,this.$vm);
				}else{ //如果是普通指令
					// console.error(directiveName,utils[directiveName],'directiveName')
					utils[directiveName](directiveName,attrValue,node,this.$vm)
				}
			}

		})
	}
	compileTextNode(node:string,attrValue:string){//解析文本节点
		utils.text('text',attrValue,node,this.$vm)
	}
	
	
}



const utils:Utils = {
	eventHandler(directiveName:string,attrValue:string,node:HTMLElement,vm:Vm){	
		const eventName = directiveName.split(':')[1]
		if(eventName){ //事件指令的处理
			// console.error(eventName,attrValue,node,vm,eventName,vm.$options.methods)		
			const eventCallBack = vm.$options.methods&&vm.$options.methods[attrValue]
			node.addEventListener(eventName,eventCallBack.bind(vm),false)
		}
	},
	text(directiveName:string,attrValue:string,node:HTMLElement,vm:Vm){
		this.initWatcher(directiveName,attrValue,node,vm)
	},
	initWatcher(directiveName:string,attrValue:string,node:HTMLElement,vm:Vm){
		const upDateFn = upDater[directiveName]
		const vmValue = this.getVmValue(attrValue,vm)
		upDateFn(node,vmValue)
		new Watcher(vm,attrValue,function(value:any,oldvalue:any){
			upDateFn(node,value)
		})
		// const vmDirectiveValue = vm[attrValue]
		// node.textContent = vmDirectiveValue
	},
	getVmValue(attrValue:string,vm:Vm){
		return vm[attrValue]
	}
}

const upDater:any = {
	text: function(node:HTMLElement, attrValue:string) {
        node.textContent = typeof attrValue == 'undefined' ? '' : attrValue;
    },	


}