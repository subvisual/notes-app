import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

type FolderType = {
  id: string;
  name: string;
};

type SimpleNoteType = {
  id: string;
  name: string;
  folder: string;
  tags: string;
};

type NoteType = {
  id: string;
  name: string;
  content: string;
  slug: string;
  tags: string;
  folder: string;
};
