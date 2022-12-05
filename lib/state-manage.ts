import useSWR from "swr";

export type CurrentPage = {
  page: number
}

export const useStaticState = (
  key: string
): [CurrentPage, (currentPage: CurrentPage) => void] => {
  const defaultCurrentPage: CurrentPage = {
    page: 1
  }

  const { data: currentPage, mutate: setCurrentPage } = useSWR(key, null, {
    fallbackData: defaultCurrentPage,
  })

  return [currentPage as CurrentPage, setCurrentPage];
}