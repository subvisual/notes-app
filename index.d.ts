import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

type UserType = {
  id: string;
  signature: string;
  key: string;
};

type FolderType = {
  id: string;
  name: string;
  user: string;
};

type NoteType = {
  id: string;
  name: string;
  slug: string;
  folder: string;
  tags: string;
  content: string;
  user: string;
};
