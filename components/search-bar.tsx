import { createRef, ChangeEvent } from "react";
import { useStore } from "../lib/store";

export default function SearchBar() {
  const {
    search: { setSearchTerm, searchTerm },
  } = useStore();
  const ref = createRef<HTMLInputElement>();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(ev.target.value.toLocaleLowerCase());
  };

  const reset = () => setSearchTerm("");

  return (
    <form onReset={reset} className="flex bg-white w-full justify-between">
      <input
        ref={ref}
        className="bg-transparent w-full"
        onChange={handleChange}
        value={searchTerm}
        type="text"
      />
      <input className="border-none p-0 m-0" type="reset" value="&#x2715;" />
    </form>
  );
}
