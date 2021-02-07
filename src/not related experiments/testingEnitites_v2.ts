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
  trait: {[key in DepartmentName]: Departments} = <any>{};

  constructor() {
    this.departments = [];
  }

  addDepartment<T extends Departments>(Department: T) {
    this.departments.push(Department);
    // this[Department.name] = Department as ITdeppartment & ACCdeppartment; //Working workaround, but would like to have something smarter


    // this[Department.name] = Department; // <= ERROR ts(2322)
    this.trait[Department.name] = Department;
  }
}

const downTown = new Office();
downTown.addDepartment<ITdeppartment>(new ITdeppartment());
// downTown.addDepartment<ACCdeppartment>(new ACCdeppartment());

downTown.trait.it.functionName

// downTown.it.addTask('New IT Task');
// downTown.it.checkNetwork('Office network');

// downTown.acc.addTask('New ACC task');
// downTown.acc.addAccount('Testing new account');
