import observer from './observer';


interface Options {
	el:string,
	data:any,
	methods?:object
}

export default class Mvvm {
	public $options:Options;
	
	constructor(options:Options){		
		let {el,data,methods} = options;

		this.$options = options
		
		new observer(data,this)
	}
	
	
	
	
	
}