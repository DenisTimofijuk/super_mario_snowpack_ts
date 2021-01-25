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
    this[trait.NAME] = trait;
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

  run() {
    console.log('run');
  }
}
