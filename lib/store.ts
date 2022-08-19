import create from "zustand";
import axios from "./axios";
import { NoteType, FolderType } from "..";
import splitTags from "./utils/split-tags";

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
    allNotes: NoteType[];
    getAllNotes: (userSignature: string) => void;
    addNote: (params: {
      name: string;
      slug: string;
      folder: string;
      user: string;
    }) => Promise<NoteType | null>;
    removeNote: (id: string) => void;
    updateNote: (id: string, params: Record<string, string>) => void;
  };
  userFolders: {
    folders: FolderType[];
    getFolders: (userSignature: string) => void;
    addFolder: (params: { name: string; user: string }) => void;
    removeFolder: (id: string) => void;
    updateFolder: (id: string, name: string) => void;
  };
  userTags: {
    tags: string[];
    setTags: () => void;
  };
  session: {
    isConnected: boolean;
    setIsConnected: (bool: boolean) => void;
    openNote: NoteType | null;
    setOpenNote: (note: NoteType | null) => void;
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
    getAllNotes: async (userSignature: string) => {
      const res = await axios.get(`notes?userSig=${userSignature}`);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userNotes: { ...state.userNotes, allNotes: res.data.notes },
      }));
    },
    addNote: async (params: {
      name: string;
      slug: string;
      folder: string;
      user: string;
    }): Promise<NoteType | null> => {
      const res = await axios.post("notes", params);

      if (res.status !== 200) return null;

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: [...state.userNotes.allNotes, res.data.note],
        },
      }));

      return res.data.note;
    },
    removeNote: async (id: string) => {
      const res = await axios.delete(`notes?id=${id}`);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.filter((note) => note.id !== id),
        },
      }));
    },
    updateNote: async (id: string, params: Record<string, string>) => {
      const res = await axios.put(`notes?id=${id}`, params);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.map((note) =>
            note.id === id ? { ...note, ...params } : note,
          ),
        },
      }));
    },
  },
  userFolders: {
    folders: [],
    getFolders: async (userSignature: string) => {
      const res = await axios.get(`folders?userSig=${userSignature}`);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userFolders: { ...state.userFolders, folders: res.data.folders },
      }));
    },
    addFolder: async (params: { name: string; user: string }) => {
      const res = await axios.post("folders", params);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: [...state.userFolders.folders, res.data.folder],
        },
      }));
    },
    removeFolder: async (id: string) => {
      const res = await axios.delete(`folders?id=${id}`);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: state.userFolders.folders.filter(
            (folder) => folder.id !== id,
          ),
        },
      }));
    },
    updateFolder: async (id: string, name: string) => {
      const res = await axios.put(`folders?id=${id}`, { name });

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: state.userFolders.folders.map((folder) =>
            folder.id === id ? { ...folder, name } : folder,
          ),
        },
      }));
    },
  },
  userTags: {
    tags: [],
    setTags: () =>
      set((state) => {
        const tags = state.userNotes.allNotes.reduce(
          (previousTags, currentNote) => {
            if (!currentNote.tags) return [...previousTags];

            return [
              ...previousTags,
              ...splitTags(currentNote.tags).filter(
                (tag) => !previousTags.includes(tag),
              ),
            ];
          },
          [] as string[],
        );

        return {
          ...state,
          userTags: { ...state.userTags, tags },
        };
      }),
  },
  session: {
    isConnected: false,
    setIsConnected: (bool: boolean) =>
      set((state) => ({
        ...state,
        session: { ...state.session, isConnected: bool },
      })),
    openNote: null,
    setOpenNote: (note: NoteType | null) =>
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
