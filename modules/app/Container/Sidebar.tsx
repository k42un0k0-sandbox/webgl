import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import { pagesPath } from "@/lib/$path";
import Link from "next/link";
import { UrlObject } from "url";

export default function Sidebar() {
  return (
    <div>
      <Right />
      <Left />
      <Tree name={"fundamentals"} parent={pagesPath} />
    </div>
  );
}

interface TreeObject {
  $url?: (url?: { hash?: string }) => UrlObject;
  [key: string]:
    | TreeObject
    | ((url?: { hash?: string }) => UrlObject)
    | undefined;
}
type TreeProps = { name: string; parent: TreeObject };
function Tree({ name, parent }: TreeProps) {
  const tree = parent[name] as TreeObject;
  return (
    <div>
      {Object.keys(tree).length === 1 && tree.$url != null ? (
        <Link href={tree.$url!()}>{name}</Link>
      ) : (
        Object.keys(tree).map((key, i) => {
          if (key === "$url") {
            return;
          }
          return (
            <div key={i}>
              <TreeTitle title={name} href={tree.$url?.()} />
              <Tree name={key} parent={tree} />
            </div>
          );
        })
      )}
    </div>
  );
}

type TreeTitleProps = {
  title: string;
  href?: UrlObject;
};
function TreeTitle({ title, href }: TreeTitleProps) {
  return href == null ? <div>{title}</div> : <Link href={href}>{title}</Link>;
}
