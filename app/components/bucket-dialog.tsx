"use client";

import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Plus, Shield, Edit, Save, X, Server } from "lucide-react";

interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

interface NewBucket {
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
}

interface BucketDialogProps {
  // Add Dialog Props
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  newBucket: NewBucket;
  setNewBucket: (bucket: NewBucket) => void;
  onAddBucket: () => void;

  // Edit Dialog Props
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingBucket: S3Bucket | null;
  setEditingBucket: (bucket: S3Bucket | null) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;

  // Common Props
  awsRegions: Array<{ value: string; label: string }>;
  showTrigger?: boolean;
}

export function BucketDialog({
  isAddDialogOpen,
  setIsAddDialogOpen,
  newBucket,
  setNewBucket,
  onAddBucket,
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingBucket,
  setEditingBucket,
  onSaveEdit,
  onCancelEdit,
  awsRegions,
  showTrigger = true,
}: BucketDialogProps) {
  return (
    <>
      {/* Add Bucket Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        {showTrigger && (
          <DialogTrigger asChild>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Add New Bucket
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Server className="w-5 h-5 mr-2" />
              Add S3 Bucket
            </DialogTitle>
            <DialogDescription>
              Enter your AWS S3 bucket details. Your credentials will be
              encrypted locally.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bucket-name" className="text-right">
                Name
              </Label>
              <Input
                id="bucket-name"
                placeholder="my-bucket-name"
                className="col-span-3"
                value={newBucket.name}
                onChange={(e) =>
                  setNewBucket({ ...newBucket, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                Region
              </Label>
              <Select
                value={newBucket.region}
                onValueChange={(value) =>
                  setNewBucket({ ...newBucket, region: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {awsRegions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="access-key" className="text-right">
                Access Key
              </Label>
              <Input
                id="access-key"
                placeholder="AKIAIOSFODNN7EXAMPLE"
                className="col-span-3"
                value={newBucket.accessKey}
                onChange={(e) =>
                  setNewBucket({
                    ...newBucket,
                    accessKey: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret-key" className="text-right">
                Secret Key
              </Label>
              <Input
                id="secret-key"
                type="password"
                placeholder="Secret Access Key"
                className="col-span-3"
                value={newBucket.secretKey}
                onChange={(e) =>
                  setNewBucket({
                    ...newBucket,
                    secretKey: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={onAddBucket}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Add Bucket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Bucket Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Edit S3 Bucket
            </DialogTitle>
            <DialogDescription>
              Update your AWS S3 bucket details. Your credentials will be
              encrypted locally.
            </DialogDescription>
          </DialogHeader>
          {editingBucket && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-bucket-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-bucket-name"
                  placeholder="my-bucket-name"
                  className="col-span-3"
                  value={editingBucket.name}
                  onChange={(e) =>
                    setEditingBucket({
                      ...editingBucket,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-region" className="text-right">
                  Region
                </Label>
                <Select
                  value={editingBucket.region}
                  onValueChange={(value) =>
                    setEditingBucket({
                      ...editingBucket,
                      region: value,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {awsRegions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-access-key" className="text-right">
                  Access Key
                </Label>
                <Input
                  id="edit-access-key"
                  placeholder="AKIAIOSFODNN7EXAMPLE"
                  className="col-span-3"
                  value={editingBucket.accessKey}
                  onChange={(e) =>
                    setEditingBucket({
                      ...editingBucket,
                      accessKey: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-secret-key" className="text-right">
                  Secret Key
                </Label>
                <Input
                  id="edit-secret-key"
                  type="password"
                  placeholder="Secret Access Key"
                  className="col-span-3"
                  value={editingBucket.secretKey}
                  onChange={(e) =>
                    setEditingBucket({
                      ...editingBucket,
                      secretKey: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={onCancelEdit}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={onSaveEdit}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
