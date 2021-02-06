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

  it!: ITdeppartment;     //Current workaround
  acc!: ACCdeppartment;   //Current workaround
  // [key: string]: any;  // <= Don't like this

  constructor() {
    this.departments = [];
  }

  addDepartment<T extends Departments>(Department: T) {
    this.departments.push(Department);
    // this[Department.name] = Department as ITdeppartment & ACCdeppartment; //Working workaround, but would like to have something smarter


    /**
      Type 'T' is not assignable to type 'ITdeppartment & ACCdeppartment'.
        Type 'Departments' is not assignable to type 'ITdeppartment & ACCdeppartment'.
          Type 'ITdeppartment' is not assignable to type 'ITdeppartment & ACCdeppartment'.
            Type 'ITdeppartment' is missing the following properties from type 'ACCdeppartment': accounts, addAccount
              Type 'T' is not assignable to type 'ITdeppartment'.
                Type 'Departments' is not assignable to type 'ITdeppartment'.
                  Property 'checkNetwork' is missing in type 'ACCdeppartment' but required in type 'ITdeppartment'. ts(2322)
     */
    this[Department.name] = Department; // <= ERROR ts(2322)
  }
}

const downTown = new Office();
downTown.addDepartment<ITdeppartment>(new ITdeppartment());
downTown.addDepartment<ACCdeppartment>(new ACCdeppartment());

downTown.it.addTask('New IT Task');
downTown.it.checkNetwork('Office network');

downTown.acc.addTask('New ACC task');
downTown.acc.addAccount('Testing new account');
