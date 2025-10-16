export function Node({ name }: { name: string }) {
    return (
    <div className=" bg-blue-300 rounded-[20] border border-black border-2 px-2 max-w-[160] text-center break-words py-1">
      {name}
    </div>
  );
}