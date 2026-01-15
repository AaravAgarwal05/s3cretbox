import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Loader2, FolderPlus } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";

interface CreateFolderDialogProps {
  onCreate: (folderName: string) => void;
  isCreating: boolean;
}

export const CreateFolderDialog = ({
  onCreate,
  isCreating,
}: CreateFolderDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Close dialog and reset when creation is complete
  const [wasCreating, setWasCreating] = useState(false);

  useEffect(() => {
    if (wasCreating && !isCreating) {
      // Creation finished, reset state and close dialog after a short delay
      setTimeout(() => {
        setFolderName("");
        setError(null);
        setIsOpen(false);
        setWasCreating(false);
      }, 500);
    } else if (isCreating && !wasCreating) {
      setWasCreating(true);
    }
  }, [isCreating, wasCreating]);

  const validateFolderName = (name: string): string | null => {
    if (!name.trim()) {
      return "Folder name is required";
    }
    if (name.length > 255) {
      return "Folder name is too long (max 255 characters)";
    }
    const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
    if (invalidChars.test(name)) {
      return "Folder name contains invalid characters";
    }
    if (name.startsWith(" ") || name.endsWith(" ")) {
      return "Folder name cannot start or end with a space";
    }
    return null;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateFolderName(folderName);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    onCreate(folderName.trim());
  };

  const handleFolderNameChange = (value: string) => {
    setFolderName(value);
    if (error) {
      setError(null);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        // Don't allow closing dialog while creating
        if (!isCreating) {
          setIsOpen(open);
          if (!open) {
            setFolderName("");
            setError(null);
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          Create Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FolderPlus className="w-5 h-5 mr-2" />
            Create New Folder
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              type="text"
              placeholder="Enter folder name..."
              value={folderName}
              onChange={(e) => handleFolderNameChange(e.target.value)}
              disabled={isCreating}
              autoFocus
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              disabled={!folderName.trim() || isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Create Folder
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
