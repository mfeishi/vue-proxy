import {Vm} from './config/interface';
import Dep from './dep';
let wid = 0;

export default class Watcher{
    public wid:number;
    private vm:Vm;
    private attrValue:string;
    private fn:any;
    private oldValue:any;
    constructor(vm:Vm,attrValue:string,fn:any){
        this.vm = vm;
        this.attrValue = attrValue;
        this.fn = fn;
        this.wid = wid++;
        this.oldValue = this.get();
     
    }
    update(){
        let vm =this.vm;
        let oldValue = this.oldValue;
        let newValue = this.get();
        if (oldValue !== newValue) {
            this.fn.call(vm,newValue,oldValue)
        }
    }
    get(){
        Dep.target = this;
        let vm = this.vm;
        let attrValue = this.attrValue;
        let value = vm[attrValue]
        Dep.target = null;
        return value;
    }
    addDep(dep:any){
        dep.addSub(this)
    }




}