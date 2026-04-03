import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUsers } from "../../services/users";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export const useUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["usersList"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  const handleOpenCreateModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  return {
    isModalOpen,
    isFilterModalOpen,
    selectedUserId,
    data,
    isLoading,
    isError,
    setIsModalOpen,
    setIsFilterModalOpen,
    handleOpenCreateModal,
    handleOpenEditModal,
  };
};
