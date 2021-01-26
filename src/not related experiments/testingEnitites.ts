export {}
class Office {
  departments: Deppartment[];
  it?: ITdeppartment;
  acc?: ACCdeppartment;
  constructor(){
      this.departments = [];
  }

  addDepartment(department: Deppartment){
      this.departments.push(department);
      this[department.name] = department;
  }
}

class Deppartment{
  name: 'it' | 'acc';
  tasks: any[];
  constructor(name: 'it' | 'acc'){
      this.name = name;
      this.tasks = []
  }

  addTask(task:any){
      this.tasks.push(task);
  }

}

class ITdeppartment extends Deppartment{
  functionName: string;
constructor() {
    super('it');
    this.functionName = "Information Technology";
  }

  checkNetwork(task:string){
    console.log(`Checking ${task}`);
  }

}

class ACCdeppartment extends Deppartment{
  functionName: string;
  accounts: string[];
constructor() {
    super('acc');
    this.functionName = "Accounting";
    this.accounts = []
  }

  addAccount(acc:string){
    this.accounts.push(acc);
  }
}

const downTown = new Office()
downTown.addDepartment(new ITdeppartment());
downTown.addDepartment(new ACCdeppartment());

downTown.it && downTown.it.addTask("New IT Task");
downTown.it && downTown.it.checkNetwork("Office network");

downTown.acc && downTown.acc.addTask("New ACC task");
downTown.acc && downTown.acc.addAccount("Testing new account");