import create from "zustand";
import axios from "./axios";
import { NoteType, FolderType } from "..";
import splitTags from "./utils/split-tags";
import { encryptData, decryptData } from "./utils/crypto";

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
    getAllNotes: (userSignature: string, signedKey: string) => void;
    addNote: (
      params: {
        name: string;
        slug: string;
        folder: string;
        user: string;
      },
      signedKey: string,
    ) => Promise<NoteType | null>;
    removeNote: (id: string) => void;
    updateNote: (
      id: string,
      params: Record<string, string>,
      signedKey: string,
    ) => void;
  };
  userFolders: {
    folders: FolderType[];
    getFolders: (userSignature: string, signedKey: string) => void;
    addFolder: (
      params: { name: string; user: string },
      signedKey: string,
    ) => void;
    removeFolder: (id: string) => void;
    updateFolder: (id: string, name: string, signedKey: string) => void;
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
    getAllNotes: async (userSignature: string, signedKey: string) => {
      const res = await axios.get(`notes?userSig=${userSignature}`);

      if (res.status !== 200) return;

      const decryptedNotes = res.data.notes.map((note: NoteType) => ({
        ...note,
        ...(note.name && {
          name: decryptData(note.name, signedKey),
          slug: decryptData(note.slug, signedKey),
        }),
        ...(note.tags && { tags: decryptData(note.tags, signedKey) }),
        ...(note.content && { content: decryptData(note.content, signedKey) }),
      }));

      set((state) => ({
        ...state,
        userNotes: { ...state.userNotes, allNotes: decryptedNotes },
      }));
    },
    addNote: async (
      params: {
        name: string;
        slug: string;
        folder: string;
        user: string;
      },
      signedKey: string,
    ): Promise<NoteType | null> => {
      const encryptedNote = {
        ...params,
        name: encryptData(params.name, signedKey),
        slug: encryptData(params.slug, signedKey),
      };
      const res = await axios.post("notes", encryptedNote);

      if (res.status !== 200) return null;

      const decryptedNote = { ...res.data.note, ...params };

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: [...state.userNotes.allNotes, decryptedNote],
        },
      }));

      return decryptedNote;
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
    updateNote: async (
      id: string,
      params: Record<string, string>,
      signedKey: string,
    ) => {
      const encryptedNote = {
        ...params,
        ...(params.name && {
          name: encryptData(params.name, signedKey),
          slug: encryptData(params.slug, signedKey),
        }),
        ...(params.tags && { tags: encryptData(params.tags, signedKey) }),
        ...(params.content && {
          content: encryptData(params.content, signedKey),
        }),
      };
      const res = await axios.put(`notes?id=${id}`, encryptedNote);

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
    getFolders: async (userSignature: string, signedKey: string) => {
      const res = await axios.get(`folders?userSig=${userSignature}`);

      if (res.status !== 200) return;

      const decryptedFolders = res.data.folders.map((folder: FolderType) => ({
        ...folder,
        ...(folder.name && {
          name: decryptData(folder.name, signedKey),
        }),
      }));

      set((state) => ({
        ...state,
        userFolders: { ...state.userFolders, folders: decryptedFolders },
      }));
    },
    addFolder: async (
      params: { name: string; user: string },
      signedKey: string,
    ) => {
      const encryptedNote = {
        user: params.user,
        name: encryptData(params.name, signedKey),
      };
      const res = await axios.post("folders", encryptedNote);

      if (res.status !== 200) return;

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: [
            ...state.userFolders.folders,
            { ...res.data.folder, ...params },
          ],
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
    updateFolder: async (id: string, name: string, signedKey: string) => {
      const res = await axios.put(`folders?id=${id}`, {
        name: encryptData(name, signedKey),
      });

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
