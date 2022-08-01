import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

type FolderType = {
  id: string;
  name: string;
  user: string;
};

type SimpleNoteType = {
  id: string;
  name: string;
  folder: string;
};

type NoteType = {
  id: string;
  name: string;
  user: string;
  content: string;
  slug: string;
  tags: string;
  folder: string;
};
