import Canvas from "@/modules/fundamentals/fundamentals/Canvas";
import fragment from "@/modules/fundamentals/fundamentals/shaders/fragment.glsl";
import vertex from "@/modules/fundamentals/fundamentals/shaders/vertex.glsl";

export default function DrawImages() {
  return (
    <>
      <Canvas fragmentShader={fragment} vertexShader={vertex} />
    </>
  );
}
