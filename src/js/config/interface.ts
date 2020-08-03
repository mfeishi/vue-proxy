export interface Vm { //MVVM实例
	$options:any,
	[propName: string]: any
	
}

export interface Options { //MVVM参数
	el:string,
	data?:any,
	methods?:object
}

export interface Utils{ 
	eventHandler(directiveName:string,attrValue:string,node:HTMLElement,vm:Vm):any,
	[propName: string]: any

}