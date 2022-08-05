import create from "zustand";
import { SimpleNoteType, FolderType } from "..";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

type UseStore = {
  user: {
    userSig: string;
    signedKey: string;
    setUserSig: (userSig: string) => void;
    setSignedKey: (signedKey: string) => void;
  };
  userNotes: {
    allNotes: SimpleNoteType[];
    setAllNotes: (notes: SimpleNoteType[]) => void;
    addNote: (note: SimpleNoteType) => void;
    removeNote: (noteId: string) => void;
    modifyNote: (params: Record<string, string>, id: string) => void;
  };
  userFolders: {
    folders: FolderType[];
    setFolders: (folders: FolderType[]) => void;
    addFolder: (folder: FolderType) => void;
    removeFolder: (folderId: string) => void;
  };
  userTags: {
    tags: string[];
    setTags: (tags: string[]) => void;
  };
  session: {
    isConnected: boolean;
    setIsConnected: (bool: boolean) => void;
    openNote: SimpleNoteType | null;
    setOpenNote: (note: SimpleNoteType) => void;
  };
  preferences: {
    theme: Theme;
    setTheme: (theme: Theme) => void;
  };
};

export const useStore = create<UseStore>()((set) => ({
  user: {
    userSig: "",
    signedKey: "",
    setUserSig: (userSig: string) =>
      set((state) => ({ ...state, user: { ...state.user, userSig } })),
    setSignedKey: (signedKey: string) =>
      set((state) => ({ ...state, user: { ...state.user, signedKey } })),
  },
  userNotes: {
    allNotes: [],
    setAllNotes: (notes: SimpleNoteType[]) =>
      set((state) => ({
        ...state,
        userNotes: { ...state.userNotes, allNotes: notes },
      })),
    addNote: (note: SimpleNoteType) =>
      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: [...state.userNotes.allNotes, note],
        },
      })),
    removeNote: (noteId: string) =>
      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.filter(
            (note) => note.id !== noteId,
          ),
        },
      })),
    modifyNote: (params: Record<string, string>, id: string) =>
      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.map((note) =>
            note.id === id ? { ...note, ...params } : note,
          ),
        },
      })),
  },
  userFolders: {
    folders: [],
    setFolders: (folders: FolderType[]) =>
      set((state) => ({
        ...state,
        userFolders: { ...state.userFolders, folders },
      })),
    addFolder: (folder: FolderType) =>
      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: [...state.userFolders.folders, folder],
        },
      })),
    removeFolder: (folderId: string) =>
      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: state.userFolders.folders.filter(
            (folder) => folder.id !== folderId,
          ),
        },
      })),
  },
  userTags: {
    tags: [],
    setTags: (tags: string[]) =>
      set((state) => ({
        ...state,
        userTags: { ...state.userTags, tags },
      })),
  },
  session: {
    isConnected: false,
    setIsConnected: (bool: boolean) =>
      set((state) => ({
        ...state,
        session: { ...state.session, isConnected: bool },
      })),
    openNote: null,
    setOpenNote: (note: SimpleNoteType) =>
      set((state) => ({
        ...state,
        session: { ...state.session, openNote: note },
      })),
  },
  preferences: {
    theme: Theme.Dark,
    setTheme: (theme: Theme) =>
      set((state) => ({
        ...state,
        preferences: { ...state.preferences, theme },
      })),
  },
}));
