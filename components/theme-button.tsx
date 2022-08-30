import { useStore, Theme } from "../lib/store";
import SunSVG from "../assets/sun.svg";
import MoonSVG from "../assets/moon.svg";

export default function ThemeButton() {
  const {
    preferences: { theme, setTheme },
  } = useStore();

  const toggleTheme = () => {
    setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
  };

  return (
    <button
      type="button"
      title="Change theme"
      onClick={toggleTheme}
      className="h-8 w-8 overflow-hidden rounded-md bg-light-1 drop-shadow-connect-light  dark:bg-dark-1 dark:shadow-none"
    >
      <span className="flex -translate-y-7 flex-col items-center gap-2 transition-all ease-out dark:translate-y-1">
        <MoonSVG className="h-6 w-6 stroke-light-3 stroke-2" />
        <SunSVG className="h-6 w-6 stroke-dark-3 stroke-1" />
      </span>
    </button>
  );
}
