import Canvas from "@/pagesComponents/fundamentals/fundamentals/Canvas";
import fragment from "@/pagesComponents/fundamentals/fundamentals/shaders/fragment.glsl";
import vertex from "@/pagesComponents/fundamentals/fundamentals/shaders/vertex.glsl";

export default function DrawImages() {
  return (
    <>
      <Canvas fragmentShader={fragment} vertexShader={vertex} />
    </>
  );
}
