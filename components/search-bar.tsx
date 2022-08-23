import { ChangeEvent, FormEvent } from "react";
import { useStore } from "../lib/store";

export default function SearchBar() {
  const {
    search: { setSearchTerm },
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
      className="my-5 flex w-full justify-between rounded-full bg-light-1 px-2 text-dark-1 shadow-[0_0px_15px_-5px_rgba(0,0,0,.25)] dark:bg-light-4 dark:shadow-none"
    >
      <input
        className="w-full bg-transparent outline-none"
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
