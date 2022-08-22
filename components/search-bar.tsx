import { ChangeEvent, FormEvent } from "react";
import { useStore } from "../lib/store";

export default function SearchBar() {
  const {
    search: { setSearchTerm, searchTerm },
  } = useStore();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(ev.target.value.toLocaleLowerCase());
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
  };

  const reset = () => setSearchTerm("");

  return (
    <form
      onReset={reset}
      onSubmit={handleSubmit}
      className="flex w-full justify-between bg-white"
    >
      <input
        className="w-full bg-transparent"
        onChange={handleChange}
        value={searchTerm}
        type="text"
      />
      <input className="m-0 border-none p-0" type="reset" value="&#x2715;" />
    </form>
  );
}
