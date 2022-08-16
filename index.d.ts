import { ExternalProvider } from '@ethersproject/providers';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

type FolderType = {
  id: string;
  name: string;
};

type NoteType = {
  id: string;
  name: string;
  slug: string;
  folder: string;
  tags: string;
  content: string;
};
