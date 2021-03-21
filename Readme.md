# Overflowed

Lil' Component that acts as a draggable container while filtering tap (click/touch) so that user can interact with 'children' elements. It's build upon the shoulder of giants with **react-use-gesture** and **react-spring**. Typescript, Rollup.

[Codesandbox example](https://codesandbox.io/s/overflowed-example-0-5ng3f?file=/src/App.tsx)

## Use it

```javascript
const overflowAt = 600;
// ...
return (
    <Overflowed overflowedWidth={overflowAt}>
        <h1>HELLO DARKNESS MY OLD FRIEND </h1>
    </Overflowed>
);
```

Tips:

If **children** are/contain interactive elements (button, link...) you may want to add some extra padding at the bottom of the component with **className** so that user can drag easier without maybe triggering unwanted interactions.

## Props

| Prop name       | Accepts |   Default |
| :-------------- | :-----: | --------: |
| children        |   any   | undefined |
| className       | string  | undefined |
| maskClassName   | string  | undefined |
| progressBar     | boolean |     false |
| overflowedWidth | number  | undefined |
| controls        | \* see  |  \* below |

**overflowedWidth** is the only prop required (along **children** ofc), you must specify an estimation of the width of the 'overflowed container'. If in doubt, add some more px to the initial width you had in mind.

**controls** prop is a Render Prop that gives you access to a couple of methdos (**getProgress**, **setProgress**) so that you can manipulate overflowed from the 'outside'.

**className** adds it to the 'overflowed' container, the immediate parent of **children**. **MaskClassName** props adds it to the outer wrapper, a 'div' with 'overflow-x:hidden'.

**progressBar** is experimental, it shows 'overflowed' current position.

## Install

```bash

npm i react-overflowed

```
