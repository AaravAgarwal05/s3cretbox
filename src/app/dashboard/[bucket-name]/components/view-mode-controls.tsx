import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

interface ViewModeControlsProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const ViewModeControls = ({
  viewMode,
  onViewModeChange,
}: ViewModeControlsProps) => {
  return (
    <div className="flex border rounded-lg">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("grid")}
        className="rounded-r-none"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onViewModeChange("list")}
        className="rounded-l-none"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
};
