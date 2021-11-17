const viewPort = { "width": 80, "height": 25 }

let state = [ { x: 1,y: 0 },
 { x: 1, y: 1 },{x:1,"y":2}].map(JSON.stringify);

var getNeighbours = ({ x,y }) =>  [-1,0,1].flatMap((dx) => [-1,0,1].map((dy) => ({ x: x + dx, y: y + dy })))
        .filter(p => p.x !== x|| p.y !== y).map(JSON.stringify);

const countAliveNeighbours = (
                                p,
                                state
                              ) => getNeighbours(p)
                                 .filter(p => state.includes(p)).length;

const isAlive=(p,state)=>{
    const alive =   state.includes(JSON.stringify(p))
     const count = countAliveNeighbours(p, state)
    return alive
    ? [2, 3].includes(count) : count === 3
};

const print = () => {
  process.stdout.write("\033c");
  for (let y = 0; y < viewPort.height; y++)
  {
      for (let x = 0; x< viewPort.width; x++) {
        const alive = isAlive({x, y }, state);
        process.stdout.write(alive ?    "x" : ".");
  }
    process.stdout.write("\n");
}};

const next = (

) => {
  const candidates = new Set(state.flatMap((p) => [p,...getNeighbours(JSON.parse(p),state)]));
  state = [...candidates.values()].filter(p => isAlive(JSON.parse(p), state));
  print();
};

setInterval(next, 500
);
