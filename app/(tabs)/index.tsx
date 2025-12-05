import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import TodoItem from "@/components/TodoItem";
import { EditTodoProvider } from "@/contexts/EditingTodoContext";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { createIndexStyles } from "@/styles";
import { Todo } from "@/types/todoTypes";
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { colors } = useTheme()
  const styles = createIndexStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  const renderTodos = ({ item }: { item: Todo }) => {
    return (
      <TodoItem todo={item}></TodoItem>
    )
  }

  return (
    <EditTodoProvider>
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <StatusBar barStyle={colors.statusBarStyle}></StatusBar>
        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <Header></Header>
          {/* Input */}
          <TodoInput></TodoInput>
          {/* Todos List */}
          <FlatList
            data={todos}
            renderItem={renderTodos}
            keyExtractor={(item) => item._id}
            style={styles.todoList}
            contentContainerStyle={styles.todoListContent}
            ListEmptyComponent={<EmptyState></EmptyState>} />

        </SafeAreaView>
      </LinearGradient>
    </EditTodoProvider>
  );
}


