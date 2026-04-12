import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import { EMPTY_RESPONSE } from "@/constants/pagination";
import { usePermissions } from "@/hooks/usePermissions";
import type { Filters } from "@/pages/Users/modals/filters";
import type { PaginatedReponse } from "@/types/pagination";
import { exportUsersCSV, fetchUsers } from "../../services/users";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
}

export const useUsers = () => {
  const { hasPermission } = usePermissions();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const navigate = useNavigate();
  const search = useSearch({ from: "/_layout/usuarios" });

  const filters: Filters = {
    username: search.username,
    first_name: search.first_name,
    last_name: search.last_name,
    email: search.email,
    created_at:
      search.created_at__gte && search.created_at__lte
        ? [dayjs(search.created_at__gte), dayjs(search.created_at__lte)]
        : undefined,
  };

  const { data, isFetching, isError } = useQuery<PaginatedReponse<User>>({
    queryKey: ["usersList", search],
    queryFn: () => fetchUsers(search.page, filters),
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
    navigate({
      to: "/usuarios",
      search: {
        page: 1,
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        created_at__gte: values.created_at?.[0].format("YYYY-MM-DD"),
        created_at__lte: values.created_at?.[1].format("YYYY-MM-DD"),
      },
    });
  };

  const setCurrentPage = (page: number) => {
    navigate({
      to: "/usuarios",
      search: {
        page,
        username: search.username,
        first_name: search.first_name,
        last_name: search.last_name,
        email: search.email,
        created_at__gte: search.created_at__gte,
        created_at__lte: search.created_at__lte,
      },
    });
  };

  const handleExportCSV = async () => {
    setIsExporting(true);

    try {
      await exportUsersCSV(filters);
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isLoading: isFetching,
    isModalOpen,
    isFilterModalOpen,
    selectedUserId,
    data,
    isError,
    isExporting,
    hasPermission,
    setCurrentPage,
    setIsModalOpen,
    setIsFilterModalOpen,
    handleOpenCreateModal,
    handleOpenEditModal,
    handleApplyFilters,
    handleExportCSV,
    navigate,
  };
};
