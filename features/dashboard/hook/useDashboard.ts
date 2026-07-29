import { useQuery } from "@tanstack/react-query";
import { getCustomersDataApi } from "../api/dashboardApi";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getCustomersDataApi,
  });
}
