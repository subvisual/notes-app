import { ChangeEvent, FormEvent } from "react";
import { useStore } from "../lib/store";
import SearchSVG from "../assets/search.svg";

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
      className="mt-4 flex w-full items-center justify-between rounded-full bg-light-1 px-2 text-dark-1 shadow-input-light dark:bg-light-4 dark:shadow-none"
    >
      <SearchSVG className="h-5 w-5 fill-current" />
      <input
        className="w-full bg-transparent pl-1 outline-none"
        onChange={handleChange}
        type="text"
      />
      <input
        className={`border-none ${!searchTerm && "invisible"}`}
        type="reset"
        value="&#x2715;"
      />
    </form>
  );
}
