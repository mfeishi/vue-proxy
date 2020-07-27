import Mvvm from './js/mvvm';



var vm = new Mvvm({
	el:"#app",
	data:{
		age:111,
		name:'hema'
	}
})

// console.error(vm.$options.data.age)
