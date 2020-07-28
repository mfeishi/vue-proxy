export default class Compile{  
	private $el:any;
	private $fragment:any;
	constructor(el:string){		
		this.$el = document.querySelector(el)
		this.$fragment = this.copyDomToFragment() //将DOM放入fragment中
		this.compileFragment(this.$fragment) //在fragment中编译模板
		
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
			
			let nodeType = node.nodeType
			let reg = /\{\{(.*)\}\}/; // 表达式文本
			if(nodeType === 1){ //如果是元素节点
				
			}else if(nodeType === 3){
				console.error(node,node.nodeType)
				
			}
			if(node.childNodes && node.childNodes.length){
				
			}
			
		})
	}
	
	
}