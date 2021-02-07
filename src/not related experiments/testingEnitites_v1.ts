export {};

type DepartmentName = 'it' | 'acc';
class Deppartment {
  name: DepartmentName;
  tasks: any[];
  constructor(name: DepartmentName) {
    this.name = name;
    this.tasks = [];
  }

  addTask(task: any) {
    this.tasks.push(task);
  }
}

class ITdeppartment extends Deppartment {
  functionName: string;
  constructor() {
    super('it');
    this.functionName = 'Information Technology';
  }

  checkNetwork(task: string) {
    console.log(`Checking ${task}`);
  }
}

class ACCdeppartment extends Deppartment {
  functionName: string;
  accounts: string[];
  constructor() {
    super('acc');
    this.functionName = 'Accounting';
    this.accounts = [];
  }

  addAccount(acc: string) {
    this.accounts.push(acc);
  }
}

type Departments = ITdeppartment | ACCdeppartment;
class Office {
  departments: Array<Departments>;

  it!: ITdeppartment;     //ts(2322) workaround
  acc!: ACCdeppartment;   //ts(2322) workaround

  constructor() {
    this.departments = [];
  }

  addDepartment(department: Departments) {
    this.departments.push(department);

    if(department instanceof ITdeppartment){ //ts(2322) workaround
      this.it = department;
    }
    if(department instanceof ACCdeppartment){ //ts(2322) workaround
      this.acc = department;
    }    
  }
}

const downTown = new Office();
downTown.addDepartment(new ITdeppartment());
downTown.addDepartment(new ACCdeppartment());

downTown.it.addTask('New IT Task');
downTown.it.checkNetwork('Office network');

downTown.acc.addTask('New ACC task');
downTown.acc.addAccount('Testing new account');
