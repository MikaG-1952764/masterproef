export function Node({ name, level }: { name: string, level: string }) {

  if(level == "fortunate"){
      return (
      <div>
        <div className=" bg-gray-200 rounded-[20] border border-black border-2 px-2 min-w-[60] max-w-[500] max-h-[200] text-center text-black break-words py-1">
          {name}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className=" bg-gray-200 rounded-[20] border border-black border-2 px-2 min-w-[60] max-w-[500] max-h-[200] text-center text-black break-words py-1">
          {name}
        </div>
      </div>
    );
  }
}