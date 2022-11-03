import { NullPointerException } from "@/lib/error";
import { useEffect, useRef } from "react";

type Props = {
  vertexShader: string;
  fragmentShader: string;
};

export default function Canvas({
  vertexShader: vertexShaderIn,
  fragmentShader: fragmentShaderIn,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const gl = ref.current?.getContext("webgl");
    if (gl == null) throw new NullPointerException();

    const vertexShaderSource = vertexShaderIn;
    const fragmentShaderSource = fragmentShaderIn;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (vertexShader == null || fragmentShader == null)
      throw new NullPointerException();

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (program == null) throw new NullPointerException();
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [0, 0, 0, 0.5, 0.7, 0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2; // 2 components per iteration
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    let offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // draw
    const primitiveType = gl.TRIANGLES;
    offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
  });
  return <canvas ref={ref} width={1900} height={1000} />;
}

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (shader == null) throw new NullPointerException();
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  if (program == null) throw new NullPointerException();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
