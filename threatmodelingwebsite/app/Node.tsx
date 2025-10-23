export function Node({ name, level }: { name: string, level: string }) {

  if(level == "fortunate"){
      return (
      <div className=" bg-green-600 rounded-[20] border border-black border-2 px-2 max-w-[160] text-center break-words py-1">
        {name}
      </div>
    );
  } else {
    return (
      <div className=" bg-red-600 rounded-[20] border border-black border-2 px-2 max-w-[160] text-center break-words py-1">
        {name}
      </div>
    );
  }
}