import create from "zustand";
import axios from "./axios";
import { NoteType, FolderType } from "..";
import splitTags from "./utils/split-tags";
import { encryptData, decryptData } from "./utils/crypto";

export enum Theme {
  Light = "light",
  Dark = "dark",
}

type SessionStatus = "loading" | "error" | "ok" | "idle";

type UseStore = {
  user: {
    userSig: string;
    signedKey: string;
    setUserSig: (userSig: string) => void;
    setSignedKey: (signedKey: string) => void;
  };
  userNotes: {
    allNotes: NoteType[];
    getAllNotes: (userSignature: string, signedKey: string) => Promise<boolean>;
    addNote: (
      params: {
        name: string;
        slug: string;
        folder: string;
        user: string;
      },
      signedKey: string,
    ) => Promise<NoteType | false>;
    removeNote: (id: string) => Promise<boolean>;
    updateNote: (
      id: string,
      params: Record<string, string>,
      signedKey: string,
    ) => Promise<boolean>;
  };
  userFolders: {
    folders: FolderType[];
    getFolders: (userSignature: string, signedKey: string) => Promise<boolean>;
    addFolder: (
      params: { name: string; user: string },
      signedKey: string,
    ) => Promise<boolean>;
    removeFolder: (id: string) => Promise<boolean>;
    updateFolder: (
      id: string,
      name: string,
      signedKey: string,
    ) => Promise<boolean>;
  };
  userTags: {
    tags: string[];
    setTags: () => void;
  };
  search: {
    searchTerm: string;
    setSearchTerm: (str: string) => void;
  };
  session: {
    isConnected: boolean;
    setIsConnected: (bool: boolean) => void;
    openNote: NoteType | null;
    setOpenNote: (note: NoteType | null) => void;
    status: SessionStatus;
    statusMessage: string;
    setStatus: (status: SessionStatus, message?: string) => void;
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

      if (res.status !== 200) {
        return false;
      }

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

      return true;
    },
    addNote: async (
      params: {
        name: string;
        slug: string;
        folder: string;
        user: string;
      },
      signedKey: string,
    ): Promise<NoteType | false> => {
      const encryptedNote = {
        ...params,
        name: encryptData(params.name, signedKey),
        slug: encryptData(params.slug, signedKey),
      };
      const res = await axios.post("notes", encryptedNote);

      if (res.status !== 200) {
        return false;
      }

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

      if (res.status !== 200) {
        return false;
      }

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.filter((note) => note.id !== id),
        },
      }));

      return true;
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
        content: encryptData(params.content || "", signedKey),
      };
      const res = await axios.put(`notes?id=${id}`, encryptedNote);

      if (res.status !== 200) {
        return false;
      }

      set((state) => ({
        ...state,
        userNotes: {
          ...state.userNotes,
          allNotes: state.userNotes.allNotes.map((note) =>
            note.id === id ? { ...note, ...params } : note,
          ),
        },
      }));

      return true;
    },
  },

  userFolders: {
    folders: [],
    getFolders: async (userSignature: string, signedKey: string) => {
      const res = await axios.get(`folders?userSig=${userSignature}`);

      if (res.status !== 200) {
        return false;
      }

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

      return true;
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

      if (res.status !== 200) {
        return false;
      }

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

      return true;
    },
    removeFolder: async (id: string) => {
      const res = await axios.delete(`folders?id=${id}`);

      if (res.status !== 200) {
        return false;
      }

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: state.userFolders.folders.filter(
            (folder) => folder.id !== id,
          ),
        },
      }));

      return true;
    },
    updateFolder: async (id: string, name: string, signedKey: string) => {
      const res = await axios.put(`folders?id=${id}`, {
        name: encryptData(name, signedKey),
      });

      if (res.status !== 200) {
        return false;
      }

      set((state) => ({
        ...state,
        userFolders: {
          ...state.userFolders,
          folders: state.userFolders.folders.map((folder) =>
            folder.id === id ? { ...folder, name } : folder,
          ),
        },
      }));

      return true;
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

  search: {
    searchTerm: "",
    setSearchTerm: (str: string) =>
      set((state) => ({
        ...state,
        search: { ...state.search, searchTerm: str },
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
    setOpenNote: (note: NoteType | null) =>
      set((state) => ({
        ...state,
        session: { ...state.session, openNote: note },
      })),
    status: "idle",
    statusMessage: "",
    setStatus: (status: SessionStatus, message?: string) =>
      set((state) => ({
        ...state,
        session: {
          ...state.session,
          status,
          statusMessage: message || "",
        },
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
