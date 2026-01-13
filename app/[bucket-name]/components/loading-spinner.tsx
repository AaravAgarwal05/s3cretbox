interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner = ({
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <div className="text-center py-16">
      <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-zinc-600 dark:text-zinc-400">{message}</p>
    </div>
  );
};
