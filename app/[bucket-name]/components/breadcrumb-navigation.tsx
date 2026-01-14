import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface BreadcrumbNavigationProps {
  bucketName: string;
  pathSegments: string[];
  onNavigate: (targetPath: string) => void;
}

export const BreadcrumbNavigation = ({
  bucketName,
  pathSegments,
  onNavigate,
}: BreadcrumbNavigationProps) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
      <Link
        href="/"
        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 flex items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Link>
      <ChevronRight className="w-4 h-4" />
      <button
        onClick={() => onNavigate("")}
        className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
      >
        {decodeURIComponent(bucketName)}
      </button>
      {pathSegments.map((segment, index) => {
        const segmentPath = pathSegments.slice(0, index + 1).join("/");
        const isLast = index === pathSegments.length - 1;
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4" />
            {isLast ? (
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                {segment}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(segmentPath)}
                className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
              >
                {segment}
              </button>
            )}
          </div>
        );
      })}
    </nav>
  );
};
