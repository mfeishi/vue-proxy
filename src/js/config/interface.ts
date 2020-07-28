export interface Vm { //MVVM实例
	$options:any,
	[propName: string]: any
	
}

export interface Options { //MVVM参数
	el:string,
	data?:any,
	methods?:object
}