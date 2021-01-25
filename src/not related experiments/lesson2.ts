export {};

type TemplateName = 'jump' | 'run';

class ParentClass {
  usedTemplates: TemplateClass[];
  jump!: UsingTemplateJump;
  run!: UsingTemplateRun;
  constructor() {
    this.usedTemplates = [];
  }

  addTrait(trait: TemplateClass) {
    this.usedTemplates.push(trait);

    //-TS.ERROR-->>
    // Type 'TemplateClass' is not assignable to type 'never'. 
    // The intersection 'UsingTemplateJump & UsingTemplateRun' was reduced to 'never' because property 'UsingTemplate_variable_1' exists in multiple constituents and is private in some.ts(2322)
    this[trait.NAME] = trait;
    //-TS.ERROR--<<
  }
}

class TemplateClass {
  NAME: TemplateName;
  constructor(name: TemplateName) {
    this.NAME = name;
  }

  update() {
    console.log('Unhandled tempate request.');
  }
}

class UsingTemplateJump extends TemplateClass {
  private UsingTemplate_variable_1: number;
  private UsingTemplate_variable_2: number;
  private UsingTemplate_variable_3: number;
  private UsingTemplate_variable_4: number;
  constructor() {
    super('jump');
    this.UsingTemplate_variable_1 = 0;
    this.UsingTemplate_variable_2 = 0;
    this.UsingTemplate_variable_3 = 0;
    this.UsingTemplate_variable_4 = 0;
  }

  start() {
    console.log('start');
  }

  end() {
    console.log('end');
  }
}

class UsingTemplateRun extends TemplateClass {
  private UsingTemplate_variable_1: number;
  private UsingTemplate_variable_2: number;
  private UsingTemplate_variable_3: number;
  private UsingTemplate_variable_4: number;
  constructor() {
    super('run');
    this.UsingTemplate_variable_1 = 0;
    this.UsingTemplate_variable_2 = 0;
    this.UsingTemplate_variable_3 = 0;
    this.UsingTemplate_variable_4 = 0;
  }

  init() {
    console.log('run');
  }
}

// End goal:
// const example = new ParentClass();
// example.jump.start()
// example.run.init()