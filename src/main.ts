import Mvvm from './js/mvvm';
import {Vm} from './js/config/interface';


let vm:Vm = new Mvvm({
	el:"#app",
	data:{
		age:111,
		name:'hema',
		list:['www','eeeee'],
		obj:{
			tx:3333,
			mm:444
		}
	}
})
console.error(vm,vm.$options,'vvvvvvmmmmm')
// vm.age = 4444
// console.error(vm.age)

// vm.list.push(333)
// console.error(vm.list)

// vm.$data.list.push(111)