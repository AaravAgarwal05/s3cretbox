"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { TopRightControls } from "@/components/top-right-controls";
import { AuthLoader } from "@/components/auth-loader";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Plus,
  FolderOpen,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  Menu,
  Server,
  Key,
  Globe,
  Zap,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { SidebarContent } from "./components";
import { SquareThemeToggle } from "@/components/square-theme-toggle";

// Mock data structure for S3 buckets
interface S3Bucket {
  id: string;
  name: string;
  region: string;
  accessKey: string;
  secretKey: string;
  dateAdded: string;
}

// AWS Regions data
const awsRegions = [
  { value: "us-east-1", label: "US East (N. Virginia)" },
  { value: "us-east-2", label: "US East (Ohio)" },
  { value: "us-west-1", label: "US West (N. California)" },
  { value: "us-west-2", label: "US West (Oregon)" },
  { value: "eu-west-1", label: "Europe (Ireland)" },
  { value: "eu-west-2", label: "Europe (London)" },
  { value: "eu-west-3", label: "Europe (Paris)" },
  { value: "eu-central-1", label: "Europe (Frankfurt)" },
  { value: "ap-southeast-1", label: "Asia Pacific (Singapore)" },
  { value: "ap-southeast-2", label: "Asia Pacific (Sydney)" },
  { value: "ap-northeast-1", label: "Asia Pacific (Tokyo)" },
  { value: "ap-south-1", label: "Asia Pacific (Mumbai)" },
];

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const [selectedBucket, setSelectedBucket] = useState<S3Bucket | null>(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [editingBucket, setEditingBucket] = useState<S3Bucket | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // S3 buckets data - stored in localStorage
  const [buckets, setBuckets] = useState<S3Bucket[]>([]);

  // Auth check - redirect to home if not signed in
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        if (!isSignedIn) {
          router.push("/");
        } else {
          setIsChecking(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, router]);

  // Load buckets from localStorage on component mount
  useEffect(() => {
    if (!isChecking && isSignedIn) {
      const savedBuckets = localStorage.getItem("s3cretbox-buckets");
      if (savedBuckets) {
        try {
          const parsedBuckets = JSON.parse(savedBuckets);
          setBuckets(parsedBuckets);
          // Auto-select first bucket if available
          if (parsedBuckets.length > 0) {
            setSelectedBucket(parsedBuckets[0]);
          }
        } catch (error) {
          console.error("Error parsing saved buckets:", error);
          localStorage.removeItem("s3cretbox-buckets");
        }
      }
    }
  }, [isChecking, isSignedIn]);

  const [newBucket, setNewBucket] = useState({
    name: "",
    region: "",
    accessKey: "",
    secretKey: "",
  });

  const maskSecretKey = (key: string) => {
    if (!key || key.length < 16) {
      // If key is too short, show first 2 and last 2 characters with dots
      if (key.length <= 4) return key;
      return (
        key.substring(0, 2) +
        "•".repeat(Math.max(0, key.length - 4)) +
        key.substring(key.length - 2)
      );
    }
    return (
      key.substring(0, 8) +
      "•".repeat(Math.max(0, key.length - 16)) +
      key.substring(key.length - 8)
    );
  };

  const maskAccessKey = (key: string) => {
    if (!key || key.length < 10) {
      // If key is too short, show first 2 and last 2 characters with dots
      if (key.length <= 4) return key;
      return (
        key.substring(0, 2) +
        "•".repeat(Math.max(0, key.length - 4)) +
        key.substring(key.length - 2)
      );
    }
    return (
      key.substring(0, 6) +
      "•".repeat(Math.max(0, key.length - 10)) +
      key.substring(key.length - 4)
    );
  };

  const handleAddBucket = () => {
    // Trim whitespaces and validate fields
    const trimmedBucket = {
      name: newBucket.name.trim(),
      region: newBucket.region.trim(),
      accessKey: newBucket.accessKey.trim(),
      secretKey: newBucket.secretKey.trim(),
    };

    if (
      trimmedBucket.name &&
      trimmedBucket.region &&
      trimmedBucket.accessKey &&
      trimmedBucket.secretKey
    ) {
      const bucket: S3Bucket = {
        id: Date.now().toString(),
        ...trimmedBucket,
        dateAdded: new Date().toISOString().split("T")[0],
      };

      // Store in localStorage and update state
      const updatedBuckets = [...buckets, bucket];
      setBuckets(updatedBuckets);
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));

      // Reset form and close dialog
      setNewBucket({ name: "", region: "", accessKey: "", secretKey: "" });
      setIsAddDialogOpen(false);
      setSelectedBucket(bucket);
    }
  };

  const handleEditBucket = (bucket: S3Bucket) => {
    setEditingBucket({ ...bucket });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingBucket) {
      const updatedBuckets = buckets.map((bucket) =>
        bucket.id === editingBucket.id ? editingBucket : bucket
      );
      setBuckets(updatedBuckets);
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));

      // Update selected bucket if it's the one being edited
      if (selectedBucket?.id === editingBucket.id) {
        setSelectedBucket(editingBucket);
      }

      setEditingBucket(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingBucket(null);
    setIsEditDialogOpen(false);
  };

  const handleRemoveBucket = (bucketId: string) => {
    const updatedBuckets = buckets.filter((b) => b.id !== bucketId);
    setBuckets(updatedBuckets);

    // Update localStorage
    if (updatedBuckets.length > 0) {
      localStorage.setItem("s3cretbox-buckets", JSON.stringify(updatedBuckets));
    } else {
      localStorage.removeItem("s3cretbox-buckets");
    }

    // Update selected bucket
    if (selectedBucket?.id === bucketId) {
      setSelectedBucket(updatedBuckets.length > 0 ? updatedBuckets[0] : null);
    }
  };

  // Show loader while checking authentication
  if (!isLoaded || isChecking) {
    return (
          <>
            <div className="fixed top-4 right-4 z-50">
              <SquareThemeToggle />
            </div>
            <AuthLoader />
          </>
        );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Fixed Top Right Controls */}
      <TopRightControls />

      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-80 lg:flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
          <SidebarContent
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
            newBucket={newBucket}
            setNewBucket={setNewBucket}
            onAddBucket={handleAddBucket}
            isEditDialogOpen={isEditDialogOpen}
            setIsEditDialogOpen={setIsEditDialogOpen}
            editingBucket={editingBucket}
            setEditingBucket={setEditingBucket}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            buckets={buckets}
            selectedBucket={selectedBucket}
            onSelectBucket={setSelectedBucket}
            awsRegions={awsRegions}
          />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden fixed top-4 left-4 z-40 bg-white dark:bg-zinc-900"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent
              isAddDialogOpen={isAddDialogOpen}
              setIsAddDialogOpen={setIsAddDialogOpen}
              newBucket={newBucket}
              setNewBucket={setNewBucket}
              onAddBucket={handleAddBucket}
              isEditDialogOpen={isEditDialogOpen}
              setIsEditDialogOpen={setIsEditDialogOpen}
              editingBucket={editingBucket}
              setEditingBucket={setEditingBucket}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              buckets={buckets}
              selectedBucket={selectedBucket}
              onSelectBucket={setSelectedBucket}
              awsRegions={awsRegions}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {selectedBucket ? (
              <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    {selectedBucket.name}
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Manage your encrypted S3 bucket configuration
                  </p>
                </div>

                <div className="grid gap-6">
                  {/* Bucket Info Card */}
                  <Card className="border-2 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            <Server className="w-5 h-5 mr-2" />
                            Bucket Information
                          </CardTitle>
                          <CardDescription>
                            View and manage your S3 bucket details
                          </CardDescription>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleEditBucket(selectedBucket)}
                          className="flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Bucket Name
                          </Label>
                          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            {selectedBucket.name}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Region
                          </Label>
                          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            {
                              awsRegions.find(
                                (r) => r.value === selectedBucket.region
                              )?.label
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Credentials Card */}
                  <Card className="border-2 border-orange-200 dark:border-orange-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
                        <Key className="w-5 h-5 mr-2" />
                        Encrypted Credentials
                      </CardTitle>
                      <CardDescription>
                        Your AWS credentials are encrypted locally with your PIN
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Access Key ID
                        </Label>
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg font-mono text-sm">
                          {selectedBucket?.accessKey
                            ? maskAccessKey(selectedBucket.accessKey)
                            : "No access key"}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Secret Access Key
                        </Label>
                        <div className="flex items-center space-x-2">
                          <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg font-mono text-sm flex-1">
                            {selectedBucket?.secretKey
                              ? showSecretKey
                                ? selectedBucket.secretKey
                                : maskSecretKey(selectedBucket.secretKey)
                              : "No secret key"}
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setShowSecretKey(!showSecretKey)}
                            disabled={!selectedBucket?.secretKey}
                          >
                            {showSecretKey ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions Card */}
                  <Card className="border-2 border-zinc-200 dark:border-zinc-700">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Quick Actions
                      </CardTitle>
                      <CardDescription>
                        Manage your bucket and files
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={`/dashboard/${encodeURIComponent(
                            selectedBucket.name
                          )}`}
                          className="flex-1"
                        >
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Manage Files
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleRemoveBucket(selectedBucket.id)}
                          className="rounded-xl"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Bucket
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <FolderOpen className="w-10 h-10 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Select a Bucket
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">
                    Choose a bucket from the sidebar to view its details and
                    manage files
                  </p>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Bucket
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
