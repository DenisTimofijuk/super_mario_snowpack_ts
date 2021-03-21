# Super Mario game

This is a well known Super Mario game recreated with TypeScript.  
  
Original tutorial: [Super Mario Bros in JavaScript](https://www.youtube.com/playlist?list=PLS8HfBXv9ZWWe8zXrViYbIM2Hhylx8DZx)


## Using Snowpack

- [Templates](https://github.com/snowpackjs/snowpack/tree/main/create-snowpack-app/cli)
- [snowpack-plugin-webpack5](https://www.npmjs.com/package/snowpack-plugin-webpack5)

## Comments
Currently I really not like how I managed traits adding with TypeScript. I would love to hear a better solutions for such case.  

```
 type TraitType = Jump | Go | PendulumMoove | GoombaBehaviour | Stomper | Killable | PlayerController | KoopaBehaviour | Solid | Physics;
 type TraitTypeTSworkaround = Jump & Go & PendulumMoove & GoombaBehaviour & Stomper & Killable & PlayerController & KoopaBehaviour & Solid & Physics;

 addTrait(trait: TraitType) {
    this.traits.push(trait);
    this[trait.NAME] = trait as TraitTypeTSworkaround;
  }
```
