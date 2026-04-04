import { EMPTY_RESPONSE } from "@/constants/pagination";
import type { Filters } from "@/pages/users/modals/filters";
import type { PaginatedReponse } from "@/types/pagination";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<Filters>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useQuery<PaginatedReponse<User>>({
    queryKey: ["usersList", currentPage, filters],
    queryFn: () => fetchUsers(currentPage, filters),
    initialData: EMPTY_RESPONSE,
    initialDataUpdatedAt: 0,
    staleTime: 0,
  });

  const handleOpenCreateModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleApplyFilters = (values: Filters) => {
    console.log("Applied filters:", values);
    setFilters(values);
    setCurrentPage(1);
  };

  return {
    isModalOpen,
    isFilterModalOpen,
    selectedUserId,
    data,
    isLoading,
    isError,
    setCurrentPage,
    setIsModalOpen,
    setIsFilterModalOpen,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleApplyFilters,
  };
};
