import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "../../../core/config/ReactQuery/index.js";
import { GlobalLoader } from "../../../components/ui/GlobalLoader/index.js";
import type { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
  dehydratedState?: any;
}

export function withQueryLoading(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: any) {
    return (
      <>
        <GlobalLoader />
        <Component {...props} />
      </>
    );
  };
}

export default function QueryProvider({
  children,
  dehydratedState,
}: QueryProviderProps) {
  const queryClient = new QueryClient(queryClientConfig);
  
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <GlobalLoader />
        {children}
      </HydrationBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}