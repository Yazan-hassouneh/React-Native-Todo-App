import { TodoId } from "@/types/todoTypes";
import { createContext, ReactNode, useState } from "react";

interface EditTodoContextType {
    openItems: Record<TodoId, boolean>,
    toggle: (id: TodoId) => void,
    editingText: string,
    setEditingText: React.Dispatch<React.SetStateAction<string>>,
    editingId: TodoId | null,
    setEditingId: React.Dispatch<React.SetStateAction<TodoId | null>>
}

export const EditTodoContext = createContext<EditTodoContextType | undefined>(undefined);

export const EditTodoProvider = ({ children }: { children: ReactNode }) => {
    const [openItems, setOpenItems] = useState<Record<TodoId, boolean>>({})
    const [editingText, setEditingText] = useState<string>("")
    const [editingId, setEditingId] = useState<TodoId | null>(null)

    const toggle = (id: TodoId) => {
        setOpenItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (
        <EditTodoContext.Provider value={{ openItems, toggle, editingText, setEditingText, editingId, setEditingId }}>
            {children}
        </EditTodoContext.Provider>
    );
};