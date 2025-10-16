export function Node({ name }: { name: string }) {
    return (
    <div className=" bg-blue-300 rounded-full border border-blue-800 px-2">
      {name}
    </div>
  );
}