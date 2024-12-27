import Matter from "matter-js";

const { Engine, Bodies, Composite, Runner, Render } = Matter;

// export const bodies: Writable<Matter.Body[]> = writable([]);
export const engine: Matter.Engine = Engine.create();
export const shapes: Matter.Body[] = [];

export const engineSettings: EngineSettings = $state({
  timeScale: 1,
  timeState: true,
  gravityScale: 0.001,
  gravityX: 0,
  gravityY: 1
});

type shapeStats = { id: number; type: 'Static' | 'Dynamic'; name: string; fillStyle: string; x: number; y: number; };

export const shapeStats: { id: number; name: string; x: number; y: number; fillStyle: string; }[] = $state([]);

export function start(render: Matter.Render) {
  const canvasWidth = render.canvas.width;
  const canvasHeight = render.canvas.height;

  drawGround(canvasWidth, canvasHeight);
  drawLeftWall(canvasWidth, canvasHeight);
  drawRightWall(canvasWidth, canvasHeight);
  drawCeiling(canvasWidth);

  Render.run(render);

  Composite.add(engine.world, [createMouseConstraint(render.canvas)]);

  const runner = Runner.create();
  Runner.run(runner, engine);
}

export function addNewObject(bodies: Matter.Body[]) {
  bodies.forEach((body) => {
    shapes.push(body);
    Composite.add(engine.world, [body]);
    shapeStats.push({ id: body.id, name: body.plugin.name, type: body.isStatic ? 'Static' : 'Dynamic', x: body.position.x, y: body.position.y, fillStyle: body.render.fillStyle });
  })
}

function drawObjects() {
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      addNewObject([Bodies.circle(i * 300, j * 200, 50, { friction: 0.1, restitution: 1 })]);
      addNewObject([Bodies.rectangle(i * 200, 200, 60, 60, { restitution: 1, friction: 0.1 })]);
    }
  }
}

function createMouseConstraint(canvas: HTMLCanvasElement) {
  const mouse = Matter.Mouse.create(canvas);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.01,
      damping: 0.1
    }
  });

  return mouseConstraint;
}

function drawGround(canvasWidth: number, canvasHeight: number) {
  addNewObject([Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 60, {
    isStatic: true,
    render: {
      fillStyle: '#00700f',
      strokeStyle: 'black'
    },
    plugin: { name: 'Ground' }
  })])
}

function drawLeftWall(canvasWidth: number, canvasHeight: number) {
  addNewObject([Bodies.rectangle(
    canvasWidth,
    canvasHeight / 2,
    60,
    canvasHeight,
    {
      isStatic: true
    }
  )]);
}

function drawRightWall(canvasWidth: number, canvasHeight: number) {
  addNewObject([Bodies.rectangle(0, canvasHeight / 2, 60, canvasWidth, {
    isStatic: true
  })]);
}

function drawCeiling(canvasWidth: number) {
  addNewObject([Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 60, {
    isStatic: true
  })]);
}
